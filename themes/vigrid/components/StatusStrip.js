/**
 * 首屏状态条
 * 把站点的真实统计以 HUD 形式呈现：档案数 / 分类数 / 标签数 / 最后更新
 * 数值条按相对比例填充，纯装饰但语义真实
 */
const StatusStrip = ({ postCount, categoryOptions, tagOptions, latest }) => {
  const cats = Array.isArray(categoryOptions) ? categoryOptions.length : 0
  const tags = Array.isArray(tagOptions) ? tagOptions.length : 0
  const total = Number(postCount) || 0
  const stamp = latest?.lastEditedDay || latest?.publishDay || '—'

  const pct = n => {
    if (!total) return 0
    return Math.max(4, Math.min(100, Math.round((n / total) * 100)))
  }

  const items = [
    { label: 'ARCHIVES', cn: '档案', value: total, bar: 100 },
    { label: 'CATEGORIES', cn: '分类', value: cats, bar: pct(cats * 3) },
    { label: 'TAGS', cn: '标签', value: tags, bar: pct(tags * 2), accent: tags === 0 },
    { label: 'LAST SYNC', cn: '更新', value: stamp, bar: 100, mono: true }
  ]

  return (
    <section className='vg-status' aria-label='站点状态'>
      <div className='vg-status-head'>
        <span className='vg-status-title'>SYSTEM STATUS</span>
        <span className='vg-mono'>// 站点状态</span>
      </div>
      <div className='vg-status-grid'>
        {items.map(it => (
          <div key={it.label}>
            <div className='vg-stat-label'>
              {it.label} <span style={{ opacity: 0.65 }}>{it.cn}</span>
            </div>
            <div
              className='vg-stat-value'
              style={it.mono ? { fontSize: 15, letterSpacing: '0.02em' } : undefined}>
              {it.value}
            </div>
            <div className={`vg-bar ${it.accent ? 'is-accent' : ''}`} aria-hidden='true'>
              <span style={{ width: `${it.bar}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatusStrip
