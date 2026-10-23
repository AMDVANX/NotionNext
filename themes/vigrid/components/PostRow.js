import SmartLink from '@/components/SmartLink'

/**
 * 情报流行项
 * 结构：分类标签 → 标题（衬线）→ 摘要 → 右侧缩略图
 */
const PostRow = ({ post, showThumb = true, showSummary = true }) => {
  if (!post) return null
  const href = post.href || `/article/${post.slug}`
  const cat = post.category
  const thumb = post.pageCoverThumbnail || post.pageCover

  return (
    <SmartLink href={href} className='vg-row'>
      <div className='vg-row-main'>
        <div className='vg-row-kicker'>
          {cat ? <span className='vg-chip'>{cat}</span> : null}
          {post.publishDay ? (
            <span className='vg-mono'>{post.publishDay}</span>
          ) : null}
        </div>
        <h3 className='vg-row-title'>{post.title}</h3>
        {showSummary && post.summary ? (
          <p className='vg-row-sum'>{post.summary}</p>
        ) : null}
      </div>
      {showThumb && thumb ? (
        <span className='vg-row-thumb'>
          <img src={thumb} alt='' loading='lazy' referrerPolicy='no-referrer' />
        </span>
      ) : null}
    </SmartLink>
  )
}

export default PostRow
