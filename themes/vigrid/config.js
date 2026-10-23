/**
 * VIGRID 主题配置
 *
 * 设计语言：战术终端 / HUD
 * - 纯黑白灰，硬边线框，零圆角
 * - Rajdhani（窄体军用）承担所有拉丁标题与标签
 * - Share Tech Mono 承担编号、日期、元数据
 * - Noto Serif SC 承担中文标题，给档案感
 *
 * 所有键都可被 Notion「Config」页面或环境变量覆盖。
 */
const CONFIG = {
  // ---------- 外壳 ----------
  VIGRID_TAB_BAR_ENABLE: process.env.NEXT_PUBLIC_VIGRID_TAB_BAR || true, // 移动端底部固定标签栏
  VIGRID_TAB_BAR_ITEMS: '', // 留空则使用默认：首页 / 归档 / 分类 / 搜索

  // ---------- 首页 ----------
  VIGRID_HOME_STATUS_ENABLE: true, // 首屏状态条（站内统计）
  VIGRID_HOME_BANNER_ENABLE: false, // 文案横幅，默认关闭（原主题的招商位）
  VIGRID_HOME_BANNER_TITLE: '', // 若要开启，在这里写 Vigrid 自己的话
  VIGRID_HOME_BANNER_DESC: '',
  VIGRID_HOME_BANNER_TIPS: '',
  VIGRID_HOME_BANNER_BUTTON: '进入档案',
  VIGRID_HOME_BANNER_URL: '/archive',

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
