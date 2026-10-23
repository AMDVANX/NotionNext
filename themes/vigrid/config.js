/**
 * VIGRID 主题配置
 *
 * 设计语言：档案 / 战术终端
 * - 纯黑底 + 硬边线框 + 零圆角
 * - Futura（缺失时用自托管的 Jost 兜底）承担拉丁标题与标签
 * - Share Tech Mono 承担编号、日期、元数据
 * - Noto Serif SC 承担中文标题，给档案感
 *
 * 所有键都可被 Notion「Config」页面或环境变量覆盖。
 */
const CONFIG = {
  // ---------- 字体 ----------
  // 本主题自托管字体（public/fonts 下的 Jost + Share Tech Mono）。
  // 声明此开关后，SEO 组件会跳过 FONT_URL 指向的外部字体加载，
  // 省掉十几个用不上的 woff2 请求。
  SKIP_WEB_FONT: true,

  // ---------- 外壳 ----------
  // 本主题强制深色，不提供浅色形态。

  // ---------- 首页 ----------
  VIGRID_HOME_BANNER_ENABLE: false, // 文案横幅，默认关闭（原主题的招商位）
  VIGRID_HOME_BANNER_TITLE: '', // 若要开启，在这里写 Vigrid 自己的话
  VIGRID_HOME_BANNER_DESC: '',
  VIGRID_HOME_BANNER_TIPS: '',
  VIGRID_HOME_BANNER_BUTTON: 'ENTER ARCHIVE',
  VIGRID_HOME_BANNER_URL: '/archive',

  // 首页欢迎语：每次打开随机抽一种语言的「欢迎来到 VIGRID」（13 种语言）
  VIGRID_WELCOME_RANDOM: true,
  // 关掉随机后使用这句固定文案
  VIGRID_WELCOME: 'WELCOME TO VIGRID',

  // 首图左上角标签（「从这里开始读」）
  VIGRID_HERO_LABEL: 'START HERE',
  VIGRID_HOME_LATEST_COUNT: 6, // 「最新情报」条数
  VIGRID_HOME_CATEGORY_LIMIT: 4, // 首页展示几个分类区块
  VIGRID_CATEGORY_POSTS_PER_ROW: 3, // 每个分类区块里展示几篇

  // ---------- 文章页 ----------
  VIGRID_POST_TOC_ENABLE: true, // 目录
  VIGRID_POST_META_ENABLE: true, // 元数据条（编号/日期/字数）
  VIGRID_POST_SHARE_ENABLE: true,
  VIGRID_POST_RELATE_ENABLE: true,

  // ---------- 列表 ----------
  VIGRID_LIST_PREVIEW: false, // 列表是否加载正文预览
  VIGRID_EXCERPT_LINES: 2,

  // ---------- 杂项 ----------
  VIGRID_SHOW_COUNT: true, // 显示各类目数量
  VIGRID_HERO_LINES: 3, // 首图卡片标题最多几行
  VIGRID_FOOTER_NOTE: 'PROJECT: VICES // ALL RECORDS CLASSIFIED'
}

module.exports = CONFIG
