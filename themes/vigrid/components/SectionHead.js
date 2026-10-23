import SmartLink from '@/components/SmartLink'
import { IconArrow } from './Icons'

/**
 * 区块标题
 *
 * 排版：`编号  TITLE            ALL →`
 * 不再画分隔线，层级完全靠字号、字距与留白建立。
 */
const SectionHead = ({ index, title, moreHref, moreText = 'ALL' }) => (
  <div className='vg-sec-head'>
    {index ? <span className='vg-sec-idx'>{index}</span> : null}
    <h2 className='vg-sec-title'>{title}</h2>
    {moreHref ? (
      <SmartLink href={moreHref} className='vg-sec-more'>
        {moreText}
        <IconArrow className='w-3 h-3' />
      </SmartLink>
    ) : null}
  </div>
)

export default SectionHead
