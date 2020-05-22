import { useState, useEffect, useContext } from 'react'
import s from '@emotion/styled'
import FilterContext from '../../context/filter/filterCtx'
import Layout, { siteTitle } from '../../components/layout'
import { getAllDirectionIds, getDirectionData, getSortedDataByDirections } from '../../lib/directions'
import dynamic from 'next/dynamic'
import FallbackUEL from '../../components/FallbackUEL'
import ScrollBtn from '../../components/ScrollBtn'
import SearchFilter from '../../components/SearchFilter'

const DynamicComponent = dynamic(
  () => import('../../components/UniqueEduList'),
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
  const [inputText, setInputText] = useState('');
  const [filterDisplay, setFilterDisplay] = useState([]);
  useEffect(() => setFilterState(() => JSON.parse(window.localStorage.getItem('filtersState')) || hydrateFilter()), []);
  // TODO make as helper func
  const hydrateFilter = () => {
    window.localStorage.setItem('filtersState', JSON.stringify(fillState))
    return fillState
  }

  // FIXME naming problem
  const { regionState, collCheck, uniCheck, qualificationState, propertyTypeState } = filterState;
  const isCollege = collCheck;
  const isUniversity = uniCheck;
  const qualifications = qualificationState;
  const propertyTypes = propertyTypeState;
  const region = regionState;

  console.log('unique', unique)
  useEffect(() => {
    const res = unique.filter(v => v.name.includes(inputText.trim().toLowerCase()))
                      .filter(v => isCollege && v.type === 'college' || isUniversity && v.type === 'university')
                      .filter(v => v.licenses.some(j => qualifications.some(k => k.checked && k.label === j.qualification_group_name )))
                      .filter(v => propertyTypes.some(k => k.checked && k.label === v.financingType))
                      .filter(v => region[0] !== 'Всі регіони' ? region[0] === v.region : true);
    setFilterDisplay(res)
  }, [inputText, filterState]);

  const handleChange = e => {
    setInputText(e);
  }

  //const z = inputText.length < 1 || fillState === filterState ? unique : filterDisplay;
  //
  const z = filterDisplay

  console.log('z', z)
  return (
    <Layout filter search>
        {l.map(x => <Title key={x.link}>{x.name}: {x.length}</Title>)}
        <SearchFilter cancel={setInputText}
                      value={inputText}
                      placeholder="Пошук по напрямку"
                      handleChange={handleChange} />
      <div css={{position: 'relative'}}>
        <Title>
          {`Навчальних закладiв по напрямку:`}
          <div style={{fontSize: '14px', color: '#555657', marginLeft: '4px' }}>
            <ColoredNumber l={z.length} i={unique.length}>
              {z.length}
            </ColoredNumber>
            / {`${unique.length}`}
          </div>
        </Title>
        <Title>з них спеціальностей:</Title>
        <DynamicComponent categories={l} unique={filterDisplay} filterState={filterState}/>
        <ScrollBtn />
      </div>
    </Layout>
  )
}

const ColoredNumber = s.span`
color: ${({l, i}) => l !== 0 ? (l >= 1 && l < i) ? '#fb9621' : '#555656' : 'tomato' };
padding-right: 4px;
`


const Title = s.div`
color: #787979;
margin-top: 12px;
text-transform: uppercase;
font-size: 13px;
display: flex;
justify-content: space-between;
padding: 0 12px;
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
