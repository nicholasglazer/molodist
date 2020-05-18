import React from 'react'
import Router from 'next/router'

import Link from 'next/link'
import s from '@emotion/styled'
import { Popover, Icon } from 'antd-mobile'
import { BsThreeDotsVertical } from 'react-icons/bs'
import SearchBar from './SearchBar'


const myImg = src => <img src={`https:gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
const Item = Popover.Item;

const goBack = () => Router.back();
const name = 'Молодiсть';

const HeaderComponent = ({search, filter, dots}) => {
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
          {
            dots
              ? (<Popover mask
                          overlayClassName="fortest"
                          overlayStyle={{ color: '#575759' }}
                          visible={false}
                          overlay={[
                            (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Відсканувати</Item>),
                            (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>QR Код</Item>),
                            (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                        <span style={{ marginRight: 5 }}>Допомога</span>
                      </Item>
                            ),
                          ]}
                          align={{
                            overflow: { adjustY: 0, adjustX: 0 },
                            offset: [-10, 0],
                          }}
                 >
                   <div style={{
                     height: '100%',
                     display: 'flex',
                     alignItems: 'center',
                     paddingRight: '12px'
                   }}
                   >
                     <BsThreeDotsVertical size="20" color="#666"/>
                   </div>
                 </Popover>)
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
padding-left: 18px;
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
