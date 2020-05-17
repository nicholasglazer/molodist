import Head from 'next/head'

import { useContext } from 'react'
import Theme from '../theme/theme'
import ThemeContext from '../theme/ThemeContext'

import Header from './Header'
import Footer from './Footer'

export const siteTitle = 'Молодість - все про навчання';

export default function Layout({ children, resetFilter, filter, search }) {
  const theme = useContext(ThemeContext);
  const currentTheme = Theme[theme];
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="найдите свой вуз в украине, учавствуйте в дискуссиях"
        />
        <meta
          property="og:image"
          content={``}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header filter={filter} search={search} />

      <main style = {{backgroundColor: `${currentTheme.backgroundColor}`, color: `${currentTheme.textColor}`}}>
        {children}
      </main>

      <Footer />
    </div>
  )
}
