import { useEffect, useRef, useState } from 'react'
import { MAP_IMAGE, REGIONS, CITIES } from '../data/mapData'

/**
 * VIGRID 态势地图
 *
 * 底图为设定集里的地形图，热点按百分比坐标叠加。
 * 点击热点或编号条 → 右侧面板显示该地区档案。
 * 纯静态 SVG/CSS，无地图库依赖。
 */

const ThreatBar = ({ level }) => {
  const n = Number(level) || 0
  return (
    <span className='vg-map-threat' aria-label={`THREAT ${n} / 5`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= n ? 'on' : ''} />
      ))}
    </span>
  )
}

const Dossier = ({ region, onClose }) => (
  <div className='vg-map-dossier'>
    <div className='vg-map-dossier-head'>
      <span className='vg-map-dossier-id'>{region.id}</span>
      <div className='vg-map-dossier-names'>
        <span className='vg-map-dossier-sv'>
          {region.sv}
          {region.fi ? <em> / {region.fi}</em> : null}
        </span>
        <span className='vg-map-dossier-cn'>{region.cn}</span>
      </div>
      <button
        type='button'
        className='vg-map-close'
        onClick={onClose}
        aria-label='CLOSE'>
        ×
      </button>
    </div>

    <div className='vg-map-rows'>
      <div className='vg-map-row'>
        <span className='vg-map-key'>STATUS</span>
        <span className={`vg-map-status is-${region.status.toLowerCase()}`}>
          {region.status}
        </span>
      </div>
      <div className='vg-map-row'>
        <span className='vg-map-key'>THREAT</span>
        <ThreatBar level={region.threat} />
      </div>
      <div className='vg-map-row'>
        <span className='vg-map-key'>TERRAIN</span>
        <span className='vg-map-val'>{region.terrain}</span>
      </div>
      <div className='vg-map-row'>
        <span className='vg-map-key'>CONTROL</span>
        <span className='vg-map-val'>{region.control}</span>
      </div>
    </div>

    {region.sites.length > 0 && (
      <div className='vg-map-sites'>
        <span className='vg-map-key'>KEY SITES</span>
        <ul>
          {region.sites.map(s => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    )}

    {region.text ? (
      <p className='vg-map-text'>{region.text}</p>
    ) : (
      <p className='vg-map-text vg-map-text--empty'>
        NO RECORD ON FILE // 该地区档案缺失
      </p>
    )}
  </div>
)

const MapBoard = () => {
  const [active, setActive] = useState(null)
  const region = REGIONS.find(r => r.id === active) || null
  const panelRef = useRef(null)

  // 窄屏下面板在地图下方，选中后滚过去，否则看不到档案
  useEffect(() => {
    if (!active || typeof window === 'undefined') return
    if (window.innerWidth >= 1024) return
    const el = panelRef.current
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [active])

  return (
    <div className='vg-map'>
      <div className='vg-map-head'>
        <span className='vg-map-title'>SITUATION BOARD</span>
        <span className='vg-map-sub'>
          VIGRID THEATRE // {REGIONS.length} SECTORS
        </span>
      </div>

      <div className='vg-map-body'>
        <div className='vg-map-canvas'>
          <picture>
            <source media='(min-width: 720px)' srcSet={MAP_IMAGE.wide} />
            <img src={MAP_IMAGE.small} alt={MAP_IMAGE.alt} />
          </picture>

          <div className='vg-map-layer'>
            {CITIES.map(c => (
              <span
                key={c.name}
                className='vg-map-city'
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
                title={c.name}
                aria-hidden='true'
              />
            ))}

            {REGIONS.map(r => (
              <button
                key={r.id}
                type='button'
                className={`vg-map-hot is-${r.status.toLowerCase()} ${
                  active === r.id ? 'is-active' : ''
                }`}
                style={{ left: `${r.x}%`, top: `${r.y}%` }}
                onClick={() => setActive(active === r.id ? null : r.id)}
                aria-pressed={active === r.id}
                aria-label={`Sector ${r.id} — ${r.sv}`}>
                <span>{r.id}</span>
              </button>
            ))}
          </div>
        </div>

        <aside className='vg-map-panel' ref={panelRef}>
          {region ? (
            <Dossier region={region} onClose={() => setActive(null)} />
          ) : (
            <div className='vg-map-idle'>
              <span className='vg-map-idle-title'>SELECT A SECTOR</span>
              <span className='vg-map-idle-sub'>
                点击地图上的编号热点，或从下方列表选择
              </span>
            </div>
          )}

          <div className='vg-map-index'>
            {REGIONS.map(r => (
              <button
                key={r.id}
                type='button'
                className={`vg-map-index-item is-${r.status.toLowerCase()} ${
                  active === r.id ? 'is-active' : ''
                }`}
                onClick={() => setActive(r.id)}>
                <b>{r.id}</b>
                <span>{r.sv}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>

      <div className='vg-map-legend'>
        <span className='vg-map-legend-item'>
          <i className='dot is-stable' /> STABLE
        </span>
        <span className='vg-map-legend-item'>
          <i className='dot is-alert' /> ALERT
        </span>
        <span className='vg-map-legend-item'>
          <i className='dot is-contested' /> CONTESTED
        </span>
        <span className='vg-map-legend-item'>
          <i className='dot is-city' /> SETTLEMENT
        </span>
      </div>
    </div>
  )
}

export default MapBoard
