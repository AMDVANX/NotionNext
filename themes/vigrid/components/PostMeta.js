/**
 * 文章度量条
 *
 * 只保留「字数 + 预计阅读时长」，用正式英文表述：
 *   5,200 WORDS · ESTIMATED READING TIME 17 MIN
 */
const PostMeta = ({ post }) => {
  if (!post) return null

  const words = countWords(post)
  if (!words) return null

  const minutes = Math.max(1, Math.round(words / 400))

  return (
    <div className='vg-metabar'>
      <span className='vg-metabar-item'>
        <b>{words.toLocaleString('en-US')}</b> WORDS
      </span>
      <span className='vg-metabar-sep' aria-hidden='true'>
        ·
      </span>
      <span className='vg-metabar-item'>
        ESTIMATED READING TIME <b>{minutes} MIN</b>
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
