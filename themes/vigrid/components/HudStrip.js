import { useEffect, useState } from 'react'

/**
 * 顶部 HUD 条
 *
 * 左（2/3）：四个城市时钟 —— 浏览器 Intl + IANA 时区，零请求，夏令时自动正确
 * 右（1/3）：伊瓦洛（Ivalo，芬兰最北城镇）当日气象 —— Open-Meteo，免密钥
 *          含日出日落与极昼/极夜判定
 *
 * 全部英文。
 */

const CITIES = [
  { code: 'LONDON', tz: 'Europe/London' },
  { code: 'HELSINKI', tz: 'Europe/Helsinki' },
  { code: 'MOSCOW', tz: 'Europe/Moscow' },
  { code: 'WASHINGTON DC', tz: 'America/New_York' }
]

// 伊瓦洛 Ivalo, Inari, Finnish Lapland —— 68.66°N 深入北极圈
const WX_LAT = 68.66
const WX_LON = 27.54
const WX_URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${WX_LAT}&longitude=${WX_LON}` +
  '&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m' +
  '&daily=sunrise,sunset,daylight_duration' +
  '&timezone=Europe%2FHelsinki&forecast_days=1'

/** WMO 天气码 → 简短军用式描述 */
const WMO = {
  0: 'CLEAR',
  1: 'MAINLY CLEAR',
  2: 'PARTLY CLOUDY',
  3: 'OVERCAST',
  45: 'FOG',
  48: 'RIME FOG',
  51: 'LIGHT DRIZZLE',
  53: 'DRIZZLE',
  55: 'HEAVY DRIZZLE',
  56: 'FREEZING DRIZZLE',
  57: 'FREEZING DRIZZLE',
  61: 'LIGHT RAIN',
  63: 'RAIN',
  65: 'HEAVY RAIN',
  66: 'FREEZING RAIN',
  67: 'FREEZING RAIN',
  71: 'LIGHT SNOW',
  73: 'SNOW',
  75: 'HEAVY SNOW',
  77: 'SNOW GRAINS',
  80: 'RAIN SHOWERS',
  81: 'RAIN SHOWERS',
  82: 'VIOLENT SHOWERS',
  85: 'SNOW SHOWERS',
  86: 'HEAVY SNOW SHOWERS',
  95: 'THUNDERSTORM',
  96: 'THUNDERSTORM HAIL',
  99: 'THUNDERSTORM HAIL'
}

const timeFmt = {}
const offFmt = {}

function getTime(tz, date) {
  if (!timeFmt[tz]) {
    timeFmt[tz] = new Intl.DateTimeFormat('en-GB', {
      timeZone: tz,
      hourCycle: 'h23',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }
  const p = {}
  timeFmt[tz].formatToParts(date).forEach(x => {
    p[x.type] = x.value
  })
  return p
}

function getOffset(tz, date) {
  if (!offFmt[tz]) {
    offFmt[tz] = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'shortOffset'
    })
  }
  const name =
    offFmt[tz].formatToParts(date).find(p => p.type === 'timeZoneName')?.value || ''
  const m = name.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/)
  if (!m) return 'UTC'
  return `UTC${m[1]}${String(m[2]).padStart(2, '0')}`
}

function hhmm(iso) {
  if (!iso) return '--:--'
  const m = String(iso).match(/T(\d{2}:\d{2})/)
  return m ? m[1] : '--:--'
}

function daylightText(seconds) {
  const s = Number(seconds)
  if (!Number.isFinite(s) || s <= 0) return '--'
  const h = Math.floor(s / 3600)
  const m = Math.round((s % 3600) / 60)
  return `${h}H ${String(m).padStart(2, '0')}M`
}

const ClockCell = ({ city, now }) => {
  if (!now) {
    return (
      <div className='vg-hud-cell'>
        <span className='vg-hud-city'>{city.code}</span>
        <span className='vg-hud-time'>
          <span className='vg-hud-hm'>--:--</span>
        </span>
        <span className='vg-hud-foot'>
          <span className='vg-hud-tz'>UTC--</span>
        </span>
      </div>
    )
  }
  const t = getTime(city.tz, now)
  const hour = Number(t.hour)
  const night = hour < 6 || hour >= 18

  return (
    <div className='vg-hud-cell'>
      <span className='vg-hud-city'>{city.code}</span>
      <span className='vg-hud-time'>
        <span className='vg-hud-hm'>
          {t.hour}:{t.minute}
        </span>
        <span className='vg-hud-sec'>:{t.second}</span>
      </span>
      <span className='vg-hud-foot'>
        <span className='vg-hud-tz'>{getOffset(city.tz, now)}</span>
        <span
          className={`vg-hud-dot ${night ? 'is-night' : ''}`}
          aria-hidden='true'
        />
      </span>
    </div>
  )
}

const Weather = () => {
  const [wx, setWx] = useState(null)
  const [err, setErr] = useState(false)

  useEffect(() => {
    let alive = true
    const run = async () => {
      try {
        const res = await fetch(WX_URL, { cache: 'no-store' })
        if (!res.ok) throw new Error('bad status')
        const j = await res.json()
        if (!alive) return
        const dl = Number(j?.daily?.daylight_duration?.[0])
        let phase = 'NORMAL'
        if (Number.isFinite(dl)) {
          if (dl <= 120) phase = 'POLAR NIGHT'
          else if (dl >= 86300) phase = 'POLAR DAY'
        }
        setWx({
          temp: j?.current?.temperature_2m,
          code: j?.current?.weather_code,
          wind: j?.current?.wind_speed_10m,
          hum: j?.current?.relative_humidity_2m,
          sunrise: j?.daily?.sunrise?.[0],
          sunset: j?.daily?.sunset?.[0],
          daylight: dl,
          phase
        })
      } catch (e) {
        if (alive) setErr(true)
      }
    }
    run()
    const id = setInterval(run, 30 * 60 * 1000)
    return () => {
      alive = false
      clearInterval(id)
    }
  }, [])

  const cond = wx ? WMO[wx.code] || 'UNKNOWN' : null
  const temp =
    wx && Number.isFinite(Number(wx.temp)) ? `${Math.round(Number(wx.temp))}°` : '--°'
  const wind =
    wx && Number.isFinite(Number(wx.wind)) ? `${Math.round(Number(wx.wind))} m/s` : '--'
  const hum =
    wx && Number.isFinite(Number(wx.hum)) ? `${Math.round(Number(wx.hum))}%` : '--'

  return (
    <div className='vg-hud-wx'>
      <div className='vg-hud-wx-head'>
        <span className='vg-hud-wx-name'>Weather</span>
        <span className='vg-hud-wx-coord'>IVALO 68.7N 27.5E</span>
      </div>

      <div className='vg-hud-wx-body'>
        <span className='vg-hud-wx-temp'>{err ? '--°' : temp}</span>
        <div className='vg-hud-wx-lines'>
          <span className='vg-hud-wx-cond'>
            {err ? 'SIGNAL LOST' : cond || 'SYNCING'}
          </span>
          <span className='vg-hud-wx-kv'>
            WIND <b>{wind}</b>
            <span className='vg-hud-wx-sep'>/</span> HUM <b>{hum}</b>
          </span>
        </div>
      </div>

      <div className='vg-hud-wx-sun'>
        <span className='vg-hud-wx-kv'>
          RISE <b>{wx ? hhmm(wx.sunrise) : '--:--'}</b>
        </span>
        <span className='vg-hud-wx-kv'>
          SET <b>{wx ? hhmm(wx.sunset) : '--:--'}</b>
        </span>
      </div>

      <div className='vg-hud-wx-flag'>
        {wx && wx.phase !== 'NORMAL' ? (
          <span className='vg-hud-wx-polar'>{wx.phase}</span>
        ) : (
          <span className='vg-hud-wx-kv'>
            DAYLIGHT <b>{wx ? daylightText(wx.daylight) : '--'}</b>
          </span>
        )}
      </div>
    </div>
  )
}

const HudStrip = () => {
  const [now, setNow] = useState(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className='vg-hud' aria-label='Global time and Ivalo weather'>
      <div className='vg-hud-clocks'>
        {CITIES.map(c => (
          <ClockCell key={c.tz} city={c} now={now} />
        ))}
      </div>
      <Weather />
    </section>
  )
}

export default HudStrip
