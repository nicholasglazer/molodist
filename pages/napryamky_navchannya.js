import { useState, useEffect } from 'react'
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
  return (
    <Layout filter search={{ setInputText, inputText, handleChange, placeholder: 'Пошук напрямкiв' }}>
      <List renderHeader={() => 'Шукайте навчальний заклад за напрямками:'}>
        {
          filterDisplay.map(v => {
            return (
              <Item
                arrow="horizontal"
                key={v.category_id}
              >
                <span>
                  {v.category_name}
                </span>
                <span>
                  #{v.category_id}
                </span>
                <div>
                {
                  v.categories
                   .map(x =>
                     <div onClick={() => {Router.push('/napryamok/[napryamok]', `/napryamok/${x.link}`)}}>
                       {x.name}
                     </div>
                   )
                }
                </div>
                {
                  <div onClick={() => {Router.push('/napryamok/[napryamok]', `/napryamok/${v.category_link}`)}} >
                    Всi
                  </div>
                }
                <Brief>{v.categories.length}
                  {
                    v.categories.length === 1 ? ' напрямок' : v.categories.length >= 5 ? ' напрямків' : ' напрямки'
                  }
                </Brief>
              </Item>
            )
          })
        }
      </List>
    </Layout>
  )
}

export async function getStaticProps() {
  const allDirectionsData = getSortedDirectionsData()
  return {
    props: {
      allDirectionsData
    }
  }
}
