import Link from 'next/link'
import s from '@emotion/styled'
import { css, jsx } from '@emotion/core'
import { FaFacebookF, FaTwitter, FaTelegramPlane } from 'react-icons/fa'

const social = [
    {
        name: 'Facebook',
        size: '30',
        link: 'https://www.facebook.com/molodist',
        color: '#3b5998',
        component: FaFacebookF
    },
    {
        name: 'Twitter',
        size: '30',
        link: 'https://twitter.com/molodist',
        color: '#1DA1F2',
        component: FaTwitter
    },
    {
        name: 'Telegramm',
        size: '30',
        link: 'https://t.me/molodist',
        color: '#0088cc ',
        component: FaTelegramPlane
    }
];

const FooterComponent = () => (
    <FooterWrapper>
      <div>
        <Link href="/napryamky_navchannya">
          <a> ← Напрямки навчання</a>
        </Link>
      </div>
      <Disclaimer>
      </Disclaimer>
        <FooterPagesLinks css={insetDeepShadow}>
          <Link href="/support" css={styledLink}>
            Підтримка
          </Link>
          <Link href="/marketing" css={styledLink}>
            Реклама
          </Link>
          <Link href="/contacts" css={styledLink}>
            Контакти
          </Link>
        </FooterPagesLinks>
      <AllRights css={insetDeepShadow} className="is-vertical">
        <p>
          © {new Date().getFullYear()} <a css={styledLink} href="https://molodist.org">molodist.org</a>
        </p>
        <div>Всі права захищені</div>
      </AllRights>
    </FooterWrapper>
)

const FooterWrapper = s.footer`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 24px 0;
box-shadow: inset 0px 4px 4px rgba(104, 102, 102, .125);
`
const AllRights = s.div`
padding-left: 0;
`
const Disclaimer = s.div`
letter-spacing: 8px;
font-weight: 600;
font-size: 1.1rem;
padding-top: 48px;
opacity: .8;
`
const FooterPagesLinks = s.div`
display: flex;
> a {
padding: 12px;
}
`

const styledLink = css`
font-size: 14px;
transition: color .3s ease;
color: #0070f3;
text-shadow: 1px 1px 2px rgba(1,1,1, 1)
&:hover {
color: #fff;
}
`
const insetDeepShadow = css`
background-color: #767676;
color: transparent;
text-shadow: 2px 1px 3px rgba(255,255,255,0.5);
-webkit-background-clip: text !important;
background-clip: text;
letter-spacing: .05rem;
font-size: 14px;
`

export default FooterComponent;
