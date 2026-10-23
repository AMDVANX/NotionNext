import SmartLink from '@/components/SmartLink'

/**
 * 首图卡片
 * 有封面时：文字压在图上（黑色渐变遮罩），是参考站的核心视觉。
 * 无封面时：退化为纯文字面板，保持硬边。
 */
const HeroCard = ({ post, kicker = 'LATEST' }) => {
  if (!post) return null
  const href = post.href || `/article/${post.slug}`
  const cover = post.pageCoverThumbnail || post.pageCover

  if (!cover) {
    return (
      <SmartLink href={href} className='vg-hero'>
        <span className='vg-hero-body'>
          <span className='vg-row-kicker'>
            <span className='vg-chip vg-chip--accent'>{kicker}</span>
            {post.category ? <span className='vg-chip vg-chip--ghost'>{post.category}</span> : null}
          </span>
          <span className='vg-hero-title'>{post.title}</span>
          {post.summary ? <span className='vg-hero-sum'>{post.summary}</span> : null}
        </span>
      </SmartLink>
    )
  }

  return (
    <SmartLink href={href} className='vg-hero vg-hero--overlay'>
      <span className='vg-hero-media'>
        <img src={cover} alt='' referrerPolicy='no-referrer' />
        <span className='vg-hero-scrim' aria-hidden='true' />
        <span className='vg-hero-overlay'>
          <span className='vg-row-kicker'>
            <span className='vg-chip vg-chip--accent'>{kicker}</span>
            {post.category ? <span className='vg-chip vg-chip--light'>{post.category}</span> : null}
            {post.publishDay ? <span className='vg-hero-date'>{post.publishDay}</span> : null}
          </span>
          <span className='vg-hero-title'>{post.title}</span>
          {post.summary ? <span className='vg-hero-sum'>{post.summary}</span> : null}
        </span>
      </span>
    </SmartLink>
  )
}

export default HeroCard
