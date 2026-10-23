import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 页脚：一行硬边说明，不放社交墙
 */
const Footer = props => {
  const { siteInfo } = props
  const note = siteConfig('VIGRID_FOOTER_NOTE', null, CONFIG)
  const since = siteConfig('SINCE', null, CONFIG)
  const title = siteInfo?.title || 'VIGRID'

  return (
    <footer className='vg-foot'>
      <div className='vg-foot-inner'>
        <span className='vg-foot-note'>{note}</span>
        <span className='vg-foot-note'>
          {title}
          {since ? ` // EST. ${since}` : ''}
        </span>
      </div>
    </footer>
  )
}

export default Footer
