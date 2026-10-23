import { useEffect, useState } from 'react'

/**
 * 回到顶部
 * 滚动超过一屏后出现，点击平滑回顶。
 * 长文在手机上滑到末尾时，没有这个按钮要手动滑很久。
 */
const BackToTop = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <button
      type='button'
      className={`vg-top ${show ? 'is-show' : ''}`}
      onClick={toTop}
      aria-label='BACK TO TOP'
      tabIndex={show ? 0 : -1}>
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'>
        <path d='M12 19V6' />
        <path d='M6 12l6-6 6 6' />
      </svg>
    </button>
  )
}

export default BackToTop
