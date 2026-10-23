import NotionPage from '@/components/NotionPage'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'

import CONFIG from './config'
import { Style } from './style'
import Header from './components/Header'
import TabBar from './components/TabBar'
import Footer from './components/Footer'
import SectionHead from './components/SectionHead'
import StatusStrip from './components/StatusStrip'
import HeroCard from './components/HeroCard'
import PostRow from './components/PostRow'
import PostMeta from './components/PostMeta'
import Toc from './components/Toc'
import { IconArrow } from './components/Icons'

const cfg = (key, fallback) => siteConfig(key, fallback, CONFIG)

/* ------------------------------------------------------------------ */
/* 外壳                                                                */
/* ------------------------------------------------------------------ */

const LayoutBase = props => {
  const { children } = props
  const tabBar = cfg('VIGRID_TAB_BAR_ENABLE', true)

  return (
    <div id='theme-vigrid' className={`vg-shell ${tabBar ? 'has-tabbar' : ''}`}>
      <Style />
      <Header {...props} />
      <main className='vg-main'>{children}</main>
      <Footer {...props} />
      {tabBar ? <TabBar /> : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 通用零件                                                            */
/* ------------------------------------------------------------------ */

const Pager = ({ page, totalPages, basePath }) => {
  const cur = Number(page) || 1
  const total = Number(totalPages) || 1
  if (total <= 1) return null

  const items = []
  for (let i = 1; i <= total; i++) {
    if (total > 7 && Math.abs(i - cur) > 2 && i !== 1 && i !== total) {
      if (items[items.length - 1] !== '…') items.push('…')
      continue
    }
    items.push(i)
  }

  return (
    <nav className='vg-pager' aria-label='分页'>
      {cur > 1 && <SmartLink href={`${basePath}/page/${cur - 1}`}>←</SmartLink>}
      {items.map((it, i) =>
        it === '…' ? (
          <span key={`gap-${i}`}>…</span>
        ) : (
          <SmartLink
            key={it}
            href={it === 1 ? basePath : `${basePath}/page/${it}`}
            className={it === cur ? 'is-current' : ''}>
            {String(it).padStart(2, '0')}
          </SmartLink>
        )
      )}
      {cur < total && <SmartLink href={`${basePath}/page/${cur + 1}`}>→</SmartLink>}
    </nav>
  )
}

const Empty = ({ text = 'NO RECORDS // 暂无内容' }) => (
  <div className='vg-empty'>{text}</div>
)

/* ------------------------------------------------------------------ */
/* 首页                                                                */
/* ------------------------------------------------------------------ */

const LayoutIndex = props => {
  const {
    posts = [],
    latestPosts = [],
    categoryOptions = [],
    tagOptions = [],
    postCount = 0,
    siteInfo
  } = props

  const list = Array.isArray(posts) ? posts : []
  const hero = list[0]
  const rest = list.slice(1, 1 + Number(cfg('VIGRID_HOME_LATEST_COUNT', 6)))

  const catLimit = Number(cfg('VIGRID_HOME_CATEGORY_LIMIT', 4))

  const cats = (Array.isArray(categoryOptions) ? categoryOptions : []).slice(0, catLimit)

  const latest = latestPosts && latestPosts[0]

  return (
    <>
      {cfg('VIGRID_HOME_STATUS_ENABLE', true) ? (
        <StatusStrip
          postCount={postCount}
          categoryOptions={categoryOptions}
          tagOptions={tagOptions}
          latest={latest}
        />
      ) : null}

      {hero ? <HeroCard post={hero} kicker='LATEST' /> : <div style={{ marginTop: 18 }}><Empty /></div>}

      {rest.length > 0 && (
        <section className='vg-sec'>
          <SectionHead
            index='01'
            title='INTEL FEED'
            cn='最新情报'
            moreHref='/archive'
            moreText='ALL'
          />
          <div className='vg-feed'>
            {rest.map(p => (
              <PostRow key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      {cats.length > 0 && (
        <section className='vg-sec'>
          <SectionHead index='02' title='INDEX' cn='分类索引' />
          <div className='vg-grid vg-grid--3'>
            {cats.map((c, i) => (
              <SmartLink key={c.name} href={`/category/${c.name}`} className='vg-mini'>
                <span className='vg-mini-idx'>
                  {String(i + 1).padStart(2, '0')} / {String(cats.length).padStart(2, '0')}
                </span>
                <span className='vg-mini-title' style={{ display: '-webkit-box' }}>
                  {c.name}
                </span>
                <span className='vg-mono' style={{ marginTop: 6, display: 'block' }}>
                  {c.count} ENTRIES
                </span>
              </SmartLink>
            ))}
          </div>
        </section>
      )}

      <section className='vg-sec'>
        <SectionHead index='03' title='ACCESS' cn='快捷入口' />
        <div className='vg-grid vg-grid--3'>
          <SmartLink href='/archive' className='vg-mini'>
            <span className='vg-mini-idx'>ALL</span>
            <span className='vg-mini-title' style={{ display: 'block' }}>
              全部档案
            </span>
            <span className='vg-mono' style={{ marginTop: 6, display: 'block' }}>
              {postCount} ENTRIES
            </span>
          </SmartLink>
          <SmartLink href='/category' className='vg-mini'>
            <span className='vg-mini-idx'>CAT</span>
            <span className='vg-mini-title' style={{ display: 'block' }}>
              分类总览
            </span>
            <span className='vg-mono' style={{ marginTop: 6, display: 'block' }}>
              {categoryOptions?.length || 0} CATEGORIES
            </span>
          </SmartLink>
          <SmartLink href='/search' className='vg-mini'>
            <span className='vg-mini-idx'>FIND</span>
            <span className='vg-mini-title' style={{ display: 'block' }}>
              检索档案
            </span>
            <span className='vg-mono' style={{ marginTop: 6, display: 'block' }}>
              FULL TEXT
            </span>
          </SmartLink>
        </div>
      </section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* 文章页                                                              */
/* ------------------------------------------------------------------ */

const LayoutSlug = props => {
  const { post, prev, next, recommendPosts } = props
  const { locale } = useGlobal()

  if (!post) {
    return (
      <div style={{ paddingTop: 40 }}>
        <Empty text='LOADING RECORD // 正在调取档案' />
      </div>
    )
  }

  const cover = post.pageCover

  return (
    <article>
      <header className='vg-post-head'>
        <div className='vg-row-kicker'>
          {post.category ? (
            <SmartLink href={`/category/${post.category}`}>
              <span className='vg-chip'>{post.category}</span>
            </SmartLink>
          ) : null}
          {post.type ? <span className='vg-chip vg-chip--ghost'>{post.type}</span> : null}
        </div>

        <h1 className='vg-post-title'>{post.title}</h1>
        {post.summary ? <p className='vg-post-sum'>{post.summary}</p> : null}

        {cfg('VIGRID_POST_META_ENABLE', true) ? <PostMeta post={post} /> : null}
      </header>

      {cover ? (
        <figure className='vg-cover' style={{ margin: '18px 0 0' }}>
          <img src={cover} alt='' referrerPolicy='no-referrer' />
        </figure>
      ) : null}

      {cfg('VIGRID_POST_TOC_ENABLE', true) ? <Toc toc={post.toc} /> : null}

      <div className='vg-article'>
        <NotionPage post={post} />
      </div>

      <nav className='vg-pager' style={{ justifyContent: 'space-between', marginTop: 34 }}>
        {prev ? (
          <SmartLink href={prev.href || `/article/${prev.slug}`} className='vg-metabar-item' style={{ height: 'auto' }}>
            ← PREV <b style={{ marginLeft: 6 }}>{prev.title}</b>
          </SmartLink>
        ) : (
          <span />
        )}
        {next ? (
          <SmartLink href={next.href || `/article/${next.slug}`} className='vg-metabar-item' style={{ height: 'auto', textAlign: 'right' }}>
            NEXT <b style={{ marginLeft: 6 }}>{next.title}</b> →
          </SmartLink>
        ) : (
          <span />
        )}
      </nav>

      {cfg('VIGRID_POST_RELATE_ENABLE', true) &&
      Array.isArray(recommendPosts) &&
      recommendPosts.length > 0 ? (
        <section className='vg-sec'>
          <SectionHead index='—' title='RELATED' cn='相关档案' />
          <div className='vg-feed'>
            {recommendPosts.slice(0, 4).map(p => (
              <PostRow key={p.id} post={p} showSummary={false} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* 列表 / 归档 / 分类 / 标签 / 搜索                                     */
/* ------------------------------------------------------------------ */

const ListBody = ({ posts, emptyText }) => {
  const list = Array.isArray(posts) ? posts : []
  if (list.length === 0) return <Empty text={emptyText} />
  return (
    <div className='vg-feed' style={{ marginTop: 14 }}>
      {list.map(p => (
        <PostRow key={p.id} post={p} />
      ))}
    </div>
  )
}

const LayoutPostList = props => {
  const { posts, category, tag, page, totalPages } = props
  const base = category
    ? `/category/${category}`
    : tag
      ? `/tag/${tag}`
      : ''

  return (
    <>
      <section className='vg-sec' style={{ marginTop: 18 }}>
        <SectionHead
          index={category || tag ? 'CAT' : 'LIST'}
          title={category || tag || 'ARCHIVE'}
          cn={category ? '分类' : tag ? '标签' : '列表'}
        />
        <ListBody posts={posts} emptyText='NO RECORDS // 该分类暂无内容' />
      </section>
      {base ? <Pager page={page} totalPages={totalPages} basePath={base} /> : null}
    </>
  )
}

const LayoutArchive = props => {
  const { archivePosts } = props
  const keys = archivePosts ? Object.keys(archivePosts) : []

  if (keys.length === 0) {
    return (
      <section className='vg-sec' style={{ marginTop: 18 }}>
        <SectionHead index='ARC' title='ARCHIVE' cn='归档' />
        <Empty />
      </section>
    )
  }

  return (
    <>
      <section className='vg-sec' style={{ marginTop: 18 }}>
        <SectionHead index='ARC' title='ARCHIVE' cn='全部归档' />
      </section>
      {keys.map((k, i) => (
        <section className='vg-sec' key={k}>
          <SectionHead
            index={String(i + 1).padStart(2, '0')}
            title={k}
            cn={`${archivePosts[k]?.length || 0} 篇`}
          />
          <ListBody posts={archivePosts[k]} />
        </section>
      ))}
    </>
  )
}

const LayoutCategoryIndex = props => {
  const { categoryOptions = [] } = props
  return (
    <section className='vg-sec' style={{ marginTop: 18 }}>
      <SectionHead index='CAT' title='CATEGORIES' cn='分类总览' />
      {categoryOptions.length === 0 ? (
        <Empty />
      ) : (
        <div className='vg-grid vg-grid--3'>
          {categoryOptions.map((c, i) => (
            <SmartLink key={c.name} href={`/category/${c.name}`} className='vg-mini'>
              <span className='vg-mini-idx'>{String(i + 1).padStart(2, '0')}</span>
              <span className='vg-mini-title' style={{ display: 'block' }}>
                {c.name}
              </span>
              <span className='vg-mono' style={{ marginTop: 6, display: 'block' }}>
                {c.count} ENTRIES
              </span>
            </SmartLink>
          ))}
        </div>
      )}
    </section>
  )
}

const LayoutTagIndex = props => {
  const { tagOptions = [] } = props
  return (
    <section className='vg-sec' style={{ marginTop: 18 }}>
      <SectionHead index='TAG' title='TAGS' cn='标签' />
      {tagOptions.length === 0 ? (
        <Empty text='NO TAGS // 尚未启用标签' />
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
          {tagOptions.map(t => (
            <SmartLink key={t.name} href={`/tag/${t.name}`} className='vg-chip vg-chip--ghost'>
              {t.name}
              <span style={{ marginLeft: 6, opacity: 0.6 }}>{t.count}</span>
            </SmartLink>
          ))}
        </div>
      )}
    </section>
  )
}

const LayoutSearch = props => {
  const { keyword, posts } = props
  return (
    <section className='vg-sec' style={{ marginTop: 18 }}>
      <SectionHead
        index='FIND'
        title='SEARCH'
        cn={keyword ? `关键词：${keyword}` : '全站检索'}
      />
      {!keyword ? (
        <form action='/search' method='get' style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <input
            type='search'
            name='s'
            placeholder='输入关键词 / keyword'
            aria-label='搜索关键词'
            style={{
              flex: 1,
              height: 44,
              padding: '0 12px',
              border: '1px solid var(--vg-line)',
              background: 'var(--vg-panel)',
              color: 'var(--vg-ink)',
              fontFamily: 'var(--vg-mono)',
              fontSize: 13,
              borderRadius: 0,
              outline: 'none'
            }}
          />
          <button
            type='submit'
            style={{
              height: 44,
              padding: '0 18px',
              background: 'var(--vg-ink)',
              color: 'var(--vg-bg)',
              fontFamily: 'var(--vg-display)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              fontSize: 12,
              border: '1px solid var(--vg-ink)',
              borderRadius: 0,
              cursor: 'pointer'
            }}>
            SCAN
          </button>
        </form>
      ) : (
        <ListBody posts={posts} emptyText='NO MATCH // 没有匹配的档案' />
      )}
    </section>
  )
}

const Layout404 = props => (
  <section className='vg-sec' style={{ marginTop: 18 }}>
    <SectionHead index='ERR' title='404' cn='记录不存在' />
    <div className='vg-empty' style={{ marginTop: 14 }}>
      <div style={{ fontFamily: 'var(--vg-display)', fontSize: 52, lineHeight: 1, color: 'var(--vg-ink)' }}>
        404
      </div>
      <div style={{ marginTop: 10 }}>RECORD NOT FOUND // 该档案不存在或已封存</div>
      <div style={{ marginTop: 18 }}>
        <SmartLink href='/' style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--vg-ink)' }}>
          返回首页 <IconArrow className='w-4 h-4' />
        </SmartLink>
      </div>
    </div>
  </section>
)

const LayoutSignIn = () => (
  <section className='vg-sec' style={{ marginTop: 18 }}>
    <SectionHead index='AUTH' title='SIGN IN' cn='登录' />
    <Empty text='AUTH MODULE // 未启用' />
  </section>
)

const LayoutSignUp = () => (
  <section className='vg-sec' style={{ marginTop: 18 }}>
    <SectionHead index='AUTH' title='SIGN UP' cn='注册' />
    <Empty text='AUTH MODULE // 未启用' />
  </section>
)

const LayoutDashboard = () => (
  <section className='vg-sec' style={{ marginTop: 18 }}>
    <SectionHead index='SYS' title='DASHBOARD' cn='控制台' />
    <Empty text='DASHBOARD // 未启用' />
  </section>
)

export {
  LayoutBase,
  LayoutIndex,
  LayoutSlug,
  LayoutPostList,
  LayoutArchive,
  LayoutCategoryIndex,
  LayoutTagIndex,
  LayoutSearch,
  Layout404,
  LayoutSignIn,
  LayoutSignUp,
  LayoutDashboard,
  CONFIG as THEME_CONFIG
}
