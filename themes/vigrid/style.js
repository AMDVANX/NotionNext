/* eslint-disable react/no-unknown-property */

/**
 * VIGRID 主题样式系统
 * 只对 #theme-vigrid 作用域生效，避免污染其它主题。
 * 全部使用原生 CSS，不使用 @apply。
 */

const FONTS = `
  @font-face {
    font-family: 'Vigrid Mono';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/share-tech-mono-400-latin.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  /* Futura 的几何无衬线兜底：Jost（开源 Futura 近亲）。
     真机上有 Futura 时会优先用 Futura，没有时用 Jost，视觉几乎一致。 */
  @font-face {
    font-family: 'Futura Alt';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/jost-500-latin.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Futura Alt';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/jost-600-latin.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Futura Alt';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/jost-700-latin.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
`

const TOKENS = `
  #theme-vigrid {
    --vg-bg: #08080a;
    --vg-panel: #0f0f12;
    --vg-sunken: #17171b;
    --vg-ink: #f0f0ee;
    --vg-ink-2: #c6c6c2;
    --vg-muted: #8a8a86;
    --vg-faint: #57575a;
    --vg-line: rgba(240, 240, 238, 0.42);
    --vg-line-soft: rgba(240, 240, 238, 0.22);
    --vg-line-hair: rgba(240, 240, 238, 0.1);
    --vg-accent: #6ea3bf;
    --vg-hot: #ff6a1a;
    --vg-danger: #e0453a;
    --vg-ok: #4fbf87;

    /* 全部自托管，不依赖任何系统字体：
       拉丁 = Futura Alt（Jost），中日韩 = Noto Serif SC，等宽 = Vigrid Mono。
       这样任何设备、任何系统上渲染完全一致。 */
    --vg-display: 'Futura Alt', 'Noto Serif SC', serif;
    --vg-title: 'Futura Alt', 'Noto Serif SC', serif;
    --vg-serif: 'Noto Serif SC', serif;
    --vg-body: 'Noto Serif SC', serif;
    --vg-sans: 'Futura Alt', 'Noto Serif SC', serif;
    --vg-mono: 'Vigrid Mono', 'Noto Serif SC', monospace;

    --vg-pad: 16px;
    --vg-max: 1180px;

    background: var(--vg-bg);
    color: var(--vg-ink);
    font-family: var(--vg-sans);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* 本主题只提供深色模式：同时压掉 body 底色，避免移动端回弹时露出白底 */
  body {
    background-color: #08080a;
  }
`

