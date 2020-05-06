import { useReducer, useState, useEffect } from 'react'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import { onlyUnique } from '../../utils/helpers'
import initialFilterState from '../../context/filter/filterData'
import { getAllDirectionIds, getDirectionData, getSortedDataByDirections } from '../../lib/directions'
import s from '@emotion/styled'
import {css} from '@emotion/core'
import { Icon, Grid, Badge, Card, List, WhiteSpace, Accordion } from 'antd-mobile'
import Router from 'next/router'

// import Slider from '../../components/slider'
//             <Slider data={licensesFilter} title={'slider component'}/>
//<AuditOutlined />
// TODO cache filter results
//
//

// const initialState = {

// }

// function reducer(state, action) {
//   switch(action.type) {
//     case 'update':

//       return {}
//       return
//   }
// }

export default function Napryamok({ sortedDirection, directionData, l, unique }) {
  //console.log('unique', unique);
  const { initialQualificationState } = initialFilterState;

  //console.log('sorted data', l)

  //useEffect(() => {setLicensesState(l.reduce((acc, cur) => cur + acc ))});


  const [filterState, setFilterState] = useState([]);
  const [licensesState, setLicensesState] = useState([]);

  const { categories } = sortedDirection.data;
  useEffect(() => setFilterState(() => {
    console.log(JSON.parse(window.localStorage.getItem('filtersState')))
    return JSON.parse(window.localStorage.getItem('filtersState'))
  }), []);
  //useEffect(() => setFilterState(JSON.parse(window.localStorage.getItem('filtersState')) || []), []);
  //const [state, setState] = useReducer(reducer, initialState);

  const { collCheck, uniCheck, qualificationState, propertyTypeState, regionState } = filterState;

  const hotpink = {
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
  //console.log('state', filterState)

  //setLicensesState(licensesFilter)
  console.log('filter stte', qualificationState)

  // const licensesFilter = v.licenses
  //                         .filter(x => collCheck && x.type === 'college' || uniCheck && x.type === 'university')
  //                         .filter(x => qualificationState.some(k => k.checked && k.label === x.qualification_group_name))
  //                         .filter(x => propertyTypeState.some(k => k.checked && k.label === x.university_financing_type_name))
  //                         .filter(x => regionState[0] !== 'Всі регіони' ? regionState[0] === x.region_name : true)
  return (
    <Layout back>
      <div>
        <Title>{`Навчальних закладiв по цьому напрямку ${unique.length}`}</Title>
        {
          unique.map(v => {
            const k = v.directions
            //const j = categories.map(x => k[x.name])
            const qState = initialQualificationState
            console.log('v', v)
            return (
              <div>
                <AllEdu>
                  <div key={v.edrpou}>
                    <WhiteSpace size="lg" />
                    <Card full>
                      <Card.Header
                        style={{wordBreak: 'break-word', fontSize: '15px', color: '#ccc !important'}}
                        title={`${v.university_name}`}
                        thumb="/images/eduBuilding64.png"
                        onClick={() => {Router.push('/universitet/[universitet]', `/universitet/${v.edrpou}`)}}
                      />
                      <Card.Body style={{padding: 0}}>
                        <Accordion accordion>
                          {
                            categories.map(x => {
                              //console.log('cat', )
                              // iterate qualification state over existing qualifications, show all but different colors

                              //console.log('.p,.', qState, )
                              return k[x.name] ?
                                (
                                  <Accordion.Panel header={x.name} >
                                    <List style={{color: '#ccc'}}>
                                      {
                                        qualificationState ? qualificationState.map(q => {
                                          console.log('imp', qualificationState)
                                          return (
                                            q.checked ? (
                                              <List.Item>
                                                {
                                                  <span style={k[x.name] ? k[x.name].filter(n => (n === q.label))[0] ? {color: 'green'} : {color: '#ccc'} : []}>
                                                    {q.label}
                                                  </span>
                                                }
                                              </List.Item>) : null
                                          )}) : null
                                      }
                                    </List>
                                  </Accordion.Panel>
                                ) : null
                            })
                          }
                        </Accordion>
                      </Card.Body>
                      <Card.Footer style={{fontSize: '13px', margin: '2px 0'}} content={'Лiцензiй по напрямкам:'} extra={<div style={{paddingRight: '4px'}}>{v.countLicenses}</div>} />
                    </Card>
                  </div>
                </AllEdu>
              </div>
            )
          })
        }
      </div>
    </Layout>
  )
}


const AllEdu = s.div`
word-break: break-all;
`

const Title = s.div`
color: #787979;
margin-top: 12px;
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
  const unique = sortedDirection.uniqueEdu
  const l = categories.map(x => x.licenses.length)
  // console.log('cat', l)

  return {
    props: {
      directionData,
      sortedDirection,
      l,
      unique
    }
  }
}

// <div>
//   {
//     categories.map(v => {
//       const eduLength = [...new Map(v.licenses.map(item => [item['university_edrpou'], item])).values()].length
//       return (
//         <div>
//           <Title>{`Навчальних закладiв по цьому напрямку ${eduLength}`}</Title>
//           <AllEdu>
//               {unique.map((x,i) => {
//               return (
//                 <div key={i}>
//                   <WhiteSpace size="lg" />
//                   <Card full>
//                     <Card.Header
//                       title="This is title"
//                       thumb="https:gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
//                       extra={<span>{x.edprou}</span>}
//                     />
//                     <Card.Body>
//                       <div>This is content of `Card`</div>
//                     </Card.Body>
//                     <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
//                   </Card>
//                 </div>
//               )
//             })}
//           </AllEdu>
//         </div>
//       )
//     })
//   }
// </div>

// <SpecialitiesWrapper>
//   <Title>{licensesState}</Title>
//   {
//     categories.map(v => {
//       const licensesFilter = v.licenses
//                               .filter(x => collCheck && x.type === 'college' || uniCheck && x.type === 'university')
//                               .filter(x => qualificationState.some(k => k.checked && k.label === x.qualification_group_name))
//                               .filter(x => propertyTypeState.some(k => k.checked && k.label === x.university_financing_type_name))
//                               .filter(x => regionState[0] !== 'Всі регіони' ? regionState[0] === x.region_name : true)
//       return(
//         <div key={v.name}>
//           <SpecialityTitle>
//             <SpecialityTitleText>{v.name.toUpperCase()}</SpecialityTitleText>
//             <SpecialityLength><Badge text={licensesFilter.length} overflowCount={500} /></SpecialityLength>
//           </SpecialityTitle>
//           <Grid data={licensesFilter}
//                 isCarousel
//                 columnNum={2}
//                 itemStyle={hotpink}
//                 carouselMaxRow={1}
//                 renderItem={dataItem => (
//                   <GridCellWrapper onClick={() => {Router.push('/universitet/[universitet]', `/universitet/${dataItem.university_edrpou}`)}}>
//                     <span>{dataItem.university_short_name}</span>
//                     <span>{dataItem.qualification_group_name}</span>
//                     <Icon type="check" size={'md'} color='#353535' />
//                   </GridCellWrapper>
//                 )}
//           />
//         </div>
//       )}
//                   )
//   }
// </SpecialitiesWrapper>
