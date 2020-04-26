import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import s from '@emotion/styled'


import { useContext } from 'react'
import Theme from '../theme/theme'
import ThemeContext from '../theme/ThemeContext'

import utilStyles from '../styles/utils.module.css'

const name = 'Молодiсть'
const goBack = () => Router.back()

export const siteTitle = 'Молодiсть - все про навчання'

export default function Layout({ children, home }) {
  const theme = useContext(ThemeContext)
  const currentTheme = Theme[theme]
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
        {home ? (
          <>
            <img
              src="/images/profile.jpg"
              alt={name}
            />
            <h1 >{name}</h1>
          </>
        ) : (
          <>
            <a onClick={goBack}>Назад</a>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpg"
                  alt={name}
                />
              </a>
            </Link>
            <h2>
              <Link href="/">
                <a>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main style = {{
        padding: "1rem",
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}>{children}</main>
      {!home && (
        <div >
          <Link href="/napryamky_navchannya">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
const Wrapper = s.div`
.container {
  max-width: 36rem;
  padding: 0 .5rem;
  margin: 3rem auto 6rem;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.headerImage {
  width: 1rem;
  height: 1rem;
}

.headerHomeImage {
  width: 2rem;
  height: 2rem;
}

.backToHome {
  margin: 3rem 0 0;
}
`
