import '../styles/globals.css'
import Head from 'next/head'

const VERSION = '0.0.3'

export default function App({ Component, pageProps }) {
  return (
    <div id="app">
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="怪奇灵感生成器" />
        <meta name="description" content="一个奇怪的随机词组生成器" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="" />
        <meta name="msapplication-TileColor" content="#555" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#555" />

        <link rel="apple-touch-icon" href="/dizzy.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/dizzy.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/dizzy.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/dizzy.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/dizzy.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/dizzy.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/dizzy.png" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://bi.guhub.cn/" />
        <meta name="twitter:title" content="怪奇灵感生成器" />
        <meta name="twitter:description" content="一个奇怪的随即词组生成器" />
        <meta name="twitter:image" content="https://bi.guhub.cn/dizzy.png" />
        <meta name="twitter:creator" content="@Eltrac233" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="怪奇灵感生成器" />
        <meta property="og:description" content="一个奇怪的随即词组生成器" />
        <meta property="og:site_name" content="怪奇灵感生成器" />
        <meta property="og:url" content="https://bi.guhub.cn/" />
        <meta property="og:image" content="https://bi.guhub.cn/dizzy.png" />

        <title>怪奇灵感生成器</title>
      </Head>
      <header>
        <nav className="fixed top-0 inset-x-0 flex justify-between p-4 select-none hidden md:block">
          <div className="flex items-center gap-2">
            <img src="dizzy.png" className="w-10" />
            <span className="font-bold text-xl">怪奇灵感生成器</span>
          </div>
        </nav>

        <a href="https://github.com/BigCoke233/bizzare-inspirer" target="_blank" className="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" 
        style={{fill: '#151513', color: '#fff', position: 'absolute', top: 0, border: 0, right: 0}} aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" 
        style={{transformOrigin: '130px 106px'}} className="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"></path></svg></a>
      </header>
      <Component {...pageProps} />
      <footer className="absolute inset-x-0 bottom-0 text-gray-400 text-sm p-4 z-0
      flex justify-between">
        <p>版本: v{VERSION}</p>
        <p>作者 <a href="https://guhub.cn" target="_blank"
        className="underline underline-offset-4">Eltrac</a></p>
      </footer>
    </div>
    
  )
}
