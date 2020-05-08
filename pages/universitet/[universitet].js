import React from 'react'
import Layout, { siteTitle } from '../../components/layout'
import { getAllUniversityIds, getUniversityData } from '../../lib/universities'
import s from '@emotion/styled'
import { List, Tabs, WhiteSpace } from 'antd-mobile'
import { FiMail, FiPhone, FiExternalLink } from 'react-icons/fi'
import { FaSearchLocation, FaUniversity, FaUserTie } from 'react-icons/fa'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { MdHttp, MdBusiness, MdLocationCity, MdHourglassEmpty } from 'react-icons/md'
import { GiMailbox } from 'react-icons/gi'
import { RiGroup2Line } from 'react-icons/ri'

export default function Universitet({ universityData: {data}, educatorsCount }) {

  //console.log('usiv', data)
  const tabs = [
    { title: 'Про заклaд' },
    { title: 'Учні' },
    { title: 'Факультети' },
    { title: 'Ліцензії' },
    { title: 'Мапа' },
  ];
  const { koatuu_name,
          post_index,
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
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4}/>}
        tabs={tabs}
      >
        <AboutTab>
          <div>
            <IconWrapper>
              <FaUniversity color="#888" size="22px"/>
            </IconWrapper>
            <AboutItem>{university_name_en}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <MdLocationCity color="#888" size="23px"/>
            </IconWrapper>
            <AboutItem>{koatuu_name}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <FaSearchLocation color="#888" size="20px"/>
            </IconWrapper>
            <AboutItem>{university_address}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <GiMailbox color="#888" size="24px"/>
            </IconWrapper>
            <AboutItem>{post_index}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <FiPhone color="#888" size="20px"/>
            </IconWrapper>
            <AboutItem>{university_phone}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <MdHourglassEmpty color="#888" size="22px"/>
            </IconWrapper>
            <AboutItem>{registration_year}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <MdHttp color="#888" size="26px"/>
            </IconWrapper>
            <AboutItem>{university_site}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <FiMail color="#888" size="20px"/>
            </IconWrapper>
            <AboutItem>{university_email}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <FaUserTie color="#888" size="19px"/>
            </IconWrapper>
            <AboutItem>{university_director_fio}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <RiGroup2Line color="#888" size="22px"/>
            </IconWrapper>
            <AboutItem>{university_financing_type_name}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <MdBusiness color="#888" size="21px"/>
            </IconWrapper>
            <AboutItem>{university_governance_type_name}</AboutItem>
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

const IconWrapper = s.div`
display: flex;
justify-content: center;
align-items: center;
width: 36px;
heigth: 36px;
flex: 0 100%;
svg {
}
`
const Educators = s.div`

`

const AboutItem = s.div`
`

const AboutTab = s.div`
padding: 32px 12px 16px 12px;
background: #fff;
display: flex;
flex-direction: column;
> div {
display: flex;
flex: 1;
justify-content: flex-start;
align-items: flex-start;
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
  // const edu = universityData.data.educators.reduce((agg, {distance_count, part_time_count, full_time_count, external_count, evening_count}) => {
  //   Object.keys({})
  // })

  return {
    props: {
      universityData,
      educatorsCount
    }
  }
}
