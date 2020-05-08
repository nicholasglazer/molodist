import React from 'react'
import Layout, { siteTitle } from '../../components/layout'
import { getAllUniversityIds, getUniversityData } from '../../lib/universities'
import s from '@emotion/styled'
import { List, Tabs, WhiteSpace } from 'antd-mobile'
import { FiMail, FiPhone, FiExternalLink} from 'react-icons/fi'
import { FaUniversity } from 'react-icons/fa'
import {GrMapLocation, GrLocationPin, GrCluster} from 'react-icons/gr'
import {AiOutlineClockCircle} from 'react-icons/ai'
import {MdHttp, MdBusiness, MdLocationCity, MdHourglassEmpty} from 'react-icons/md'
import {GiSandsOfTime} from 'react-icons/gi'

export default function Universitet({ universityData: {data}, educatorsCount }) {

  console.log('usiv', data)
  const tabs = [
    { title: 'Про заклaд' },
    { title: 'Учні' },
    { title: 'Факультети' },
    { title: 'Ліцензії' },
    { title: 'Мапа' },
  ];
  const { koatuu_name,
          education_type_name,
          profession_educators,
          profession_licenses,
          speciality_licenses,
          registration_year,
          university_email,
          university_site,
          university_name,
          university_name_en,
          university_short_name,
          university_phone,
          university_address,
          university_director_fio,
          university_financing_type_name,
          university_governance_type_name,
          facultets,
          educators
        } = data;
  return (
    <Layout>
      <Head>
        <div style={{textAlign: 'right', fontSize: '17px', color: '#888', fontWeight: '500'}}>{university_short_name}</div>
        <img style={{marginLeft: '12px'}} src="/images/eduBuilding64.png"/>
        <Title isTrue={true}>
          {university_name}
        </Title>
      </Head>
      <WhiteSpace/>
      <Tabs
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
        tabs={tabs}
      >
        <AboutTab>
          <div>
            <FaUniversity />
            <div>{university_name_en}</div>
          </div>
          <div>
            <MdLocationCity />
            <div>{koatuu_name}</div>
          </div>
          <div>
            <GrMapLocation />
            <div>{university_address}</div>
          </div>
          <div>
            <FiPhone />
            <div>{university_phone}</div>
          </div>
          <div>
            <MdHourglassEmpty />
            <div>{registration_year}</div>
          </div>
          <div>
            <MdHttp />
            <div>{university_site}</div>
          </div>
          <div>
            <FiMail />
            <div>{university_email}</div>
          </div>
          <div>
            <GrCluster />
            <div>{university_financing_type_name}</div>
          </div>
          <div>
            <MdBusiness />
            <div>{university_governance_type_name}</div>
          </div>
        </AboutTab>
        <Educators>
          Всi учнi {educatorsCount}
        </Educators>
        <List>
          {facultets.map(x => <List.Item>{x}</List.Item> )}
        </List>
      </Tabs>
    </Layout>
  )
}

const Educators = s.div`

`

const AboutTab = s.div`
padding: 8px;
background: #fff;
> div {
display: flex;
align-items: center;
svg {
margin-right: 8px;
}
}
`
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

  const educatorsCount = universityData.data.educators.reduce((agg, {distance_count, part_time_count, full_time_count, external_count, evening_count}) => {
    return agg + parseInt(distance_count) + parseInt(part_time_count) + parseInt(full_time_count) + parseInt(external_count) + parseInt(evening_count);
  }, 0);
  const edu = universityData.data.educators.reduce((agg, {distance_count, part_time_count, full_time_count, external_count, evening_count}) => {
    Object.keys({})
  })

  return {
    props: {
      universityData,
      educatorsCount
    }
  }
}
