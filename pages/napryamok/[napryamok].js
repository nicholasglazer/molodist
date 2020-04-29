import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import { getAllDirectionIds, getDirectionData, getSortedDataByDirections } from '../../lib/directions'
import s from '@emotion/styled'
import {css} from '@emotion/core'
import { Icon, Grid } from 'antd-mobile'
import Router from 'next/router'

//<AuditOutlined />
// TODO cache filter results
export default function Napryamok({ sortedDirection, directionData }) {
  const { categories } = sortedDirection.data
  //const { categories } = directionData.data
            //<Grid data={v.licenses} isCarousel onClick={() => {}} />
  // <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
  // TODO v.type and other filters
  const [filterState, setFilterState] = useState([]);

  useEffect(() => setFilterState(JSON.parse(window.localStorage.getItem('filtersState')) || []), []);

const hotpink = {
  color: '#333',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}

  return (
    <Layout filter>
      {
        categories.map(v => {
          const licensesFilter = v.licenses
                                 .filter(x => filterState.collCheck && x.type === 'college' || filterState.uniCheck && x.type === 'university')
                                 .filter(x => filterState.qualificationState.some(k => k.checked && k.label === x.qualification_group_name))
                                 .filter(x => filterState.propertyTypeState.some(k => k.checked && k.label === x.university_financing_type_name))
                                 .filter(x => filterState.regionState[0] !== 'Всі регіони' ? filterState.regionState[0] === x.region_name : true)
          return(
          <div key={v.name}>
            <SpecialityTitle className="sub-title">{v.name}</SpecialityTitle>
            <div>{licensesFilter.length}</div>
            <Grid data={licensesFilter}
                  isCarousel
                  columnNum={4}
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
    </Layout>
  )
}

const GridCellWrapper = s.div`
padding: 4px;
display: flex;
height: 100%;
flex-direction: column;
justify-content: space-between;
flex: 1;
`

const LicenseWrapper = s.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
word-wrap: wrap;
`

const SpecialityTitle = s.div`
padding: 4px;
border: 1px solid #ccc;
font-size: 15px;
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
  return {
    props: {
      directionData,
      sortedDirection
    }
  }
}
