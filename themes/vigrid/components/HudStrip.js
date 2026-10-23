import { useEffect, useState } from 'react'

/**
 * 顶部 HUD 条
 *
 * 左（2/3）：四格时钟
 *   1 UTC（固定）
 *   2 Helsinki（固定）
 *   3 / 4 从 CITY_POOL 中每次打开随机抽取
 *   每格时区下方标注该城市当前是否处于夏令时（DST / STD）
 *
 * 右（1/3）：VIGRID 气象（数据源为伊瓦洛，坐标以 ??? 隐去）
 */

const FIXED_CITIES = [
  { code: 'UTC', tz: 'UTC' },
  { code: 'HELSINKI', tz: 'Europe/Helsinki' }
]

/** 随机池：45 座城市 */
const CITY_POOL = [
  { code: 'SYDNEY', tz: 'Australia/Sydney' },
  { code: 'SANTIAGO', tz: 'America/Santiago' },
  { code: 'BEIJING', tz: 'Asia/Shanghai' },
  { code: 'HONG KONG', tz: 'Asia/Hong_Kong' },
  { code: 'SHANGHAI', tz: 'Asia/Shanghai' },
  { code: 'SINGAPORE', tz: 'Asia/Singapore' },
  { code: 'SEOUL', tz: 'Asia/Seoul' },
  { code: 'TOKYO', tz: 'Asia/Tokyo' },
  { code: 'DAMASCUS', tz: 'Asia/Damascus' },
  { code: 'TEHRAN', tz: 'Asia/Tehran' },
  { code: 'DOHA', tz: 'Asia/Qatar' },
  { code: 'RIYADH', tz: 'Asia/Riyadh' },
  { code: 'CAIRO', tz: 'Africa/Cairo' },
  { code: 'JERUSALEM', tz: 'Asia/Jerusalem' },
  { code: 'PARIS', tz: 'Europe/Paris' },
  { code: 'STOCKHOLM', tz: 'Europe/Stockholm' },
  { code: 'TRIPOLI', tz: 'Africa/Tripoli' },
  { code: 'KANDAHAR', tz: 'Asia/Kabul' },
  { code: 'YANGON', tz: 'Asia/Yangon' },
  { code: 'BANGKOK', tz: 'Asia/Bangkok' },
  { code: 'MANILA', tz: 'Asia/Manila' },
  { code: 'HANOI', tz: 'Asia/Ho_Chi_Minh' },
  { code: 'KYIV', tz: 'Europe/Kyiv' },
  { code: 'NAIROBI', tz: 'Africa/Nairobi' },
  { code: 'JOHANNESBURG', tz: 'Africa/Johannesburg' },
  { code: 'MADRID', tz: 'Europe/Madrid' },
  { code: 'CASABLANCA', tz: 'Africa/Casablanca' },
  { code: 'GENEVA', tz: 'Europe/Zurich' },
  { code: 'BRUSSELS', tz: 'Europe/Brussels' },
  { code: 'JAKARTA', tz: 'Asia/Jakarta' },
  { code: 'KUALA LUMPUR', tz: 'Asia/Kuala_Lumpur' },
  { code: 'CHITA', tz: 'Asia/Chita' },
  { code: 'NOVOSIBIRSK', tz: 'Asia/Novosibirsk' },
  { code: 'ASTANA', tz: 'Asia/Almaty' },
  { code: 'CHICAGO', tz: 'America/Chicago' },
  { code: 'BOGOTA', tz: 'America/Bogota' },
  { code: 'TAIPEI', tz: 'Asia/Taipei' },
  { code: 'BUENOS AIRES', tz: 'America/Argentina/Buenos_Aires' },
  { code: 'VIENNA', tz: 'Europe/Vienna' },
  { code: 'MELBOURNE', tz: 'Australia/Melbourne' },
  { code: 'FRANKFURT', tz: 'Europe/Berlin' },
  { code: 'ANKARA', tz: 'Europe/Istanbul' },
  { code: 'ATHENS', tz: 'Europe/Athens' },
  { code: 'SAN DIEGO', tz: 'America/Los_Angeles' },
  { code: 'WASHINGTON DC', tz: 'America/New_York' },
  // —— 补全 UTC-10 ~ UTC+12 的偏移覆盖 ——
  { code: 'HONOLULU', tz: 'Pacific/Honolulu' },
  { code: 'DENVER', tz: 'America/Denver' },
  { code: 'TORONTO', tz: 'America/Toronto' },
  { code: 'LONDON', tz: 'Europe/London' },
  { code: 'REYKJAVIK', tz: 'Atlantic/Reykjavik' },
  { code: 'OSLO', tz: 'Europe/Oslo' },
  { code: 'DUBAI', tz: 'Asia/Dubai' },
  { code: 'DELHI', tz: 'Asia/Kolkata' },
  { code: 'DHAKA', tz: 'Asia/Dhaka' },
  { code: 'AUCKLAND', tz: 'Pacific/Auckland' },
  { code: 'CHRISTCHURCH', tz: 'Pacific/Auckland' }
]

