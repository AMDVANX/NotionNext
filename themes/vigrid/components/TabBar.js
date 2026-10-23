import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { IconArchive, IconGrid, IconHome, IconSearch } from './Icons'

const TABS = [
  { key: 'home', href: '/', en: 'HOME', cn: '首页', Icon: IconHome, match: p => p === '/' },
  { key: 'archive', href: '/archive', en: 'ARCHIVE', cn: '归档', Icon: IconArchive, match: p => p.startsWith('/archive') },
  { key: 'category', href: '/category', en: 'INDEX', cn: '分类', Icon: IconGrid, match: p => p.startsWith('/category') || p.startsWith('/tag') },
  { key: 'search', href: '/search', en: 'SEARCH', cn: '搜索', Icon: IconSearch, match: p => p.startsWith('/search') }
]

/**
 * 移动端底部固定标签栏
 * 仅 <720px 显示，安全区已 padding 适配
 */
const TabBar = () => {
  const router = useRouter()
  const path = (router?.asPath || '/').split('?')[0] || '/'

  return (
    <nav className='vg-tabbar' aria-label='底部导航'>
      {TABS.map(({ key, href, en, cn, Icon, match }) => {
        const active = match(path)
        return (
          <SmartLink
            key={key}
            href={href}
            className={`vg-tab ${active ? 'is-active' : ''}`}
            aria-current={active ? 'page' : undefined}>
            <Icon />
            <span className='vg-tab-txt'>{en}</span>
            <span className='sr-only'>{cn}</span>
          </SmartLink>
        )
      })}
    </nav>
  )
}

export default TabBar
