import SmartLink from '@/components/SmartLink'
import { IconArrow } from './Icons'

/**
 * 区块标题：编号 + 拉丁标题 + 中文副标 + 右侧「查看全部」
 */
const SectionHead = ({ index, title, cn, moreHref, moreText = 'ALL' }) => (
  <div className='vg-sec-head'>
    {index ? <span className='vg-sec-idx'>{index}</span> : null}
    <h2 className='vg-sec-title'>
      {title}
      {cn ? <span className='vg-sec-cn'>{cn}</span> : null}
    </h2>
    {moreHref ? (
      <SmartLink href={moreHref} className='vg-sec-more'>
        {moreText}
        <IconArrow className='w-3 h-3' />
      </SmartLink>
    ) : null}
  </div>
)

export default SectionHead
