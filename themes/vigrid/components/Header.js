import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
import CONFIG from '../config'
import { IconSearch } from './Icons'

/**
 * 顶栏：硬边、左侧标记条、Rajdhani 品牌字
 * 桌面端展开自定义菜单，移动端只留 brand + 搜索
 */
const Header = props => {
  const { siteInfo, customMenu, customNav } = props
  const router = useRouter()
  const path = router?.asPath || '/'

  const title = siteInfo?.title || siteConfig('TITLE', null, CONFIG) || 'VIGRID'
  const tagline = siteInfo?.description || ''

  // 优先使用 Notion 里的 Menu 类型，其次 customNav，最后给默认导航
  const menus = Array.isArray(customMenu) && customMenu.length > 0
    ? customMenu
    : Array.isArray(customNav) && customNav.length > 0
      ? customNav
      : []

  const isActive = href => {
    if (!href || href === '/#') return false
    const h = href.split('?')[0]
    if (h === '/') return path === '/'
    return path === h || path.startsWith(h + '/')
  }

  return (
    <header className='vg-head'>
      <div className='vg-head-inner'>
        <span className='vg-head-mark' aria-hidden='true' />

        <SmartLink href='/' className='vg-brand' aria-label={title}>
          <span className='vg-brand-name'>{title}</span>
          {tagline ? <span className='vg-brand-sub'>{tagline}</span> : null}
        </SmartLink>

        <span className='vg-head-spacer' />

        {menus.length > 0 && (
          <nav className='vg-nav' aria-label='MAIN NAVIGATION'>
            {menus.map((m, i) => {
              const subs = Array.isArray(m.subMenus) ? m.subMenus.filter(s => s && s.show !== false) : []
              const label = m.name || m.title || ''
              const href = m.href || '/#'

              if (subs.length === 0) {
                return (
                  <SmartLink
                    key={m.id || i}
                    href={href}
                    className={`vg-nav-item ${isActive(href) ? 'is-active' : ''}`}>
                    {label}
                  </SmartLink>
                )
              }

              return (
                <div key={m.id || i} className='vg-nav-item'>
                  <span>{label}</span>
                  <div className='vg-nav-drop'>
                    {subs.map((s, j) => (
                      <SmartLink key={s.id || j} href={s.href || '/#'}>
                        {s.name || s.title}
                      </SmartLink>
                    ))}
                  </div>
                </div>
              )
            })}
          </nav>
        )}

        <SmartLink href='/search' className='vg-head-action' aria-label='SEARCH'>
          <IconSearch className='w-[18px] h-[18px]' />
        </SmartLink>
      </div>
    </header>
  )
}

export default Header
