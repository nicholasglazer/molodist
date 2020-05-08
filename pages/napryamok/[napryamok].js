import { useState, useEffect, useContext } from 'react'
import s from '@emotion/styled'
import FilterContext from '../../context/filter/filterCtx.js'
import Layout, { siteTitle } from '../../components/layout'
import { getAllDirectionIds, getDirectionData, getSortedDataByDirections } from '../../lib/directions'
//import UniqueEduList from '../../components/UniqueEduList.js'
import dynamic from 'next/dynamic'
import FallbackUEL from '../../components/FallbackUEL'
import ScrollBtn from '../../components/ScrollBtn.js'

const DynamicComponent = dynamic(
  () => import('../../components/UniqueEduList.js'),
  {
    loading: () => <FallbackUEL />,
    ssr: false
  }
)
// TODO cache filter results
export default function Napryamok({ l, unique }) {

  const init = useContext(FilterContext);
  const fillState = {
    collCheck: init.initialCollState,
    uniCheck: init.initialUniState,
    qualificationState: init.initialQualificationState,
    propertyTypeState: init.initialPropertyState,
    regionState: init.initialRegionState
  }
  const [showScroll, setShowScroll] = useState(false)
  const [filterState, setFilterState] = useState(fillState);
  useEffect(() => setFilterState(() => JSON.parse(window.localStorage.getItem('filtersState')) || hydrateFilter()), []);
  // TODO make as helper func
  const hydrateFilter = () => {
    window.localStorage.setItem('filtersState', JSON.stringify(fillState))
    return fillState
  }

  const countUnique = unique.filter(x => filterState.collCheck && x.type === 'college' || filterState.uniCheck && x.type === 'university')
                            .filter(v => v.licenses.some(j => filterState.qualificationState.some(k => k.checked && k.label === j.qualification_group_name )))
                            .filter(v => filterState.propertyTypeState.some(k => k.checked && k.label === v.financingType))
                            .filter(v => filterState.regionState[0] !== 'Всі регіони' ? filterState.regionState[0] === v.region : true).length


  return (
    <Layout back>
      <div css={{position: 'relative'}}>
        <Title>Спецiальностей:</Title>
        {l.map(x => <Title key={x.link}>{x.name}: {x.length}</Title>)}
        <Title>{`Навчальних закладiв по цьому напрямку: ${countUnique} / ${unique.length}`}</Title>
        <DynamicComponent categories={l} unique={unique} filterState={filterState}/>
        <ScrollBtn />
      </div>
    </Layout>
  )
}


const Title = s.div`
color: #787979;
margin-top: 12px;
text-transform: uppercase;
font-size: 12px;
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
  const l = categories.map(x => ({length: x.licenses.length, name: x.name, link: x.link}))

  return {
    props: {
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


// {
//   unique
//     .filter(v => isCollege && v.type === 'college' || isUniversity && v.type === 'university')
//     .filter(v => v.licenses.some(j => qualifications.some(k => k.checked && k.label === j.qualification_group_name )))
//     .filter(v => propertyTypes.some(k => k.checked && k.label === v.financingType))
//     .filter(v => region[0] !== 'Всі регіони' ? region[0] === v.region : true)
//     .map((v,i) => {
//     const k = v.directions
//       console.log('u', v)
//     return (
//       <div key={i}>
//         <AllEdu>
//           <div>
//             <WhiteSpace size="lg" />
//             <Card full>
//               <Card.Header
//                 style={{wordBreak: 'break-word', fontSize: '15px', color: '#ccc !important'}}
//                 title={`${v.name}`}
//                 thumb="/images/eduBuilding64.png"
//                 onClick={() => {Router.push('/universitet/[universitet]', `/universitet/${v.edrpou}`)}}
//               />
//               <Card.Body style={{padding: 0}}>
//                 <Accordion accordion>
//                   {
//                     l.map((x,i) => {
//                       // iterate qualification state over existing qualifications, show not filtered but different colors
//                       // k[x.name] ? k[x.name].filter(n => (n === q.label))[0] ? {color: 'green'} : {color: '#ccc'} : []
//                       return k[x.name] ? (
//                           <Accordion.Panel css={{fontSize: '13px !important'}} key={i} header={x.name.toUpperCase()}>
//                             <List css={{color: '#ccc', fontSize: '13px'}}>
//                               {
//                                 v.licenses.map(y => {
//                                   // TODO each item should be a link to the edu licenses || contacts
//                                   let dateExpired = new Date(y.certificate_expired)
//                                   let dateNow = Date.now()
//                                   console.log(k[y.name], k[x.name])
//                                   return (
//                                     qualifications.map((q,i) => (

//                                       k[x.name] === k[y.name] && q.label === y.qualification_group_name && q.checked ? (
//                                         <List.Item key={i}>
//                                           {
//                                             <span css={css`display: flex; font-size: 13px; justify-content: space-between;`}>
//                                               <div>
//                                                 {q.short}
//                                               </div>
//                                               <div css={css`color: ${y.certificate_expired !== null ? dateNow >= dateExpired ? 'indianred' : 'forestgreen' : '#a9a9a9'};`}>
//                                                 {y.certificate_expired !== null ? dateNow >= dateExpired ? <span>термін дії <b>{y.certificate}</b> закінчився</span> : <span><b>{y.certificate}</b> дійсний до: </span> :  <span>уточнюйте дані у навчального закладу<b>{y.certificate}</b></span>} <b>{y.certificate_expired}</b>
//                                               </div>
//                                             </span>
//                                           }
//                                         </List.Item>) : null
//                                     ))
//                                   )})
//                               }
//                             </List>
//                           </Accordion.Panel>
//                         ) : null
//                     })
//                   }
//                 </Accordion>
//               </Card.Body>
//               <Card.Footer style={{fontSize: '13px', margin: '2px 0'}} content={'Лiцензiй по напрямкам:'} extra={<div style={{paddingRight: '4px'}}>{v.countLicenses}</div>} />
//             </Card>
//           </div>
//         </AllEdu>
//       </div>
//     )
//   })
// }
