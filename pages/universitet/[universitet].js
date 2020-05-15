import { useState } from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile'
import { getAllUniversityIds, getUniversityData } from '../../lib/universities'
import Layout, { siteTitle } from '../../components/layout'
// REFACTOR
// TODO make load dynamically
import UniHead from '../../components/UniHead'
import AboutTab from '../../components/UniAbout'
import BranchesTab from '../../components/UniBranches'
import EventsTab from '../../components/UniEvents'
import CommunityTab from '../../components/UniCommunity'
import FacultiesTab from '../../components/UniFaculties'
import SpecialitiesTab from '../../components/UniSpecialities'

export default function Universitet({ universityData: {data, sortedSpec, specResults}, educatorsCount }) {
  const { university_short_name, university_name, facultets, branches } = data;
  const tabs = [
    { title: "Про заклaд" },
    { title: "Спеціальності" },
    { title: "Факультети" },
    { title: "Події" },
    { title: "Філіали" },
    { title: "Ком'юніті" },
  ];

  const [tabState, setTabState] = useState(1);

  return (
    <Layout uni>
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
        <SpecialitiesTab specResults={specResults} />
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
  // Should return array of objects with
  // const edu = universityData.data.educators.reduce((agg, {distance_count, part_time_count, full_time_count, external_count, evening_count}) => {
  //   Object.keys(agg, {})
  // })
  return {
    props: {
      universityData,
      educatorsCount
    }
  }
}
