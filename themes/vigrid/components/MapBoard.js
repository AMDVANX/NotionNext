import { useEffect, useRef, useState } from 'react'
import {
  MAP_IMAGE,
  REGIONS,
  CITIES,
  ZONES,
  VMFO_ROLE,
  VMFO_UNITS,
  VMFO_CAPABILITY,
  VMFO_ROE
} from '../data/mapData'

/**
 * VIGRID 态势地图
 *
 * 底图为设定集里的地形图，热点按百分比坐标叠加，颜色代表分区计划类别。
 * 点击热点或编号条 → 面板显示该地区档案。
 * 下方附分区计划图例与 VMFO 编制。
 */

const zoneOf = code => ZONES.find(z => z.code === code) || null

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

const Dossier = ({ region, onClose }) => {
  const z = zoneOf(region.zone)
  return (
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
          <span className='vg-map-key'>ZONE</span>
          {z ? (
            <span className={`vg-zone-badge is-${z.code.toLowerCase()}`}>
              {z.code} · {z.cn}
            </span>
          ) : (
            <span className='vg-zone-badge is-none'>UNASSIGNED</span>
          )}
        </div>
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

      {region.zoneNote ? (
        <p className='vg-map-zone-note'>{region.zoneNote}</p>
      ) : null}

      {region.text ? (
        <p className='vg-map-text'>{region.text}</p>
      ) : (
        <p className='vg-map-text vg-map-text--empty'>
          NO RECORD ON FILE // 该地区档案缺失
        </p>
      )}
    </div>
  )
}

const ZoneGlossary = () => (
  <div className='vg-map-glossary'>
    <span className='vg-map-sec-title'>ZONING PLAN // 分区计划</span>
    <p className='vg-map-sec-intro'>
      VMFO
      进入维格里德后面临的最大现实问题，是没有任何一张地图值得信任。芬兰政府、俄罗斯、圣杯教会与萨米人各自持有一套土地叙事。由此产生的分区计划不公开承认改变主权，只宣称用于“停火监督、人员保护和风险管控”——但在实际执行中，它成为了蒙特勒宫条约之后维格里德最重要的现实秩序。
    </p>
    <div className='vg-map-zone-list'>
      {ZONES.map(z => (
        <article key={z.code} className={`vg-zone-card is-${z.code.toLowerCase()}`}>
          <header>
            <span className='vg-zone-code'>{z.code}</span>
            <span className='vg-zone-name'>{z.cn}</span>
            <span className='vg-zone-en'>{z.en}</span>
          </header>
          <p className='vg-zone-brief'>{z.brief}</p>
          <p className='vg-zone-detail'>{z.detail}</p>
        </article>
      ))}
    </div>
  </div>
)

const OrderOfBattle = () => (
  <div className='vg-map-oob'>
    <span className='vg-map-sec-title'>ORDER OF BATTLE // {VMFO_ROLE.name}</span>
    <p className='vg-map-sec-intro'>{VMFO_ROLE.note}</p>

    <div className='vg-oob-list'>
      {VMFO_UNITS.map(u => (
        <div key={u.code} className='vg-oob-row'>
          <span className='vg-oob-code'>{u.code}</span>
          <div className='vg-oob-body'>
            <span className='vg-oob-name'>
              {u.cn}
              <em>{u.en}</em>
            </span>
            <span className='vg-oob-loc'>{u.loc}</span>
            <span className='vg-oob-note'>{u.note}</span>
          </div>
        </div>
      ))}
    </div>

    <div className='vg-oob-cap'>
      <span className='vg-map-key'>CAPABILITY</span>
      <div className='vg-oob-cap-body'>
        <p className='vg-oob-cap-lacks'>
          {VMFO_CAPABILITY.lacks.join(' · ')}
        </p>
        <p className='vg-oob-cap-has'>{VMFO_CAPABILITY.has}</p>
      </div>
    </div>

    <div className='vg-oob-roe'>
      <span className='vg-map-key'>RULES OF ENGAGEMENT</span>
      <ul className='vg-oob-roe-list'>
        {VMFO_ROE.rules.map(r => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <p className='vg-oob-coda'>{VMFO_ROE.coda}</p>
    </div>
  </div>
)

const MapBoard = () => {
  const [active, setActive] = useState(null)
  const [cursor, setCursor] = useState(null)
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

  const zoneCounts = ZONES.map(z => ({
    code: z.code,
    cn: z.cn,
    n: REGIONS.filter(r => r.zone === z.code).length
  }))

  const onMove = e => {
    const box = e.currentTarget.getBoundingClientRect()
    if (!box.width || !box.height) return
    setCursor({
      x: ((e.clientX - box.left) / box.width) * 100,
      y: ((e.clientY - box.top) / box.height) * 100
    })
  }

  return (
    <>
      <div className='vg-map'>
        <div className='vg-map-head'>
          <span className='vg-map-title'>SITUATION BOARD</span>
          <span className='vg-map-sub'>
            {cursor
              ? `X ${cursor.x.toFixed(1)} / Y ${cursor.y.toFixed(1)}`
              : `VIGRID THEATRE // ${REGIONS.length} SECTORS`}
          </span>
        </div>

        <div className='vg-map-tally'>
          <span className='vg-map-tally-item'>
            <b>{REGIONS.length}</b> SECTORS
          </span>
          <span className='vg-map-tally-sep' />
          {zoneCounts.map(z => (
            <span
              key={z.code}
              className={`vg-map-tally-item is-${z.code.toLowerCase()}`}>
              <i /> <b>{z.n}</b> {z.code}
            </span>
          ))}
        </div>

        <div className='vg-map-body'>
          <div
            className='vg-map-canvas'
            onMouseMove={onMove}
            onMouseLeave={() => setCursor(null)}>
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
                  className={`vg-map-hot is-zone-${(r.zone || 'none').toLowerCase()} ${
                    active === r.id ? 'is-active' : ''
                  }`}
                  style={{ left: `${r.x}%`, top: `${r.y}%` }}
                  onClick={() => setActive(active === r.id ? null : r.id)}
                  aria-pressed={active === r.id}
                  aria-label={`Sector ${r.id} — ${r.sv}${
                    r.zone ? ` — zone ${r.zone}` : ''
                  }`}>
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
                  className={`vg-map-index-item is-zone-${(r.zone || 'none').toLowerCase()} ${
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
          {ZONES.map(z => (
            <span key={z.code} className='vg-map-legend-item'>
              <i className={`dot is-${z.code.toLowerCase()}`} /> {z.code} · {z.cn}
            </span>
          ))}
          <span className='vg-map-legend-item'>
            <i className='dot is-city' /> SETTLEMENT
          </span>
        </div>
      </div>

      <ZoneGlossary />
      <OrderOfBattle />
    </>
  )
}

export default MapBoard
