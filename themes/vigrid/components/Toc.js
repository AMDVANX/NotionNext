/**
 * 可折叠目录
 * Notion 的 toc 结构：[{ id, text, indentLevel }]
 */
const Toc = ({ toc }) => {
  const list = Array.isArray(toc) ? toc.filter(t => t && t.text) : []
  if (list.length < 2) return null

  return (
    <details className='vg-toc'>
      <summary>
        <span>目录</span>
        <span className='vg-mono' style={{ marginLeft: 8 }}>
          {list.length} SECTIONS
        </span>
      </summary>
      <nav className='vg-toc-list'>
        {list.map((t, i) => (
          <a
            key={t.id || i}
            href={`#${t.id}`}
            className={t.indentLevel >= 1 ? 'lv3' : ''}>
            {t.text}
          </a>
        ))}
      </nav>
    </details>
  )
}

export default Toc
