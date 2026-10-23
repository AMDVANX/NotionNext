import { useEffect, useState } from 'react'

/**
 * 欢迎语
 *
 * 每次打开页面随机抽一种语言的「欢迎来到 VIGRID」，使用各语言的正式/官方语体。
 * 十三种：英 / 日 / 俄 / 韩 / 中 / 法 / 芬 / 瑞 / 德 / 西 / 意 / 阿 / 挪威。
 *
 * 首屏服务端渲染固定用英文（索引 0），挂载后再随机替换 ——
 * 避免 SSR 与客户端不一致导致的 hydration 报错。
 */

const GREETINGS = [
  { code: 'EN', text: 'WELCOME TO VIGRID' },
  { code: 'JP', text: 'VIGRID へようこそ' },
  { code: 'RU', text: 'ДОБРО ПОЖАЛОВАТЬ В VIGRID' },
  { code: 'KO', text: 'VIGRID에 오신 것을 환영합니다' },
  { code: 'CN', text: '欢迎莅临 VIGRID' },
  { code: 'FR', text: 'BIENVENUE À VIGRID' },
  { code: 'FI', text: 'TERVETULOA VIGRIDIIN' },
  { code: 'SV', text: 'VÄLKOMMEN TILL VIGRID' },
  { code: 'DE', text: 'WILLKOMMEN BEI VIGRID' },
  { code: 'ES', text: 'BIENVENIDO A VIGRID' },
  { code: 'IT', text: 'BENVENUTI A VIGRID' },
  { code: 'AR', text: 'مرحباً بكم في فيغريد' },
  { code: 'NO', text: 'VELKOMMEN TIL VIGRID' }
]

const Welcome = ({ random = true, fixedText = '' }) => {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (!random) return
    setIdx(Math.floor(Math.random() * GREETINGS.length))
  }, [random])

  const g = GREETINGS[idx] || GREETINGS[0]
  const text = random ? g.text : fixedText || GREETINGS[0].text

  return (
    <section className='vg-welcome'>
      <p className='vg-welcome-text' suppressHydrationWarning>
        {text}
      </p>
    </section>
  )
}

export default Welcome
