import { useEffect, useRef } from 'react'

/**
 * 可折叠目录
 *
 * Notion 的 toc 结构：[{ id, text, indentLevel }]
 *
 * 宽屏（≥1024px）默认展开，移动端默认折叠。
 * 这里用 ref 直接改 DOM 的 open 属性，而不是给 <details> 传 open prop ——
 * 因为现代 Chromium 对折叠的 <details> 用了 content-visibility，
 * 纯 CSS 覆盖 display 无效；这样也能避免 SSR/CSR 首次渲染的水合差异。
 */
const Toc = ({ toc }) => {
  const ref = useRef(null)
  const list = Array.isArray(toc) ? toc.filter(t => t && t.text) : []

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mq = window.matchMedia('(min-width: 1024px)')
    const apply = () => {
      if (mq.matches) el.open = true
    }
    apply()
    if (mq.addEventListener) mq.addEventListener('change', apply)
    else mq.addListener(apply)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', apply)
      else mq.removeListener(apply)
    }
  }, [])

  if (list.length < 2) return null

  return (
    <details className='vg-toc' ref={ref}>
      <summary>
        <span>CONTENTS</span>
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
