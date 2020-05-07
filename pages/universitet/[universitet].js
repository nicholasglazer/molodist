import React from 'react'
import Layout, { siteTitle } from '../../components/layout'
import { getAllUniversityIds, getUniversityData } from '../../lib/universities'
import s from '@emotion/styled'
import { Tabs, WhiteSpace } from 'antd-mobile'

export default function Universitet({ universityData: {data} }) {
const tabs = [
      { title: 'Про заклaд' },
      { title: 'Учні' },
      { title: 'Статистика' },
      { title: 'Ліцензії' },
      { title: 'Мапа' },
    ];
  const { koatuu_name,
          education_type_name,
          profession_educators,
          profession_licenses,
          speciality_licenses,
          university_name,
          university_name_en,
          university_short_name,
          university_phone,
          university_director_fio
        } = data;
  return (
    <Layout>
      <Head>
        <img style={{marginLeft: '12px'}} src="/images/eduBuilding64.png"/>
        <Title isTrue={true}>
          {university_name}
        </Title>
      </Head>
      <WhiteSpace />
      <Tabs
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
        tabs={tabs}
      >
      <div>{university_phone}</div>
      <div>{university_name_en}</div>
      <div>{university_short_name}</div>
      <div>{university_director_fio}</div>
      </Tabs>
    </Layout>
  )
}

const Head = s.div`
padding: 20px 8px 30px 8px;
background: #fff;
border-bottom: 1px solid #ddd;
`
const Title = s.div`
margin-top: 16px;
padding: 0;
font-size: ${props => props.isTrue ? '19px' : '28px'};
text-align: right;
`

export async function getStaticPaths() {
  const paths = getAllUniversityIds()
  return {
    paths,
    fallback: false
  }
}
export async function getStaticProps({ params }) {
  const universityData = getUniversityData(params.universitet)
  return {
    props: {
      universityData
    }
  }
}