// 气象数据仍取自伊瓦洛（68.66N 27.54E），但对外显示为 VIGRID
const WX_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=68.66&longitude=27.54' +
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

/* ---------------- 时区工具 ---------------- */

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

/** 该时区在某一时刻相对 UTC 的偏移（分钟） */
function offsetMinutes(tz, date) {
  if (!offFmt[tz]) {
    offFmt[tz] = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'shortOffset'
    })
  }
  const name =
    offFmt[tz].formatToParts(date).find(p => p.type === 'timeZoneName')?.value || ''
  const m = name.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/)
  if (!m) return 0
  const sign = m[1] === '-' ? -1 : 1
  return sign * (parseInt(m[2], 10) * 60 + parseInt(m[3] || '0', 10))
}

function getOffsetText(tz, date) {
  const mins = offsetMinutes(tz, date)
  const sign = mins < 0 ? '-' : '+'
  const abs = Math.abs(mins)
  const h = String(Math.floor(abs / 60)).padStart(2, '0')
  const mm = abs % 60
  return mm === 0 ? `UTC${sign}${h}` : `UTC${sign}${h}:${String(mm).padStart(2, '0')}`
}

/**
 * 是否处于夏令时：
 * 取该时区当年 1 月与 7 月偏移的较小值作为「标准时间」，
 * 当前偏移大于它即为夏令时。南北半球都适用。
 */
function isDST(tz, date) {
  const y = date.getUTCFullYear()
  const jan = offsetMinutes(tz, new Date(Date.UTC(y, 0, 1, 12)))
  const jul = offsetMinutes(tz, new Date(Date.UTC(y, 6, 1, 12)))
  const std = Math.min(jan, jul)
  return offsetMinutes(tz, date) > std
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

/* ---------------- 组件 ---------------- */

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
  const dst = isDST(city.tz, now)

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
        <span className='vg-hud-tz'>{getOffsetText(city.tz, now)}</span>
        <span className={`vg-hud-dst ${dst ? 'is-dst' : ''}`}>
          {dst ? 'DST' : 'STD'}
        </span>
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
        <span className='vg-hud-wx-coord'>VIGRID ???</span>
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
  const [picks, setPicks] = useState(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // 每次打开随机抽两座不重复的城市
  useEffect(() => {
    const pool = [...CITY_POOL]
    const picked = []
    for (let i = 0; i < 2 && pool.length > 0; i++) {
      picked.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0])
    }
    setPicks(picked)
  }, [])

  const slots = [
    FIXED_CITIES[0],
    FIXED_CITIES[1],
    picks ? picks[0] : { code: '— — —', tz: 'UTC' },
    picks ? picks[1] : { code: '— — —', tz: 'UTC' }
  ]

  return (
    <section className='vg-hud' aria-label='Global time and VIGRID weather'>
      <div className='vg-hud-clocks'>
        {slots.map((c, i) => (
          <ClockCell
            key={`${c.tz}-${c.code}-${i}`}
            city={c}
            now={i < 2 || picks ? now : null}
          />
        ))}
      </div>
      <Weather />
    </section>
  )
}

export default HudStrip