const BASE = `
  #theme-vigrid *,
  #theme-vigrid *::before,
  #theme-vigrid *::after {
    box-sizing: border-box;
  }

  #theme-vigrid a {
    color: inherit;
    text-decoration: none;
  }

  #theme-vigrid img {
    display: block;
    max-width: 100%;
  }

  #theme-vigrid ::selection {
    background: var(--vg-ink);
    color: var(--vg-bg);
  }

  /* 极细滚动条 */
  #theme-vigrid ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  #theme-vigrid ::-webkit-scrollbar-thumb {
    background: var(--vg-line-soft);
  }

  /* ---------- 打字系统 ---------- */
  .vg-display {
    font-family: var(--vg-display);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    line-height: 1;
  }

  .vg-label {
    font-family: var(--vg-display);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: 11px;
    line-height: 1.2;
    color: var(--vg-muted);
  }

  .vg-mono {
    font-family: var(--vg-mono);
    font-size: 11px;
    letter-spacing: 0.04em;
    color: var(--vg-muted);
    font-variant-numeric: tabular-nums;
  }

  .vg-serif {
    font-family: var(--vg-serif);
    font-weight: 700;
  }

  /* ---------- 外壳 ---------- */
  .vg-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--vg-bg);
  }


  .vg-main {
    flex: 1 1 auto;
    width: 100%;
    max-width: var(--vg-max);
    margin: 0 auto;
    padding: 0 var(--vg-pad) calc(var(--vg-pad) * 2);
  }


  /* ---------- 顶栏 ---------- */
  .vg-head {
    position: sticky;
    top: 0;
    z-index: 40;
    background: var(--vg-bg);
  }

  .vg-head-inner {
    max-width: var(--vg-max);
    margin: 0 auto;
    padding: 0 var(--vg-pad);
    height: 52px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .vg-head-mark {
    width: 3px;
    height: 22px;
    background: var(--vg-ink);
    flex: none;
  }

  .vg-brand {
    display: flex;
    align-items: baseline;
    gap: 9px;
    min-width: 0;
  }

  .vg-brand-name {
    font-family: var(--vg-display);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 17px;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .vg-brand-sub {
    font-family: var(--vg-mono);
    font-size: 10px;
    letter-spacing: 0.08em;
    color: var(--vg-muted);
    white-space: nowrap;
    display: none;
  }

  @media (min-width: 720px) {
    .vg-brand-sub {
      display: inline;
    }
    .vg-head-inner {
      height: 60px;
    }
  }

  .vg-head-spacer {
    flex: 1 1 auto;
  }

  .vg-head-action {
    width: 44px;
    height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: -10px;
    color: var(--vg-ink);
  }

  /* 桌面导航 */
  .vg-nav {
    display: none;
    align-items: center;
    gap: 4px;
  }

  @media (min-width: 720px) {
    .vg-nav {
      display: flex;
    }
  }

  .vg-nav-item {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 44px;
    padding: 0 12px;
    font-family: var(--vg-display);
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--vg-ink-2);
    border-bottom: 2px solid transparent;
    transition: color 0.15s, border-color 0.15s;
  }

  .vg-nav-item:hover,
  .vg-nav-item.is-active {
    color: var(--vg-ink);
    border-bottom-color: var(--vg-ink);
  }

  .vg-nav-drop {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background: var(--vg-panel);
    border: 1px solid var(--vg-line);
    display: none;
    flex-direction: column;
  }

  .vg-nav-item:hover .vg-nav-drop,
  .vg-nav-item:focus-within .vg-nav-drop {
    display: flex;
  }

  .vg-nav-drop a {
    padding: 12px 14px;
    font-size: 13px;
    border-bottom: 1px solid var(--vg-line-hair);
    min-height: 44px;
    display: flex;
    align-items: center;
  }

  .vg-nav-drop a:last-child {
    border-bottom: 0;
  }

  .vg-nav-drop a:hover {
    background: var(--vg-sunken);
  }

  /* ---------- 分类标签：左侧竖标记 + 字，不用实心色块 ---------- */
  .vg-chip {
    display: inline-flex;
    align-items: center;
    height: 15px;
    padding-left: 7px;
    border-left: 2px solid var(--vg-ink);
    background: transparent;
    color: var(--vg-ink);
    font-family: var(--vg-display);
    font-weight: 600;
    font-size: 9.5px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    line-height: 1;
    white-space: nowrap;
  }

  .vg-chip--ghost {
    border-left-color: var(--vg-line-soft);
    color: var(--vg-muted);
  }

  .vg-chip--accent {
    border-left-color: var(--vg-hot);
    color: var(--vg-hot);
  }

  .vg-chip--light {
    border-left-color: rgba(255, 255, 255, 0.75);
    color: #fff;
  }

  .vg-chip--danger {
    border-left-color: var(--vg-danger);
    color: var(--vg-danger);
  }

  /* ---------- 区块标题：标题 + 细引线 + 右侧入口 ---------- */
  .vg-sec {
    margin-top: 34px;
  }

  .vg-sec-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 2px;
  }

  .vg-sec-idx {
    font-family: var(--vg-mono);
    font-size: 10px;
    color: var(--vg-faint);
    flex: none;
  }

  .vg-sec-title {
    font-family: var(--vg-display);
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    line-height: 1;
    flex: none;
  }


  .vg-sec-more {
    flex: none;
    font-family: var(--vg-mono);
    font-size: 10px;
    letter-spacing: 0.08em;
    color: var(--vg-muted);
    display: inline-flex;
    align-items: center;
    gap: 5px;
    height: 24px;
    padding: 0 2px;
  }

  .vg-sec-more:hover {
    color: var(--vg-ink);
  }

  /* ---------- 首图卡片 ---------- */
  .vg-hero {
    margin-top: 18px;
    background: var(--vg-panel);
    display: block;
    position: relative;
    overflow: hidden;
  }

  .vg-hero-media {
    display: block;
    position: relative;
    aspect-ratio: 4 / 3;
    background: var(--vg-sunken);
    overflow: hidden;
  }

  @media (min-width: 720px) {
    .vg-hero-media {
      aspect-ratio: 21 / 9;
    }
  }

  .vg-hero-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.94) 0%,
      rgba(0, 0, 0, 0.72) 30%,
      rgba(0, 0, 0, 0.18) 62%,
      rgba(0, 0, 0, 0) 100%
    );
    pointer-events: none;
  }

  .vg-hero-overlay {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 14px;
    display: block;
    color: #fff;
  }

  @media (min-width: 720px) {
    .vg-hero-overlay {
      padding: 24px 26px;
    }
  }

  .vg-hero--overlay .vg-hero-title {
    color: #fff;
    margin: 9px 0 5px;
  }

  .vg-hero--overlay .vg-hero-sum {
    color: rgba(255, 255, 255, 0.74);
  }

  .vg-hero-date {
    font-family: var(--vg-mono);
    font-size: 10px;
    letter-spacing: 0.06em;
    color: rgba(255, 255, 255, 0.7);
  }

  .vg-hero-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1) contrast(1.05);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .vg-hero:hover .vg-hero-media img {
    transform: scale(1.03);
  }

  .vg-hero-body {
    display: block;
    padding: 14px;
  }

  .vg-hero-title {
    font-family: var(--vg-serif);
    font-weight: 700;
    font-size: 24px;
    line-height: 1.32;
    letter-spacing: -0.01em;
    margin: 9px 0 6px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (min-width: 720px) {
    .vg-hero-title {
      font-size: 34px;
      line-height: 1.24;
    }
  }

  .vg-hero-sum {
    font-size: 13px;
    line-height: 1.6;
    color: var(--vg-muted);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* ---------- 情报流（列表项） ---------- */
  .vg-feed {
  }

  .vg-row {
    display: flex;
    gap: 12px;
    padding: 11px 0;
    align-items: flex-start;
    min-height: 44px;
  }

  .vg-row:hover .vg-row-title {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .vg-row-main {
    min-width: 0;
    flex: 1 1 auto;
  }

  .vg-row-kicker {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 5px;
  }

  .vg-row-title {
    font-family: var(--vg-serif);
    font-weight: 700;
    font-size: 16px;
    line-height: 1.45;
    margin: 0;
    letter-spacing: -0.005em;
  }

  .vg-row-sum {
    font-size: 12.5px;
    line-height: 1.6;
    color: var(--vg-muted);
    margin-top: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .vg-row-thumb {
    display: block;
    width: 84px;
    height: 62px;
    flex: none;
    background: var(--vg-sunken);
    overflow: hidden;
  }

  .vg-row-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1);
  }

  @media (min-width: 720px) {
    .vg-row-thumb {
      width: 132px;
      height: 86px;
    }
    .vg-row-title {
      font-size: 17px;
    }
  }

  /* ---------- 分类索引 ---------- */
  .vg-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
  }

  @media (min-width: 720px) {
    .vg-grid--3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
    }
  }

  .vg-mini {
    display: block;
    background: var(--vg-panel);
    padding: 12px;
    margin-top: 12px;
  }

  .vg-mini:hover {
    background: var(--vg-sunken);
  }

  .vg-mini-idx {
    display: block;
    font-family: var(--vg-mono);
    font-size: 10px;
    color: var(--vg-faint);
  }

  .vg-mini-title {
    font-family: var(--vg-serif);
    font-weight: 700;
    font-size: 15px;
    line-height: 1.45;
    margin: 6px 0 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* ---------- 文章页 ---------- */
  .vg-post-head {
    padding: 34px 0 0;
    text-align: center;
  }

  .vg-post-head .vg-row-kicker {
    justify-content: center;
  }

  .vg-post-title {
    font-family: var(--vg-title);
    font-weight: 700;
    font-size: 34px;
    line-height: 1.26;
    letter-spacing: -0.01em;
    margin: 14px 0 12px;
    text-align: center;
  }

  @media (min-width: 720px) {
    .vg-post-title {
      font-size: 46px;
      line-height: 1.2;
    }
  }

  @media (min-width: 1024px) {
    .vg-post-title {
      font-size: 58px;
      line-height: 1.16;
      letter-spacing: -0.015em;
    }
  }

  .vg-post-sum {
    font-family: var(--vg-body);
    font-size: 15px;
    line-height: 1.7;
    color: var(--vg-ink-2);
    max-width: 660px;
    margin: 0 auto 16px;
    text-align: center;
  }

  .vg-metabar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0 14px;
    padding: 8px 0;
    margin: 14px 0 0;
  }

  .vg-metabar-item {
    font-family: var(--vg-mono);
    font-size: 11px;
    letter-spacing: 0.05em;
    color: var(--vg-muted);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    line-height: 1.8;
  }

  .vg-metabar-item b {
    color: var(--vg-ink);
    font-weight: 400;
  }

  .vg-cover {
    margin: 18px 0 0;
    overflow: hidden;
    background: var(--vg-sunken);
  }

  .vg-cover img {
    width: 100%;
    height: auto;
    filter: grayscale(1);
  }

  /* 正文 + 目录（单栏居中，桌面端也不做侧边栏） */
  .vg-post-body {
    margin-top: 22px;
  }

  .vg-post-aside {
    margin-bottom: 18px;
  }

  @media (min-width: 1024px) {
    .vg-post-body {
      max-width: 780px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 30px;
    }

    .vg-post-aside {
      margin-bottom: 26px;
    }

    /* 标题 / 目录 / 正文 / 分页统一到同一条中轴 */
    .vg-post-head,
    .vg-post-tags,
    .vg-pager,
    article > .vg-sec {
      max-width: 780px;
      margin-left: auto;
      margin-right: auto;
    }

    /* 封面比正文略宽，形成版面节奏 */
    .vg-cover {
      max-width: 1000px;
      margin-left: auto;
      margin-right: auto;
    }

    .vg-cover img {
      width: 100%;
      max-height: 520px;
      object-fit: cover;
    }

    /* 桌面端目录排两列，避免一个长条占满屏 */
    .vg-toc-list {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 18px;
    }
  }

  /* 正文 */
  .vg-article {
    margin-top: 22px;
    font-family: var(--vg-body);
    font-size: 16.5px;
    line-height: 1.95;
    color: var(--vg-ink);
    overflow-wrap: break-word;
    word-break: normal;
  }

  .vg-article p {
    margin: 0 0 1.15em;
  }

  .vg-article h1,
  .vg-article h2,
  .vg-article h3,
  .vg-article h4 {
    font-family: var(--vg-serif);
    font-weight: 700;
    line-height: 1.4;
    margin: 1.8em 0 0.7em;
    padding-left: 11px;
    border-left: 3px solid var(--vg-ink);
  }

  .vg-article h1 { font-size: 1.5em; }
  .vg-article h2 { font-size: 1.32em; }
  .vg-article h3 { font-size: 1.16em; }
  .vg-article h4 { font-size: 1.04em; }

  .vg-article blockquote {
    margin: 1.4em 0;
    padding: 4px 0 4px 14px;
    color: var(--vg-ink-2);
    font-style: normal;
  }

  /* KaTeX 公式块在窄屏会横向溢出，这里强制可滚动而不裁切 */
  .vg-article .notion-equation,
  .vg-article .katex-display {
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 4px;
  }

  .vg-article img {
    margin: 1.2em 0;
  }

  .vg-article a {
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 1px;
  }

  .vg-article hr {
    border: 0;
    margin: 2em 0;
  }

  .vg-article table {
    display: block;
    overflow-x: auto;
    max-width: 100%;
  }

  .vg-article pre {
    overflow-x: auto;
    max-width: 100%;
  }

  /* ---------- 目录 ---------- */
  .vg-toc {
    background: var(--vg-panel);
    margin-top: 20px;
  }

  .vg-toc > summary {
    list-style: none;
    cursor: pointer;
    padding: 11px 13px;
    display: flex;
    align-items: center;
    gap: 9px;
    min-height: 44px;
    font-family: var(--vg-display);
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .vg-toc > summary::-webkit-details-marker {
    display: none;
  }

  .vg-toc > summary::after {
    content: '+';
    margin-left: auto;
    font-family: var(--vg-mono);
    font-size: 15px;
  }

  .vg-toc[open] > summary::after {
    content: '\\2212';
  }

  .vg-toc-list {
    padding: 6px 0;
  }

  .vg-toc-list a {
    display: block;
    padding: 7px 13px;
    font-size: 13px;
    line-height: 1.5;
    color: var(--vg-ink-2);
    border-left: 2px solid transparent;
  }

  .vg-toc-list a:hover {
    background: var(--vg-sunken);
    border-left-color: var(--vg-ink);
    color: var(--vg-ink);
  }

  .vg-toc-list a.lv3 {
    padding-left: 26px;
    font-size: 12.5px;
    color: var(--vg-muted);
  }


  @media (min-width: 1024px) {
    .vg-home-cols {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 312px;
      gap: 44px;
      align-items: start;
    }

    .vg-home-main > .vg-sec:first-child,
    .vg-home-side > .vg-sec:first-child {
      margin-top: 34px;
    }

    /* 侧栏只有 312px，分类卡片改成单列列表 */
    .vg-home-side .vg-grid--3 {
      grid-template-columns: 1fr;
    }
  }

  /* ---------- 顶部 HUD：四城时钟 + 拉普兰天气 ---------- */
  .vg-hud {
    background: var(--vg-panel);
    margin-top: 12px;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 720px) {
    .vg-hud {
      flex-direction: row;
      align-items: stretch;
    }
  }

  .vg-hud-clocks {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    flex: 2 1 0;
    min-width: 0;
  }

  @media (min-width: 720px) {
    .vg-hud-clocks {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .vg-hud-cell {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 6px 9px 7px;
    min-width: 0;
  }

  .vg-hud-cell:nth-child(2n) {
    border-right: 0;
  }
  .vg-hud-cell:nth-last-child(-n + 2) {
    border-bottom: 0;
  }

  @media (min-width: 720px) {
    .vg-hud-cell:nth-child(2n) {
    }
    .vg-hud-cell:nth-last-child(-n + 2) {
    }
    .vg-hud-cell:nth-child(4n) {
      border-right: 0;
    }
    .vg-hud-cell:nth-last-child(-n + 4) {
      border-bottom: 0;
    }
  }

  .vg-hud-city {
    font-family: var(--vg-display);
    font-weight: 600;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--vg-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .vg-hud-time {
    display: flex;
    align-items: baseline;
    margin-top: 1px;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  .vg-hud-hm {
    font-family: var(--vg-display);
    font-weight: 700;
    font-size: 25px;
    letter-spacing: 0.01em;
    color: var(--vg-ink);
  }

  @media (min-width: 720px) {
    .vg-hud-hm {
      font-size: 28px;
    }
  }

  .vg-hud-sec {
    font-family: var(--vg-mono);
    font-size: 11px;
    color: var(--vg-faint);
    margin-left: 1px;
  }

  .vg-hud-foot {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 3px;
  }

  .vg-hud-tz {
    font-family: var(--vg-mono);
    font-size: 9px;
    letter-spacing: 0.06em;
    color: var(--vg-faint);
  }


  /* 夏令时指示：STD 灰、DST 亮 */
  .vg-hud-dst {
    font-family: var(--vg-mono);
    font-size: 8px;
    line-height: 1;
    letter-spacing: 0.08em;
    color: var(--vg-faint);
  }

  .vg-hud-dst.is-dst {
    color: var(--vg-ink-2);
  }

  .vg-hud-dot {
    width: 4px;
    height: 4px;
    background: var(--vg-line-soft);
    display: inline-block;
  }

  .vg-hud-dot.is-night {
    background: var(--vg-accent);
  }

  /* ---------- 伊瓦洛天气（右侧 1/3，用底层色与时钟区分） ---------- */
  .vg-hud-wx {
    padding: 8px 12px 9px;
    background: var(--vg-sunken);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    flex: 1 1 0;
    min-width: 0;
  }

  @media (min-width: 720px) {
    .vg-hud-wx {
      border-top: 0;
    }
  }

  .vg-hud-wx-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
  }

  .vg-hud-wx-name {
    font-family: var(--vg-display);
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.02em;
    color: var(--vg-ink);
    text-transform: none;
  }

  .vg-hud-wx-coord {
    font-family: var(--vg-mono);
    font-size: 8.5px;
    color: var(--vg-faint);
    letter-spacing: 0.06em;
    white-space: nowrap;
  }

  .vg-hud-wx-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    min-width: 0;
  }

  .vg-hud-wx-temp {
    font-family: var(--vg-display);
    font-weight: 700;
    font-size: 46px;
    line-height: 0.9;
    color: var(--vg-ink);
    letter-spacing: -0.01em;
  }

  .vg-hud-wx-lines {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    min-width: 0;
    text-align: right;
  }

  .vg-hud-wx-cond {
    font-family: var(--vg-display);
    font-weight: 600;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--vg-ink-2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .vg-hud-wx-sun {
    display: flex;
    gap: 16px;
    justify-content: space-between;
  }

  .vg-hud-wx-kv {
    font-family: var(--vg-mono);
    font-size: 9px;
    letter-spacing: 0.06em;
    color: var(--vg-faint);
    white-space: nowrap;
  }

  .vg-hud-wx-kv b {
    color: var(--vg-ink-2);
    font-weight: 400;
  }

  .vg-hud-wx-sep {
    margin: 0 5px;
    opacity: 0.45;
  }

  .vg-hud-wx-flag {
    min-height: 13px;
  }

  .vg-hud-wx-polar {
    display: inline-block;
    font-family: var(--vg-display);
    font-weight: 700;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    background: var(--vg-accent);
    color: #fff;
    padding: 2px 6px;
    line-height: 1.25;
  }

  /* ---------- 文章标签 ---------- */
  .vg-post-tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px 12px;
    margin-top: 26px;
    padding-top: 14px;
  }

  .vg-post-tags-label {
    font-family: var(--vg-mono);
    font-size: 9.5px;
    letter-spacing: 0.14em;
    color: var(--vg-faint);
  }

  /* ---------- 阅读进度条 ---------- */
  .vg-progress {
    position: fixed;
    left: 0;
    right: 0;
    top: 52px;
    height: 2px;
    z-index: 45;
    background: transparent;
    pointer-events: none;
  }

  @media (min-width: 720px) {
    .vg-progress {
      top: 60px;
    }
  }

  .vg-progress span {
    display: block;
    height: 100%;
    background: var(--vg-accent);
    transition: width 0.08s linear;
  }

  /* ---------- 回到顶部 ---------- */
  .vg-top {
    position: fixed;
    right: 14px;
    bottom: 18px;
    z-index: 46;
    width: 42px;
    height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--vg-panel);
    border: 1px solid var(--vg-line-soft);
    color: var(--vg-ink);
    cursor: pointer;
    opacity: 0;
    transform: translateY(6px);
    pointer-events: none;
    transition: opacity 0.2s, transform 0.2s;
  }

  .vg-top svg {
    width: 15px;
    height: 15px;
  }

  .vg-top.is-show {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .vg-top:hover {
    border-color: var(--vg-line);
  }

  /* ---------- 页脚 ---------- */
  .vg-foot {
    border-top: 1px solid var(--vg-line);
    margin-top: 44px;
    padding: 18px var(--vg-pad) 26px;
    max-width: var(--vg-max);
    margin-left: auto;
    margin-right: auto;
  }

  .vg-foot-inner {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 18px;
    align-items: center;
    justify-content: space-between;
  }

  .vg-foot-note {
    font-family: var(--vg-mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    color: var(--vg-faint);
    text-transform: uppercase;
  }

  /* ---------- 搜索 ---------- */
  .vg-search {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin: 16px 0 4px;
  }

  .vg-search-input {
    flex: 1 1 220px;
    min-width: 0;
    height: 44px;
    padding: 0 2px;
    border: 0;
    border-bottom: 1px solid var(--vg-line-soft);
    background: transparent;
    color: var(--vg-ink);
    font-family: var(--vg-mono);
    font-size: 14px;
    letter-spacing: 0.04em;
    border-radius: 0;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
  }


  /* 隐藏 WebKit 原生搜索清除按钮，避免出现蓝色图标 */
  .vg-search-input::-webkit-search-cancel-button,
  .vg-search-input::-webkit-search-decoration {
    -webkit-appearance: none;
    appearance: none;
    display: none;
  }

  .vg-search-input::placeholder {
    color: var(--vg-faint);
    font-size: 11px;
    letter-spacing: 0.14em;
  }

  .vg-search-input:focus {
    border-bottom-color: var(--vg-ink);
  }

  .vg-search-clear {
    height: 32px;
    padding: 0 8px;
    border: 0;
    background: transparent;
    color: var(--vg-muted);
    font-family: var(--vg-display);
    font-weight: 600;
    font-size: 10px;
    letter-spacing: 0.14em;
    cursor: pointer;
  }

  .vg-search-clear:hover {
    color: var(--vg-ink);
  }

  .vg-search-count {
    font-family: var(--vg-mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    color: var(--vg-faint);
    white-space: nowrap;
  }

  /* ---------- 空状态 ---------- */
  .vg-empty {
    padding: 40px 16px;
    text-align: center;
    color: var(--vg-muted);
    font-family: var(--vg-mono);
    font-size: 12px;
    letter-spacing: 0.1em;
  }

  /* ---------- 分页 ---------- */
  .vg-pager {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 26px;
    flex-wrap: wrap;
  }

  .vg-pager a,
  .vg-pager span {
    min-width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--vg-mono);
    font-size: 12px;
  }

  .vg-pager .is-current {
    background: var(--vg-ink);
    color: var(--vg-bg);
    border-color: var(--vg-ink);
  }

  /* ---------- 修复 Notion 内容自带样式 ---------- */
  .vg-article .notion-page {
    padding: 0 !important;
    max-width: 100% !important;
  }

  .vg-article .notion-title {
    display: none;
  }

  .vg-article .notion-page-icon-inline,
  .vg-article .notion-page-cover-wrapper {
    display: none !important;
  }

  .vg-article .notion-bookmark {
    border-radius: 0;
  }

  /* Notion 自带彩色底与圆角，与黑白硬边语言冲突，统一压平。
     注意：styles/notion.css 里有 html.dark .notion-callout { … !important }
     优先级为 (0,2,1)，因此这里必须用 #theme-vigrid 的 ID 选择器才压得住。 */
  #theme-vigrid .vg-article .notion-callout {
    background: var(--vg-panel) !important;
    border-radius: 0 !important;
    color: var(--vg-ink) !important;
  }

  #theme-vigrid .vg-article .notion-callout .notion-callout-text,
  #theme-vigrid .vg-article .notion-callout .notion-text,
  #theme-vigrid .vg-article .notion-callout .notion-semantic-string {
    color: var(--vg-ink) !important;
  }

  #theme-vigrid .vg-article .notion-quote {
    background: transparent !important;
    border-radius: 0 !important;
    color: var(--vg-ink-2) !important;
  }

  #theme-vigrid .vg-article .notion-table-of-contents {
    background: var(--vg-panel) !important;
    border-radius: 0 !important;
    padding: 12px 14px !important;
  }

  #theme-vigrid .vg-article .notion-table-of-contents a {
    color: var(--vg-ink-2) !important;
  }

  /* 本主题自带自动生成的目录（.vg-toc），
     隐藏 Notion 正文里的目录块，避免同一页出现两份目录。 */
  #theme-vigrid .vg-article .notion-table-of-contents {
    display: none !important;
  }

  .vg-article .notion-quote,
  .vg-article .notion-equation,
  .vg-article .notion-page-icon,
  .vg-article .notion-code,
  .vg-article .notion-collection,
  .vg-article .notion-collection-card,
  .vg-article .notion-bookmark,
  .vg-article .notion-callout,
  .vg-article .notion-table-of-contents,
  .vg-article .notion-asset-wrapper {
    border-radius: 0 !important;
  }

  .vg-article .notion-code,
  .vg-article pre {
    border-radius: 0;
  }

  /* ---------- 首页：单栏居中 ---------- */
  .vg-home {
    width: 100%;
    max-width: 860px;
    margin: 0 auto;
  }

  /* ---------- 欢迎语 ---------- */
  .vg-welcome {
    margin: 22px 0 20px;
    text-align: center;
  }

  .vg-welcome-text {
    font-family: var(--vg-title);
    font-weight: 700;
    font-size: 21px;
    line-height: 1.42;
    letter-spacing: 0.02em;
    color: var(--vg-ink);
    margin: 0;
    text-transform: uppercase;
  }


  @media (min-width: 720px) {
    .vg-welcome-text {
      font-size: 27px;
    }
  }



  /* ---------- 上一篇 / 下一篇 ---------- */
  .vg-postnav {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 40px;
  }

  @media (min-width: 720px) {
    .vg-postnav {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }
  }

  .vg-postnav-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 9px;
    min-height: 92px;
    padding: 18px 20px;
    background: var(--vg-sunken);
  }

  @media (min-width: 720px) {
    .vg-postnav-item {
      min-height: 110px;
      padding: 22px 24px;
    }
  }

  .vg-postnav-item--next {
    align-items: flex-end;
    text-align: right;
  }

  .vg-postnav-item--empty {
    background: transparent;
  }

  a.vg-postnav-item:hover {
    background: #212127;
  }

  .vg-postnav-label {
    font-family: var(--vg-mono);
    font-size: 10px;
    letter-spacing: 0.16em;
    color: var(--vg-muted);
  }

  .vg-postnav-title {
    font-family: var(--vg-title);
    font-weight: 700;
    font-size: 17px;
    line-height: 1.42;
    color: var(--vg-ink);
  }

  @media (min-width: 720px) {
    .vg-postnav-title {
      font-size: 19px;
    }
  }

  /* ---------- 移动端：天气排在时钟之前 ---------- */
  @media (max-width: 719px) {
    .vg-hud-wx {
      order: -1;
    }
  }

  /* 正文内 Notion 自带边框（标注块紫框 / 引用卡浅灰框 / 分隔线）一并去掉 */
  #theme-vigrid .vg-article .notion-callout,
  #theme-vigrid .vg-article .notion-bookmark,
  #theme-vigrid .vg-article .notion-hr {
    border: 0 !important;
  }

  #theme-vigrid .vg-article .notion-hr {
    margin: 2em 0;
  }


  /* ================= 视觉强化 ================= */

  /* 1) 首图：胶片处理（高对比 + 颗粒 + 四角定位标） */
  .vg-hero--overlay .vg-hero-media img {
    filter: grayscale(1) contrast(1.18) brightness(0.92);
  }

  .vg-hero-media::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.07;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* 四角 L 形定位标 */
  .vg-hero--overlay {
    position: relative;
  }

  .vg-hero--overlay::after {
    content: '';
    position: absolute;
    inset: 10px;
    z-index: 3;
    pointer-events: none;
    opacity: 0.5;
    background-image: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff),
      linear-gradient(#fff, #fff), linear-gradient(#fff, #fff),
      linear-gradient(#fff, #fff), linear-gradient(#fff, #fff),
      linear-gradient(#fff, #fff), linear-gradient(#fff, #fff);
    background-repeat: no-repeat;
    background-size: 15px 1px, 1px 15px, 15px 1px, 1px 15px, 15px 1px, 1px 15px,
      15px 1px, 1px 15px;
    background-position: left top, left top, right top, right top, left bottom,
      left bottom, right bottom, right bottom;
  }

  @media (min-width: 720px) {
    .vg-hero--overlay::after {
      inset: 16px;
      background-size: 22px 1px, 1px 22px, 22px 1px, 1px 22px, 22px 1px, 1px 22px,
        22px 1px, 1px 22px;
    }
  }


  /* 2) 引文：放大成拉引（pull quote），不用水印字形 */
  #theme-vigrid .vg-article .notion-equation-block {
    margin: 2.6em 0;
    text-align: center;
  }

  #theme-vigrid .vg-article .notion-equation-block .katex,
  #theme-vigrid .vg-article .notion-equation-block .katex-html,
  #theme-vigrid .vg-article .notion-equation-block .katex .mord,
  #theme-vigrid .vg-article .notion-equation-block .katex .mtext {
    font-family: var(--vg-title) !important;
    font-size: 1.16em !important;
    line-height: 1.75 !important;
  }

  /* 3) 全页暗角：把视觉重心收进画面中央 */
  #theme-vigrid::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 20;
    pointer-events: none;
    background: radial-gradient(
      130% 90% at 50% 42%,
      rgba(0, 0, 0, 0) 42%,
      rgba(0, 0, 0, 0.42) 100%
    );
  }

`

const Style = () => {
  return (
    <style jsx global>{`
      ${FONTS}
      ${TOKENS}
      ${BASE}
    `}</style>
  )
}

export { Style }
