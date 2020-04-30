import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import { getAllDirectionIds, getDirectionData, getSortedDataByDirections } from '../../lib/directions'
import s from '@emotion/styled'
import {css} from '@emotion/core'
import { Icon, Grid, Badge } from 'antd-mobile'
import Router from 'next/router'

//<AuditOutlined />
// TODO cache filter results
export default function Napryamok({ sortedDirection, directionData, l }) {
  const { categories } = sortedDirection.data
  //const { categories } = directionData.data
            //<Grid data={v.licenses} isCarousel onClick={() => {}} />
  // <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
  // TODO v.type and other filters
  const [filterState, setFilterState] = useState([]);
  console.log('sorted data', sortedDirection)

  useEffect(() => {setLicensesState(l.reduce((acc, cur) => cur + acc ))});

  useEffect(() => setFilterState(JSON.parse(window.localStorage.getItem('filtersState')) || []), [categories]);

  const [licensesState, setLicensesState] = useState([]);


const hotpink = {
  color: '#333',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}
  console.log('state', filterState)

          //setLicensesState(licensesFilter)
  return (
    <Layout filter>
      <SpecialitiesWrapper>
        <Title>{licensesState}</Title>
      {
        categories.map(v => {
          const licensesFilter = v.licenses
                                 .filter(x => filterState.collCheck && x.type === 'college' || filterState.uniCheck && x.type === 'university')
                                 .filter(x => filterState.qualificationState.some(k => k.checked && k.label === x.qualification_group_name))
                                 .filter(x => filterState.propertyTypeState.some(k => k.checked && k.label === x.university_financing_type_name))
                                 .filter(x => filterState.regionState[0] !== 'Всі регіони' ? filterState.regionState[0] === x.region_name : true)
          return(
          <div key={v.name}>
            <SpecialityTitle>
              <SpecialityTitleText>{v.name.toUpperCase()}</SpecialityTitleText>
              <SpecialityLength><Badge text={licensesFilter.length} overflowCount={500} /></SpecialityLength>
            </SpecialityTitle>
            <Grid data={licensesFilter}
                  isCarousel
                  columnNum={2}
                  itemStyle={hotpink}
                  carouselMaxRow={1}
                  renderItem={dataItem => (
             <GridCellWrapper onClick={() => {Router.push('/universitet/[universitet]', `/universitet/${dataItem.university_edrpou}`)}}>
               <span>{dataItem.university_short_name}</span>
               <span>{dataItem.qualification_group_name}</span>
               <Icon type="check" size={'md'} color='#353535' />
             </GridCellWrapper>
                  )}
            />

          </div>
        )}
        )
      }
      </SpecialitiesWrapper>
    </Layout>
  )
}

const Title = s.div`

`

const GridCellWrapper = s.div`
padding: 4px;
display: flex;
min-height: 100%;
flex-direction: column;
justify-content: space-between;
flex: 1;
`

const SpecialityTitle = s.div`
display: flex;
padding: 4px;
font-size: 11px;
justify-content: flex-between;
align-items: center;
`
const SpecialityLength = s.div`
align-self: center;
padding-left: 8px;
padding-right: 4px;
`

const SpecialityTitleText = s.div`
color: #888;
flex: 1;
`
const SpecialitiesWrapper = s.div`
height: 100%;
`

export async function getStaticPaths() {
  const paths = getAllDirectionIds()
  return {
    paths,
    fallback: false
  }
}
export async function getStaticProps({ params }) {
  const directionData = getDirectionData(params.napryamok)
  const sortedDirection = getSortedDataByDirections(directionData.directionId)

  const { categories } = sortedDirection.data
  const l = categories.map(x => x.licenses.length)
  console.log('cat', l)

  return {
    props: {
      directionData,
      sortedDirection,
      l
    }
  }
}
