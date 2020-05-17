import React from 'react'
import Router from 'next/router'

import Link from 'next/link'
import s from '@emotion/styled'
import { Popover, Icon } from 'antd-mobile'
import SearchBar from './SearchBar'

const goBack = () => Router.back();
const name = 'Молодiсть';

const HeaderComponent = ({search, filter}) => {
  return(
    <HeaderWrapper>
      <TopHeader>
        <div>
          <Icon onClick={goBack} color="#888" type="left" size="lg" style={{width: '46px'}} />
        </div>
        <div>
          <Title>
            <Link href='/' >
              {name}
            </Link>
          </Title>
        </div>
        <div>
          {
            filter
              ? <Link href="/filter">
                   <BigLink>
                     Фільтр
                   </BigLink>
                 </Link>
            : null
          }
        </div>
      </TopHeader>
      <BottomHeader>
        <SearchBar />
      </BottomHeader>
    </HeaderWrapper>
  );
}

//{filter && children[1]}
const HeaderWrapper = s.header`
display: flex;
flex-direction: column;
`
const TopHeader = s.div`
display: flex;
flex: 1;
justify-content: space-between;
align-items: center;
> div {
 display: flex;
 flex: 1;
 align-items: center;
 &:last-of-type {
  justify-content: flex-end;
 }
}
`
const BottomHeader = s.div`
margin-bottom: 12px;
border-bottom: 1px solid #ddd;
display: flex;
flex-direction: column;
flex: 1;
`
const Title = s.h1`
font-size: 20px;
padding-left: 24px;
> a {
color: #344535;
}
`
const BigLink = s.a`
font-size: 18px;
margin-right: 8px;
`
const Header = s.div`
margin-top: 10px;
display: flex;
flex: 0 100%;
`

export default HeaderComponent;
