import { useEffect, useState } from 'react'

/**
 * 阅读进度条
 * 固定在顶栏下沿，2px 高，用强调色填充。
 * 这篇文章普遍 5000+ 字，进度条能给出明确的阅读位置感。
 */
const ReadingProgress = () => {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      if (max <= 0) {
        setPct(0)
        return
      }
      setPct(Math.min(100, Math.max(0, (doc.scrollTop / max) * 100)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className='vg-progress' aria-hidden='true'>
      <span style={{ width: `${pct}%` }} />
    </div>
  )
}

export default ReadingProgress
