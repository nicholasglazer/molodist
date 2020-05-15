import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import s from '@emotion/styled'
import { Popover, Icon } from 'antd-mobile'

import { useContext } from 'react'
import Theme from '../theme/theme'
import ThemeContext from '../theme/ThemeContext'

import utilStyles from '../styles/utils.module.css'

const name = 'Молодiсть';
const goBack = () => Router.back();

export const siteTitle = 'Молодість - все про навчання';

export default function Layout({ children, resetFilter, home, back, filter, uni }) {
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
      {/* header/navigator */}
      {
        !uni ? (
          <Header>
            {home ? (
              <Title>{name}</Title>
            ) : (
              <BackHeader>
                <div>
                  <Link href="/">
                    <Title>
                      {name}
                    </Title>
                  </Link>
                  {filter && children[1]}
                </div>
                <div>
                  <Icon onClick={goBack} type="left" size="lg"/>
                  {
                    back ? (
                      <Link href="/filter">
                        <BigLink>
                          Фільтр
                        </BigLink>
                      </Link>
                    ) : null

                  }
                </div>
              </BackHeader>
            )}
          </Header>
        ) : null
      }
      {/* main child body  */}
      <main style = {{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`
      }}>{children}</main>
      {/* footer */}
      {!home && (
        <div >
          <Link href="/napryamky_navchannya">
            <a>← Напрямки навчання</a>
          </Link>
        </div>
      )}
    </div>
  )
}

const Title = s.h1`
font-size: 20px;
margin-top: 0px;
`

const BigLink = s.a`
font-size: 18px;
margin-right: 8px;
`
const Header = s.header`
margin-top: 10px;
display: flex;
`
const BackHeader = s.div`
margin-bottom: 12px;
border-bottom: 1px solid #dcdcdc;
display: flex;
flex-direction: column;
flex: 1;
> div {
padding: 0px 14px;
display: flex;
justify-content: space-between;
flex: 1;
border-bottom: 1px solid #e1e2e3;
}
> div:last-of-type {
padding-top: 12px;
padding-bottom: 12px;
padding-left: 10px;
border: none;
}
`
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
