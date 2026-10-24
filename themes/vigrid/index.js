import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NotionPage from '@/components/NotionPage'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'

import CONFIG from './config'
import { Style } from './style'
import Header from './components/Header'
import Footer from './components/Footer'
import SectionHead from './components/SectionHead'
import HudStrip from './components/HudStrip'
import BackToTop from './components/BackToTop'
import ReadingProgress from './components/ReadingProgress'
import HeroCard from './components/HeroCard'
import Welcome from './components/Welcome'
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

  // 本主题只有深色形态；强制挂上 dark 类，
  // 让 react-notion-x 与 notion.css 的暗色分支生效（否则表格/代码块会深底深字）。
  useEffect(() => {
    const el = document.documentElement
    el.classList.add('dark')
    el.classList.remove('light')
  }, [])

  return (
    <div id='theme-vigrid' className='vg-shell'>
      <Head>
        <link
          rel='stylesheet'
          href='/fonts/noto-serif-sc/noto-serif-sc.css'
        />
      </Head>
      <Style />
      <Header {...props} />
      <main className='vg-main'>{children}</main>
      <Footer {...props} />
      <BackToTop />
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
    <nav className='vg-pager' aria-label='PAGINATION'>
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

const Empty = ({ text = 'NO RECORDS' }) => (
  <div className='vg-empty'>{text}</div>
)

/* ------------------------------------------------------------------ */
/* 首页                                                                */
/* ------------------------------------------------------------------ */

const LayoutIndex = props => {
  const { posts = [] } = props

  const list = Array.isArray(posts) ? posts : []
  const hero = list[0]
  const rest = list.slice(1, 1 + Number(cfg('VIGRID_HOME_LATEST_COUNT', 6)))

  return (
    <div className='vg-home'>
      <Welcome
        random={cfg('VIGRID_WELCOME_RANDOM', true) !== false}
        fixedText={cfg('VIGRID_WELCOME', '')}
      />

      {hero ? (
        <HeroCard post={hero} kicker={cfg('VIGRID_HERO_LABEL', 'START HERE')} />
      ) : (
        <div style={{ marginTop: 18 }}>
          <Empty />
        </div>
      )}

      <HudStrip />

      {rest.length > 0 && (
        <section className='vg-sec'>
          <SectionHead
            index='01'
            title='INTEL FEED'
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
    </div>
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
        <Empty text='LOADING' />
      </div>
    )
  }

  const cover = post.pageCover

  return (
    <article>
      <ReadingProgress />
      <header className='vg-post-head'>
        <div className='vg-row-kicker'>
          {post.category ? (
            <SmartLink href={`/category/${post.category}`}>
              <span className='vg-chip'>{post.category}</span>
            </SmartLink>
          ) : null}
        </div>

        <h1 className='vg-post-title'>{post.title}</h1>
        {post.summary ? <p className='vg-post-sum'>{post.summary}</p> : null}

        {cfg('VIGRID_POST_META_ENABLE', true) ? <PostMeta post={post} /> : null}
      </header>

      {cover ? (
        <figure className='vg-cover'>
          <img src={cover} alt='' referrerPolicy='no-referrer' />
        </figure>
      ) : null}

      {/* 桌面端：左侧目录栏 + 右侧正文（正文限制在舒适阅读宽度） */}
      <div className='vg-post-body'>
        <aside className='vg-post-aside'>
          {cfg('VIGRID_POST_TOC_ENABLE', true) ? <Toc toc={post.toc} /> : null}
        </aside>

        <div className='vg-article'>
          <NotionPage post={post} />
        </div>
      </div>

      {/* 标签：文章有 tagItems 时才出现 */}
      {Array.isArray(post.tagItems) && post.tagItems.length > 0 ? (
        <div className='vg-post-tags'>
          <span className='vg-post-tags-label'>TAGS</span>
          {post.tagItems.map(t => (
            <SmartLink
              key={t.name}
              href={`/tag/${encodeURIComponent(t.name)}`}
              className='vg-chip vg-chip--ghost'>
              {t.name}
            </SmartLink>
          ))}
        </div>
      ) : null}

      <nav className='vg-postnav' aria-label='PREV / NEXT'>
        {prev ? (
          <SmartLink
            href={prev.href || `/article/${prev.slug}`}
            className='vg-postnav-item vg-postnav-item--prev'>
            <span className='vg-postnav-label'>← PREV</span>
            <span className='vg-postnav-title'>{prev.title}</span>
          </SmartLink>
        ) : (
          <span className='vg-postnav-item vg-postnav-item--empty' aria-hidden='true' />
        )}

        {next ? (
          <SmartLink
            href={next.href || `/article/${next.slug}`}
            className='vg-postnav-item vg-postnav-item--next'>
            <span className='vg-postnav-label'>NEXT →</span>
            <span className='vg-postnav-title'>{next.title}</span>
          </SmartLink>
        ) : (
          <span className='vg-postnav-item vg-postnav-item--empty' aria-hidden='true' />
        )}
      </nav>

      {cfg('VIGRID_POST_RELATE_ENABLE', true) &&
      Array.isArray(recommendPosts) &&
      recommendPosts.length > 0 ? (
        <section className='vg-sec'>
          <SectionHead index='—' title='RELATED' />
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
        />
        <ListBody posts={posts} emptyText='NO RECORDS' />
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
        <SectionHead index='ARC' title='ARCHIVE' />
        <Empty />
      </section>
    )
  }

  return (
    <>
      <section className='vg-sec' style={{ marginTop: 18 }}>
        <SectionHead index='ARC' title='ARCHIVE' />
      </section>
      {keys.map((k, i) => (
        <section className='vg-sec' key={k}>
          <SectionHead
            index={String(i + 1).padStart(2, '0')}
            title={k}
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
      <SectionHead index='CAT' title='CATEGORIES' />
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
      <SectionHead index='TAG' title='TAGS' />
      {tagOptions.length === 0 ? (
        <Empty text='NO TAGS' />
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

/**
 * 搜索
 *
 * 不走 Algolia，直接在客户端做子串过滤：标题 / 摘要 / 分类 / 标签 / slug。
 *
 * 注意：pages/search/index.js 自己会过滤一遍，且在无 ?s= 参数时
 * 把 posts 覆盖成空数组。因此检索语料优先取 allNavPages（全量、不被过滤）。
 */
const LayoutSearch = props => {
  const { posts, allNavPages, keyword: initialKeyword } = props
  const router = useRouter()
  const [q, setQ] = useState('')

  // 从 URL 或服务端 props 取初始关键词
  useEffect(() => {
    const s = router?.query?.s
    if (typeof s === 'string' && s) setQ(s)
    else if (initialKeyword) setQ(String(initialKeyword))
  }, [router?.query?.s, initialKeyword])

  const corpus =
    Array.isArray(allNavPages) && allNavPages.length > 0
      ? allNavPages
      : Array.isArray(posts)
        ? posts
        : []

  const needle = q.trim().toLowerCase()

  const results = needle
    ? corpus.filter(p => {
        const hay = [
          p.title,
          p.summary,
          p.category,
          p.slug,
          ...(Array.isArray(p.tagItems) ? p.tagItems.map(t => t.name) : []),
          ...(Array.isArray(p.tags) ? p.tags : [])
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return hay.indexOf(needle) >= 0
      })
    : corpus

  return (
    <section className='vg-sec' style={{ marginTop: 18 }}>
      <SectionHead index='FIND' title='SEARCH' />

      <div className='vg-search'>
        <input
          type='search'
          className='vg-search-input'
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder='SEARCH KEYWORD'
          aria-label='SEARCH KEYWORD'
          autoComplete='off'
          spellCheck='false'
        />
        {q ? (
          <button
            type='button'
            className='vg-search-clear'
            onClick={() => setQ('')}
            aria-label='CLEAR'>
            CLEAR
          </button>
        ) : null}
        <span className='vg-search-count'>
          {String(results.length).padStart(2, '0')} FOUND
        </span>
      </div>

      <ListBody posts={results} emptyText='NO MATCH // NO RECORDS FOUND' />
    </section>
  )
}

const Layout404 = props => (
  <section className='vg-sec' style={{ marginTop: 18 }}>
    <SectionHead index='ERR' title='404' />
    <div className='vg-empty' style={{ marginTop: 14 }}>
      <div style={{ fontFamily: 'var(--vg-display)', fontSize: 52, lineHeight: 1, color: 'var(--vg-ink)' }}>
        404
      </div>
      <div style={{ marginTop: 10 }}>RECORD NOT FOUND // THIS FILE IS MISSING OR SEALED</div>
      <div style={{ marginTop: 18 }}>
        <SmartLink href='/' style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--vg-ink)' }}>
          BACK TO INDEX <IconArrow className='w-4 h-4' />
        </SmartLink>
      </div>
    </div>
  </section>
)

const LayoutSignIn = () => (
  <section className='vg-sec' style={{ marginTop: 18 }}>
    <SectionHead index='AUTH' title='SIGN IN' />
    <Empty text='AUTH MODULE // OFFLINE' />
  </section>
)

const LayoutSignUp = () => (
  <section className='vg-sec' style={{ marginTop: 18 }}>
    <SectionHead index='AUTH' title='SIGN UP' />
    <Empty text='AUTH MODULE // OFFLINE' />
  </section>
)

const LayoutDashboard = () => (
  <section className='vg-sec' style={{ marginTop: 18 }}>
    <SectionHead index='SYS' title='DASHBOARD' />
    <Empty text='DASHBOARD // OFFLINE' />
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
