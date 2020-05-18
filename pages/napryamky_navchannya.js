import React from 'react'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'
import Router from 'next/router'
import { getSortedDirectionsData } from '../lib/directions'
import { List, Icon } from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;

export default function Napryamky({ allDirectionsData }) {
  //console.log('alldir', allDirectionsData)
        //<title>{siteTitle}</title>
  return (
    <Layout filter search>
      <List renderHeader={() => 'Шукайте навчальний заклад за напрямками:'}>
        {
          allDirectionsData.map(v => {
            return (
              <Item arrow="horizontal" onClick={() => {Router.push('/napryamok/[napryamok]', `/napryamok/${v.category_link}`)}} key={v.category_id}>
                {v.category_name}
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
