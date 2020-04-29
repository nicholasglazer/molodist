import { useState, useEffect } from 'react'
import Router from 'next/router'
import { Switch, List, Button, WhiteSpace } from 'antd-mobile'

import { getSortedPostsData } from '../lib/posts'
import Layout from '../components/layout'

import CheckBoxFilter from '../components/checkBoxFilter'
import SelectFilter from '../components/selectFilter'

import utilStyles from '../styles/utils.module.css'


const initialQualificationState = [
    {
      value: 0,
      checked: true,
      label: 'Доктор філософії'
    },
    {
      value: 1,
      checked: true,
      label: 'Магістр',
    },
    {
      value: 2,
      checked: true,
      label: 'Бакалавр'
    },
    {
      value: 3,
      checked: true,
      label: 'Спеціаліст'
    },
    {
      value: 4,
      checked: true,
      label: 'Молодший спеціаліст'
    }
]

const initialPropertyState = [
{
  value: 0,
  checked: true,
  label: 'Державна'
},
{
  value: 1,
  checked: true,
  label: 'Приватна'
},
{
  value: 2,
  checked: true,
  label: 'Комунальна'
}
]

const initialRegionState = ["Всі регіони"]

const initialUniState = true
const initialCollState = true

export default function Filter() {

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

  const goBack = () => Router.back()
  return (
    <Layout back>
      <SelectFilter title='Оберіть регіон' setRegion={setRegionFilter} current={regionState || initialRegionState} />
      <List
        renderHeader={() => 'Освітні категорії'}
      >
        <List.Item
          extra={<Switch
            checked={collCheck}
            onChange={() => setCollCheck(!collCheck)}
          />}
        >Коледжі</List.Item>
        <List.Item
          extra={<Switch
            checked={uniCheck}
            onChange={() => setUniCheck(!uniCheck)}
          />}
        >Університети</List.Item>
      </List>
      <CheckBoxFilter title='Оберіть кваліфікацію' setMultipleCheck={setQualificationState} current={qualificationState} />
      <CheckBoxFilter title='Оберіть формy власностi' setMultipleCheck={setPropertyState} current={propertyTypeState} />
      <Button onClick={resetFilter} style={{ margin: '24px 4px 12px 4px' }} type="ghost" size="small">Обнулити фільтр</Button><WhiteSpace />
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
