import Head from 'next/head'

import { useContext } from 'react'
import Theme from '../theme/theme'
import ThemeContext from '../theme/ThemeContext'

import Header from './Header'
import Footer from './Footer'

export const siteTitle = 'Молодість - все про навчання';

export default function Layout({ children, resetFilter, filter, search, dots, reset, done }) {
  const theme = useContext(ThemeContext);
  const currentTheme = Theme[theme];
  //TODO meta tags, description, SEO
  // if i need 1 Head and transfer args to layout, or i need multiple heads
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Знайдіть свій вуз в Україні, беріть участь в дискусіях"
        />
        <meta
          property="og:image"
          content={``}
        />
        <meta
          name="og:title"
          content={siteTitle}
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
      </Head>

      <Header resetFilter={resetFilter} filter={filter} search={search} dots={dots} reset={reset} done={done} />

      <main style = {{backgroundColor: `${currentTheme.backgroundColor}`, color: `${currentTheme.textColor}`}}>
        {children}
      </main>

      <Footer />
    </div>
  )
}
