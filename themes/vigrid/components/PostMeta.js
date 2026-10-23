/**
 * 文章元数据条
 * 形如：RECORD // Motive/VMFO · FILED 2025-09-30 · EDITED 2026-08-21
 */
const PostMeta = ({ post }) => {
  if (!post) return null
  const words = countWords(post)
  const minutes = Math.max(1, Math.round(words / 400))

  return (
    <div className='vg-metabar'>
      <span className='vg-metabar-item'>
        RECORD <b>{post.slug || post.id?.slice(0, 8)}</b>
      </span>
      {post.category ? (
        <span className='vg-metabar-item'>
          UNIT <b>{post.category}</b>
        </span>
      ) : null}
      {post.publishDay ? (
        <span className='vg-metabar-item'>
          FILED <b>{post.publishDay}</b>
        </span>
      ) : null}
      {post.lastEditedDay ? (
        <span className='vg-metabar-item'>
          EDITED <b>{post.lastEditedDay}</b>
        </span>
      ) : null}
      <span className='vg-metabar-item'>
        {words > 0 ? (
          <>
            {words} CHR <b>≈ {minutes} MIN</b>
          </>
        ) : (
          <>
            READ <b>≈ {minutes} MIN</b>
          </>
        )}
      </span>
    </div>
  )
}

/** 粗略统计正文字数：优先用 blockMap 里的文本 */
function countWords(post) {
  try {
    const block = post?.blockMap?.block || post?.block || {}
    let n = 0
    Object.values(block).forEach(b => {
      const t = b?.value?.properties?.title
      if (Array.isArray(t)) {
        t.forEach(seg => {
          if (Array.isArray(seg)) n += String(seg[0] || '').length
        })
      }
    })
    if (n > 0) return n
  } catch (e) {
    // ignore
  }
  return String(post?.summary || '').length
}

export default PostMeta
