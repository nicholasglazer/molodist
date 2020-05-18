import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Tabs, WhiteSpace } from 'antd-mobile'

import { getAllUniversityIds, getUniversityData } from '../../lib/universities'
import Layout, { siteTitle } from '../../components/layout'

import UniHead from '../../components/UniHead'
import AboutTab from '../../components/UniAbout'
import UniSpecialitiesFallback from '../../components/UniSpecialitiesFallback'

// TODO make a fallback
const SpecialitiesTab = dynamic(
  () => import('../../components/UniSpecialities'),
  {
    loading: () => <UniSpecialitiesFallback />,
    ssr: false
  }
)
const CommunityTab = dynamic(
  () => import('../../components/UniCommunity'),
)
const FacultiesTab = dynamic(
  () => import('../../components/UniFaculties'),
)
const BranchesTab = dynamic(
  () => import('../../components/UniBranches'),
)
const EventsTab = dynamic(
  () => import('../../components/UniEvents'),
)


export default function Universitet({ universityData: {data, sortedSpec, specResults}, educatorsCount, hoursCount }) {
  const { university_short_name, university_name, facultets, branches } = data;
  const tabs = [
    { title: "Про заклaд" },
    { title: "Спеціальності" },
    { title: "Факультети" },
    { title: "Події" },
    { title: "Філіали" },
    { title: "Ком'юніті" },
  ];

  const [tabState, setTabState] = useState(0);
  return (
    <Layout dots>
      <UniHead shortName={university_short_name} name={university_name} />
      <WhiteSpace />
      <Tabs
        prerenderingSiblingsNumber={0}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} activeTab={tabState} page={3}/>}
        tabs={tabs}
        page={tabState}
        swipeable={false}
        tabBarActiveTextColor='#0070f3'
        onTabClick={(tab, index) => setTabState(index)}
      >
        <AboutTab data={data} />
        <SpecialitiesTab specResults={specResults} educatorsCount={educatorsCount} hoursCount={hoursCount} />
        <FacultiesTab facultets={facultets} />
        <EventsTab />
        <BranchesTab branches={branches}/>
        <CommunityTab />
      </Tabs>
    </Layout>
  )
}

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

  const hoursCount = universityData.data.speciality_licenses.reduce((agg, {part_time_count, full_time_count, evening_count}) => {
    return agg + parseInt(part_time_count) + parseInt(full_time_count) + parseInt(evening_count);
  }, 0);
  // Should return array of objects with
  // const edu = universityData.data.educators.reduce((agg, {distance_count, part_time_count, full_time_count, external_count, evening_count}) => {
  //   Object.keys(agg, {})
  // })
  return {
    props: {
      universityData,
      educatorsCount,
      hoursCount
    }
  }
}
