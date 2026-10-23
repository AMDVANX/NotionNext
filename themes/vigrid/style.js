/* eslint-disable react/no-unknown-property */

/**
 * VIGRID 主题样式系统
 * 只对 #theme-vigrid 作用域生效，避免污染其它主题。
 * 全部使用原生 CSS，不使用 @apply。
 */

const FONTS = `
  @font-face {
    font-family: 'Vigrid Display';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/rajdhani-500-latin.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Vigrid Display';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/rajdhani-600-latin.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Vigrid Display';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/rajdhani-700-latin.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Vigrid Mono';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/share-tech-mono-400-latin.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
`

const TOKENS = `
  #theme-vigrid {
    --vg-bg: #f2f2f0;
    --vg-panel: #ffffff;
    --vg-sunken: #e9e9e6;
    --vg-ink: #101010;
    --vg-ink-2: #3a3a3a;
    --vg-muted: #7d7d7d;
    --vg-faint: #a8a8a8;
    --vg-line: #101010;
    --vg-line-soft: rgba(16, 16, 16, 0.16);
    --vg-line-hair: rgba(16, 16, 16, 0.08);
    --vg-accent: #ff5000;
    --vg-danger: #b91c1c;
    --vg-ok: #1f6f43;

    --vg-display: 'Vigrid Display', 'Inter', 'Noto Sans SC', system-ui, sans-serif;
    --vg-mono: 'Vigrid Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
    --vg-sans: 'Inter', 'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', system-ui, -apple-system, sans-serif;
    --vg-serif: 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', SimSun, serif;

    --vg-pad: 16px;
    --vg-max: 1180px;
    --vg-tabbar-h: 56px;

    background: var(--vg-bg);
    color: var(--vg-ink);
    font-family: var(--vg-sans);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  html.dark #theme-vigrid {
    --vg-bg: #0a0a0a;
    --vg-panel: #131313;
    --vg-sunken: #1b1b1b;
    --vg-ink: #ececec;
    --vg-ink-2: #c4c4c4;
    --vg-muted: #8b8b8b;
    --vg-faint: #5f5f5f;
    --vg-line: #ececec;
    --vg-line-soft: rgba(236, 236, 236, 0.2);
    --vg-line-hair: rgba(236, 236, 236, 0.1);
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

  @media (max-width: 719px) {
    .vg-shell.has-tabbar .vg-main {
      padding-bottom: calc(var(--vg-tabbar-h) + 28px);
    }
  }

  /* ---------- 顶栏 ---------- */
  .vg-head {
    position: sticky;
    top: 0;
    z-index: 40;
    background: var(--vg-bg);
    border-bottom: 1px solid var(--vg-line);
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

  /* ---------- 标签块 ---------- */
  .vg-chip {
    display: inline-flex;
    align-items: center;
    height: 20px;
    padding: 0 7px;
    background: var(--vg-ink);
    color: var(--vg-bg);
    font-family: var(--vg-display);
    font-weight: 700;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    line-height: 1;
    white-space: nowrap;
  }

  .vg-chip--ghost {
    background: transparent;
    color: var(--vg-ink);
    border: 1px solid var(--vg-line);
  }

  .vg-chip--accent {
    background: var(--vg-accent);
    color: #fff;
  }

  .vg-chip--danger {
    background: var(--vg-danger);
    color: #fff;
  }

  /* ---------- 区块标题 ---------- */
  .vg-sec {
    margin-top: 34px;
  }

  .vg-sec-head {
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid var(--vg-line);
    padding-bottom: 9px;
    margin-bottom: 0;
  }

  .vg-sec-idx {
    font-family: var(--vg-mono);
    font-size: 11px;
    color: var(--vg-faint);
    flex: none;
  }

  .vg-sec-title {
    font-family: var(--vg-display);
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    line-height: 1;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .vg-sec-cn {
    font-family: var(--vg-sans);
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.02em;
    color: var(--vg-muted);
    text-transform: none;
  }

  .vg-sec-more {
    margin-left: auto;
    font-family: var(--vg-mono);
    font-size: 11px;
    color: var(--vg-muted);
    display: inline-flex;
    align-items: center;
    gap: 5px;
    height: 32px;
    padding: 0 2px;
  }

  .vg-sec-more:hover {
    color: var(--vg-ink);
  }

  /* ---------- 状态条 ---------- */
  .vg-status {
    border: 1px solid var(--vg-line);
    background: var(--vg-panel);
    padding: 10px 12px;
    margin-top: 14px;
  }

  @media (min-width: 720px) {
    .vg-status {
      padding: 12px 14px;
      margin-top: 16px;
    }
  }

  .vg-status-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .vg-status-title {
    font-family: var(--vg-display);
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    background: var(--vg-ink);
    color: var(--vg-bg);
    padding: 3px 8px;
    line-height: 1.3;
  }

  .vg-status-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px 16px;
    margin-top: 12px;
  }

  @media (min-width: 720px) {
    .vg-status-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .vg-stat-label {
    font-family: var(--vg-mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    color: var(--vg-muted);
    text-transform: uppercase;
  }

  .vg-stat-value {
    font-family: var(--vg-display);
    font-weight: 700;
    font-size: 22px;
    line-height: 1.1;
    letter-spacing: 0.02em;
  }

  .vg-bar {
    height: 4px;
    background: var(--vg-sunken);
    margin-top: 5px;
    position: relative;
    overflow: hidden;
  }

  .vg-bar span {
    position: absolute;
    inset: 0 auto 0 0;
    background: var(--vg-ink);
  }

  .vg-bar.is-accent span {
    background: var(--vg-accent);
  }

  /* ---------- 首图卡片 ---------- */
  .vg-hero {
    margin-top: 18px;
    border: 1px solid var(--vg-line);
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

  .vg-chip--light {
    background: rgba(255, 255, 255, 0.16);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.45);
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
    border-top: 1px solid var(--vg-line-soft);
  }

  .vg-row {
    display: flex;
    gap: 12px;
    padding: 11px 0;
    border-bottom: 1px solid var(--vg-line-hair);
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
    border: 1px solid var(--vg-line-hair);
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
    border: 1px solid var(--vg-line);
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
    padding: 26px 0 0;
  }

  .vg-post-title {
    font-family: var(--vg-serif);
    font-weight: 700;
    font-size: 30px;
    line-height: 1.28;
    letter-spacing: -0.01em;
    margin: 12px 0 10px;
  }

  @media (min-width: 720px) {
    .vg-post-title {
      font-size: 38px;
    }
  }

  .vg-post-sum {
    font-size: 14px;
    line-height: 1.7;
    color: var(--vg-ink-2);
    margin-bottom: 14px;
  }

  .vg-metabar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0 14px;
    border-top: 1px solid var(--vg-line);
    border-bottom: 1px solid var(--vg-line);
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
    border: 1px solid var(--vg-line);
    overflow: hidden;
    background: var(--vg-sunken);
  }

  .vg-cover img {
    width: 100%;
    height: auto;
    filter: grayscale(1);
  }

  /* 正文 */
  .vg-article {
    margin-top: 22px;
    font-size: 16px;
    line-height: 1.9;
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
    border-left: 2px solid var(--vg-line-soft);
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
    border: 1px solid var(--vg-line-hair);
  }

  .vg-article a {
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 1px;
  }

  .vg-article hr {
    border: 0;
    border-top: 1px solid var(--vg-line);
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
    border: 1px solid var(--vg-line);
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
    border-top: 1px solid var(--vg-line-hair);
    padding: 6px 0;
    display: none;
  }

  .vg-toc[open] .vg-toc-list {
    display: block;
  }

  /* 桌面端强制展开，移动端默认折叠（避免目录吃掉首屏） */
  @media (min-width: 720px) {
    .vg-toc .vg-toc-list {
      display: block;
    }
    .vg-toc > summary::after {
      content: '' !important;
    }
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

  /* ---------- 底部标签栏 ---------- */
  .vg-tabbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    height: var(--vg-tabbar-h);
    display: flex;
    background: var(--vg-bg);
    border-top: 1px solid var(--vg-line);
    padding-bottom: env(safe-area-inset-bottom);
  }

  @media (min-width: 720px) {
    .vg-tabbar {
      display: none;
    }
  }

  .vg-tab {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    color: var(--vg-muted);
    position: relative;
    min-height: 44px;
  }

  .vg-tab svg {
    width: 17px;
    height: 17px;
  }

  .vg-tab-txt {
    font-family: var(--vg-display);
    font-weight: 600;
    font-size: 9.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .vg-tab.is-active {
    color: var(--vg-ink);
  }

  .vg-tab.is-active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 18px;
    height: 2px;
    background: var(--vg-ink);
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

  /* ---------- 空状态 ---------- */
  .vg-empty {
    border: 1px dashed var(--vg-line-soft);
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
    border: 1px solid var(--vg-line-soft);
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
    border: 1px solid var(--vg-line-soft);
    border-radius: 0;
  }

  .vg-article .notion-callout {
    border-radius: 0;
  }

  .vg-article .notion-quote {
    border-radius: 0;
  }

  .vg-article .notion-code,
  .vg-article pre {
    border-radius: 0;
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
