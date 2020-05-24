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
          return (
            <div key={v.category_id}>
              <ParentTree>
                <TreeId onClick={() => {Router.push('/napryamok/[napryamkyId]/[napryamok]', `/napryamok/${v.category_id}/${v.category_link}`)}}>
                  #{v.category_id}
                </TreeId>
                <TreeName>
                  {v.category_name}
                </TreeName>
              </ParentTree>
              <ChildTree>
                {
                  v.categories
                   .map(x =>
                     <ChildTreeWrapper>
                       <ChildTreeHorDash></ChildTreeHorDash>
                       <ChildTreeItem>
                         <TreeId onClick={() => {Router.push('/pidnapryamok/[pidnapryamkyId]/[pidnapryamok]', `/pidnapryamok/${x.id}/${x.link}`)}}>
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
                <Brief>
                  Всi
                </Brief>
                <Brief>{v.categories.length}
                  {
                    v.categories.length === 1 ? ' напрямок' : v.categories.length >= 5 ? ' напрямків' : ' напрямки'
                  }
                </Brief>
              </Footer>
            </div>
          )
        })
      }
    </Layout>
  )
}

const TreeId = s.span`
padding-right: 4px;
color: #0070f3;
`
const TreeName = s.span`
text-transform: uppercase;
`
const ParentTree = s.div`
font-size: 14px;
color: #262928;
span:first-of-type {
padding-left: 18px;
}
`
const ChildTree = s.div`
color: #353638;
margin-left: 22px;
border-left: 1px dotted #aaa;
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
flex: 1;
padding-left: 4px;
span:last-of-type {
font-size: 12px;
}
`
const ChildTreeHorDash = s.div`
border-bottom: 1px dotted #aaa;
width: 10px;
height: 11px;
`
const Title = s.h1`
font-size: 14px;
padding-left: 18px;
color: #444545;
`

const Footer = s.div`
display: flex;
padding: 18px;
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
