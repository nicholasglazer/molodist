import { useState, useEffect } from 'react'
import s from '@emotion/styled'
import Layout, { siteTitle } from 'components/layout'
import Link from 'next/link'
import Router from 'next/router'
import { getSortedDirectionsData } from 'lib/directions'
import { List, Icon } from 'antd-mobile'
import SearchFilter from 'components/SearchFilter'
const Item = List.Item;
const Brief = Item.Brief;

//<title>{siteTitle}</title>
export default function Napryamky({ allDirectionsData }) {
  const [inputText, setInputText] = useState('');
  const [filterDisplay, setFilterDisplay] = useState([]);

  useEffect(() => {
    const res = allDirectionsData.filter(x => {
      return x.category_name.includes(inputText.trim().toLowerCase()) || x.categories.filter(y => y.name.includes(inputText.trim().toLowerCase()))[0]
    });
    setFilterDisplay(res)
  }, [inputText]);

  const handleChange = e => {
    setInputText(e);
  }
  console.log('alldir', allDirectionsData)
  // TODO make title as a common component
  return (
    <Layout filter search={{ setInputText, inputText, handleChange, placeholder: 'Пошук напрямкiв' }}>
      <Title>Шукайте навчальний заклад за напрямками:</Title>
      {
        filterDisplay.map(v => {
          console.log('v', v)
          return (
            <TreeWrapper key={v.category_id}>
              <ParentTree>
                <TreeId onClick={() => {Router.push('/napryamok/[napryamkyId]/[napryamok]', `/napryamok/${v.category_id}/${v.category_link}`)}}>
                  #{v.category_id}
                </TreeId>
                <TreeName>
                  {v.category_name}
                </TreeName>
              </ParentTree>
              <ChildTree color={v.category_color}>
                {
                  v.categories
                   .map(x =>
                     <ChildTreeWrapper>
                       <ChildTreeHorDash color={v.category_color} />
                       <ChildTreeItem color={v.category_color} onClick={() => {Router.push('/pidnapryamok/[pidnapryamkyId]/[pidnapryamok]', `/pidnapryamok/${x.id}/${x.link}`)}}>
                         <TreeId>
                           #{x.id}
                         </TreeId>
                         <TreeName>
                           {x.name}
                         </TreeName>
                       </ChildTreeItem>
                     </ChildTreeWrapper>
                   )
                }
              </ChildTree>
              <Footer>
                <div style={{marginLeft: 'auto'}}>
                  {v.categories.length}
                  {
                    v.categories.length === 1 ? ' напрямок' : v.categories.length >= 5 ? ' напрямків' : ' напрямки'
                  }
                </div>
              </Footer>
            </TreeWrapper>
          )
        })
      }
    </Layout>
  )
}

const TreeWrapper = s.div`
padding: 24px 18px;
&:nth-child(2n+1) {
background: ${props => props.background};
}
`
const TreeId = s.span`
padding-right: 4px;
color: #0070f3;
`
const TreeName = s.span`
text-transform: uppercase;
`
const ParentTree = s.div`
font-size: 13px;
font-weight: 600;
color: #262928;
padding: 4px 0;
`
const ChildTree = s.div`
color: #353638;
border-left: 4px solid ${props => props.color};
font-size: 14px;
display: flex;
flex-direction: column;
justify-content: center;
flex-wrap: wrap;
`
const ChildTreeWrapper = s.div`
display: flex;
`
const ChildTreeItem = s.div`
transition: all .36s ease-in-out;
background: #fffeff;
flex: 1;
padding: 8px 12px;
margin-top: 8px;
box-shadow: 2px 2px 4px rgba(60,60,60, .1);
span:last-of-type {
font-size: 12px;
}
&:active {
background: ${props => props.color};
}
`
const ChildTreeHorDash = s.span`
border-bottom: 1px dotted ${props => props.color};
width: 10px;
height: 26px;
`
const Title = s.h1`
font-size: 14px;
padding-left: 18px;
color: #444545;
`

const Footer = s.div`
display: flex;
padding-top: 12px;
justify-content: space-between;
`

export async function getStaticProps() {
  const allDirectionsData = getSortedDirectionsData()
  return {
    props: {
      allDirectionsData
    }
  }
}
