import { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import { Switch, List, Button, WhiteSpace } from 'antd-mobile'

import { getSortedPostsData } from '../lib/posts'
import Layout from '../components/layout'

import FilterContext from '../context/filter/filterCtx.js'
import CheckBoxFilter from '../components/checkBoxFilter'
import SelectFilter from '../components/selectFilter'
import ResetFilterButton from '../components/ResetFilterButton'

import utilStyles from '../styles/utils.module.css'

export default function Filter() {
  const { initialRegionState, initialUniState, initialCollState, initialQualificationState, initialPropertyState } = useContext(FilterContext)

  useEffect(() => {setRegionFilter(JSON.parse(window.localStorage.getItem('filtersState')) ? JSON.parse(window.localStorage.getItem('filtersState'))['regionState'] : initialRegionState)}, []);
  useEffect(() => {setUniCheck(JSON.parse(window.localStorage.getItem('filtersState')) ? JSON.parse(window.localStorage.getItem('filtersState'))['uniCheck'] : initialUniState)}, []);
  useEffect(() => {setCollCheck(JSON.parse(window.localStorage.getItem('filtersState')) ? JSON.parse(window.localStorage.getItem('filtersState'))['collCheck'] : initialCollState)}, []);
  useEffect(() => {setQualificationState(JSON.parse(window.localStorage.getItem('filtersState')) ? JSON.parse(window.localStorage.getItem('filtersState'))['qualificationState'] : initialQualificationState)}, []);
  useEffect(() => {setPropertyState(JSON.parse(window.localStorage.getItem('filtersState')) ? JSON.parse(window.localStorage.getItem('filtersState'))['propertyTypeState'] : initialPropertyState)}, []);

  const [regionState, setRegionFilter] = useState(initialRegionState);
  const [uniCheck, setUniCheck] = useState(initialUniState);
  const [collCheck , setCollCheck] = useState(initialCollState);
  const [qualificationState, setQualificationState] = useState(initialQualificationState);
  const [propertyTypeState, setPropertyState] = useState(initialPropertyState);

  useEffect(() => {
    window.localStorage.setItem('filtersState', JSON.stringify({
      regionState,
      uniCheck,
      collCheck,
      qualificationState,
      propertyTypeState
    }))
  }, [regionState, uniCheck, collCheck, qualificationState, propertyTypeState]);


  const resetFilter = () => {
    setRegionFilter(initialRegionState)
    setUniCheck(initialUniState)
    setCollCheck(initialCollState)
    setQualificationState(initialQualificationState)
    setPropertyState(initialPropertyState)
  }

  // TODO goback button
  const goBack = () => Router.back()
  return (
    <Layout resetFilter={resetFilter} reset done>
      <div style={{ marginBottom: '24px' }}>
        <SelectFilter title='Оберіть регіон' setRegion={setRegionFilter} current={regionState || initialRegionState} />
        <List renderHeader={() => 'Освітні категорії'}>
          <List.Item extra={<Switch
                              checked={collCheck}
                              onChange={() => setCollCheck(!collCheck)} />}
          >
            Коледжі
          </List.Item>
          <List.Item
            extra={<Switch
                     checked={uniCheck}
                     onChange={() => setUniCheck(!uniCheck)} />}
          >
            Університети
          </List.Item>
        </List>
        <CheckBoxFilter title='Оберіть кваліфікацію' setMultipleCheck={setQualificationState} current={qualificationState} />
        <CheckBoxFilter title='Оберіть формy власностi' setMultipleCheck={setPropertyState} current={propertyTypeState} />
      </div>
      <div style={{padding: '0 24px 24px 0'}}>
        <ResetFilterButton resetFilter={resetFilter}/>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
