import { useState } from 'react'
import Layout, { siteTitle } from '../../components/layout'
import { getAllUniversityIds, getUniversityData } from '../../lib/universities'
import s from '@emotion/styled'
import { Icon, Popover, Accordion, List, Tabs, WhiteSpace } from 'antd-mobile'
import { FiMail, FiPhone, FiExternalLink } from 'react-icons/fi'
import { FaSearchLocation, FaUniversity, FaUserTie } from 'react-icons/fa'
import { AiOutlineClockCircle, AiOutlineFieldTime } from 'react-icons/ai'
import { MdHttp, MdBusiness, MdLocationCity, MdHourglassEmpty, MdLaptopMac, MdTimelapse } from 'react-icons/md'
import { GiMailbox, GiPathDistance, GiCheckboxTree } from 'react-icons/gi'
import { RiGroup2Line, RiUserStarLine } from 'react-icons/ri'
import { BsThreeDotsVertical, BsMoon, BsSun, BsArrowUpDown } from 'react-icons/bs'
import Router from 'next/router'


export default function Universitet({ universityData: {data, sortedSpec, specResults}, educatorsCount }) {

  // console.log('usiv', data.educators.filter(x => x.speciality_code === '014'))
  // console.log('usiv', data.speciality_licenses.filter(x => x.speciality_code === '014'))
  console.log('speccc', specResults)
  const tabs = [
    { title: "Про заклaд" },
    { title: "Спеціальності" },
    { title: "Факультети" },
    { title: "Події" },
    { title: "Філіали" },
    { title: "Ком'юніті" },
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
          educators,
          licenses,
          branches
        } = data;

  const goBack = () => Router.back();
  const about = tab => {
    return (
        <AboutTab>
          <div>
            <IconWrapper>
              <FaUniversity color="#888" size="22px"/>
            </IconWrapper>
            <AboutItem>{university_name_en}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <MdHourglassEmpty color="#888" size="22px"/>
            </IconWrapper>
            <AboutItem>{registration_year} рiк</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <MdLocationCity color="#888" size="23px"/>
            </IconWrapper>
            <AboutItem>{koatuu_name}</AboutItem>
          </div>
          <div onClick={handleMapTransferClick}>
            <IconWrapper>
              <GiPathDistance color="#888" size="22px"/>
            </IconWrapper>
            <AboutItem css={{color: tabBarColor}}>
              {university_address}
            </AboutItem>
          </div>
          <div>
            <IconWrapper>
              <GiMailbox color="#888" size="24px"/>
            </IconWrapper>
            <AboutItem>{post_index}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <FiMail color="#888" size="19px"/>
            </IconWrapper>
            <AboutItem>
              {
                university_email.match(',')
                  ? university_email.split(',').map(x => <a href={`mailto:${x}`}>{x}</a>)
                  : (<a href={`mailto:${university_email}`}>{university_email}</a>)
              }
            </AboutItem>
          </div>
          <div>
            <IconWrapper>
              <FiPhone color="#888" size="19px"/>
            </IconWrapper>
            <AboutItem>{university_phone}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <MdHttp color="#888" size="26px"/>
            </IconWrapper>
            <AboutItem>
              <a href={`${university_site}`} target='_blank'>
                {university_site.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]}
              </a>
            </AboutItem>
          </div>
          <div>
            <IconWrapper>
              <FaUserTie color="#888" size="18px"/>
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
    )
  }
  const [tabState, setTabState] = useState(1);
  const [toggleStudents, setToggleStudents] = useState(false);


  // FIXME global variables color management
  const tabBarColor = '#0070f3'
  const handleMapTransferClick = (e) => {
    // DEPRECATED open last tab with map
    //setTabState(tabs.length - 1)
    const url = `https://www.google.com/maps/search/?api=1&query=${koatuu_name}+${post_index}+${university_address}`
    window.open(url, '_blank');
  }
  // console.log('educators', educators[0])
  // console.log('licensese', speciality_licenses[0])

  const myImg = src => <img src={`https:gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
  const Item = Popover.Item;
  return (
    <Layout uni>
      <Head>
        <UniHeader>
          <Icon onClick={goBack} type="left" size="lg"/>
          <Popover mask
                   overlayClassName="fortest"
                   overlayStyle={{ color: 'currentColor' }}
                   visible={false}
                   overlay={[
                     (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Відсканувати</Item>),
                     (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>QR Код</Item>),
                     (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                        <span style={{ marginRight: 5 }}>Допомога</span>
                      </Item>),
                   ]}
                   align={{
                     overflow: { adjustY: 0, adjustX: 0 },
                     offset: [-10, 0],
                   }}
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <BsThreeDotsVertical size="20"/>
            </div>
          </Popover>
        </UniHeader>
        <HeadImg style={{marginLeft: '12px'}} src="/images/eduBuilding64.png"/>
        <div style={{textAlign: 'right', fontSize: '17px', color: '#888', fontWeight: '500'}}>{university_short_name}</div>
        <Title isTrue={true}>
          {university_name}
        </Title>
      </Head>
      <WhiteSpace/>
      <Tabs
        prerenderingSiblingsNumber={0}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} activeTab={tabState} page={3}/>}
        tabs={tabs}
        page={tabState}
        swipeable={false}
        tabBarActiveTextColor={tabBarColor}
        onTabClick={(tab, index) => setTabState(index)}
      >
        {about}
        <Specialities>
          <Accordion defaultActiveKey="0" className="my-accordion">
            <CompactFilter>
              <div style={{display: 'flex', alignItems: 'center'}}>
                {`Спеціальнойстей показано:`}
                <div style={{fontSize: '13px', color: '#555657', marginLeft: '4px' }}>
                  {specResults.length}
                </div>
              </div>
              <Popover overlayClassName="fortest"
                       overlayStyle={{ color: 'currentColor' }}
                       visible={false}
                       overlay={[
                         (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Алфавiту</Item>),
                         (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>Студенти</Item>),
                         (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                            <span style={{ marginRight: 5 }}>Часи</span>
                          </Item>),
                       ]}
                       align={{
                         overflow: { adjustY: 0, adjustX: 0 },
                         offset: [-10, 0],
                       }}
              >
                <div style={{
                  height: '100%',
                  padding: '0 15px',
                  marginRight: '-15px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                >
                  <BsArrowUpDown color="#888" size="18px" />
                </div>
              </Popover>
            </CompactFilter>
            {/* NOTE possible ad feature */}
            {/* <Accordion.Panel style={{margin: '12px 0'}} header="ad Реклама вашого унiверситету" className="pad"> */}
            {/*   Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue! */}
            {/* </Accordion.Panel> */}
            {specResults.map(x => [
              <AccordionHeader>
                <SumEducators>
                  <RiUserStarLine color="#888" size="18px" />
                  <CountedNumber>
                    {x.studCount}
                  </CountedNumber>
                </SumEducators>
                <SumEducators>
                  <AiOutlineFieldTime color="#888" size="18px" />
                  <CountedNumber>
                    {x.hoursCount}
                  </CountedNumber>
                </SumEducators>

                {
                  x.isSpec
                    ? <SumSpecializations>
               <GiCheckboxTree color="#888" size="22px" />
               <CountedNumber>
                 {x.merged.filter(x => x.specialization_name !== '').length}
               </CountedNumber>
             </SumSpecializations>
                  : null
                }
              </AccordionHeader>,
              <Accordion.Panel key={x.speciality_id} style={{margin: '4px 0'}} header={(<div>{x.speciality_name}</div>)}>
                {
                  !x.isSpec
                    ? x.merged.map(y =>
                      <List.Item>
                        <div>
                          {y.qualification_group_name}
                        </div>
                        <div>
                          {y.certificate && y.certificate !== ' ' ? y.certificate : <div>'Нема даних'</div>}
                        </div>
                      </List.Item>
                    )
                    : (<Accordion>
                           {x.merged.map(k =>(
                             <Accordion.Panel header={k.specialization_name}>
                               {k.qualification_group_name}
                             </Accordion.Panel>
                           ))}
                         </Accordion>
                      )}
              </Accordion.Panel>
            ])}
            <Accordion.Panel header="Title 2" className="pad">this is panel content2 or other</Accordion.Panel>
          </Accordion>
        </Specialities>
        <List>
          {facultets.map(x => <List.Item>{x}</List.Item> )}
        </List>
        <Events>
          Наразі немає створених подій
        </Events>
        <Branches>
          {
            branches.map(x => <div>
                               <div>
                                 {x.koatuu_name}
                               </div>
                               <div>
                                 {x.region_name !== 'КИЇВ' ? x.region_name : null}
                               </div>
                               <div>
                                 {x.university_name}
                               </div>
                             </div>)
          }
        </Branches>
        <Licenses>
          {speciality_licenses.map(x => <div>{x.speciality_name}</div>)}
        </Licenses>
      </Tabs>
    </Layout>
  )
}

const IconWrapper = s.div`
margin-right: 4px;
display: flex;
justify-content: center;
align-items: center;
min-width: 40px;
height: 30px;
flex: 0;
svg {
}
`
const Events = s.div`
min-height: 40vh;
display: flex;
justify-content: center;
align-items: center;
color: #888;
`
const Branches = s.div`
padding: 32px 4px;
min-height: 40vh;
> div {
border-left: 4px solid #fb9621;
padding-left: 16px;
margin-bottom: 16px;
}
`
const AccordionHeader = s.div`
display: flex;

`
const SumSpecializations = s.div`
align-self: flex-end;
display: flex;
align-items: center;
margin-left: auto;
color: #999;
padding-right: 12px;
div:first-of-type {
}
div:last-of-type {
text-transform: uppercase;
}
`
const CompactFilter = s.div`
display: flex;
padding: 32px 16px 32px 8px;
justify-content: space-between;
color: #555656;
font-size: 13px;
`
const SumEducators = s.div`
width: 60px;
display: flex;
align-items: center;
color: #777;
margin-left: 8px;
margin-right: 8px;
`
const CountedNumber = s.div`
margin: 0 4px;
color: #454749;
font-size: 15px;
`
const Licenses = s.div`
display: flex;
flex-direction: column;
`

const Specialities = s.div`

`
// REVIEW DRY
const Educators = s.div`
display: flex;
justify-content: space-between;
margin-bottom: 12px;
flex-wrap: wrap;
> div {
padding-left: 4px;
}
}
`
const EducatorsHead = s.div`
display: flex;
> h3 {
flex: 0 100%;
background: white;
}
`
const Wrapper = s.div`
 display: flex;
 border-left: 4px solid #9cda20;
 flex-direction: column;
 margin-bottom: 16px;
 text-transform: uppercase;
 color: #454647;
`
const LeftSideWrapper = s.div`
 color: #888;
 flex: 0;
 display: flex;
 padding-bottom: 4px;
 > div {
 display: flex;
 flex-direction: row;
 align-items: center;
> div {
margin-left: 4px;
font-size: 15px;
}
padding-left: 10px;
 }
`
const RightSideWrapper = s.div`
 flex: 1;
 align-items: center;
 flex-wrap: wrap;
 justify-content: flex-start;
 display: flex;
 padding-left: 12px;
> div:first-of-type {
color: green;
}
`

const AboutItem = s.div`
flex: 1;
`

const AboutTab = s.div`
padding: 32px 4px 16px 4px;
background: #fff;
display: flex;
flex-direction: column;
> div {
display: flex;
justify-content: flex-end;
align-items: center;
}
`
const Head = s.div`
padding: 20px 8px 30px 8px;
background: #fff;
border-bottom: 1px solid #ddd;
display: flex;
flex-direction: column;
`
const HeadImg = s.img`
margin-left: 12px;
align-self: center;
> div:first-of-type::before {
content: '';
display: block;
height: 96px;
width: 96px;
background: #f5f5f9;
border-radius: 50%;
}
`
const Title = s.div`
margin-top: 16px;
padding: 0;
font-size: ${props => props.isTrue ? '19px' : '28px'};
text-align: right;
`
const UniHeader = s.div`
position: absolute;
display: flex;
padding-right: 12px;
padding-left: 4px;
justify-content: space-between;
align-items: center;
width: 100%;
height: 56px;
top: 0;
left: 0;
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

  //       <Educators>
  //         <EducatorsHead>
  //           <div>
  //             <h3>
  //               E
  //             </h3>
  //           </div>
  //           <div>
  //             <h3 onClick={() => setToggleStudents(!toggleStudents)}>
  //               Всi учнi
  //             </h3>
  //             <div>
  //               {educatorsCount}
  //             </div>
  //           </div>
  //         </EducatorsHead>
  //         <div>
  //           {
  //             educators.map(x => (
  //               <Wrapper>
  //                 <RightSideWrapper>
  //                   <div>{x.speciality_name}</div>
  //                   <div>{x.specialization_name}</div>
  //                 </RightSideWrapper>
  //                 <LeftSideWrapper>
  //                   <SumEducators>
  //                     <RiUserStarLine color="#888" size="18px" />
  //                     <div>
  //                       {parseInt(x.distance_count) + parseInt(x.external_count) + parseInt(x.evening_count) + parseInt(x.part_time_count) + parseInt(x.full_time_count)}
  //                     </div>
  //                   </SumEducators>
  //                   {
  //                     toggleStudents
  //                       ? null
  //                       : (<>
  //                                                                                                                     {
  //                                                                                                                       parseInt(x.full_time_count) !== 0 ?
  //                                                                                                                         (<div>
  //                          <BsSun />
  //                          <div>
  //                            {x.full_time_count}
  //                          </div>
  //                        </div>) : null
  //                                                                                                                     }
  //                                                                                                                     {
  //                                                                                                                       parseInt(x.part_time_count) !== 0 ?
  //                                                                                                                         (<div>
  //                                                                            <MdTimelapse />
  //                                                                            <div>
  //                                                                              {x.part_time_count}
  //                                                                            </div>
  //                                                                          </div>) : null
  //                                                                                                                     }
  //                                                                                                                     {
  //                                                                                                                       parseInt(x.distance_count) !== 0 ?
  //                                                                                                                         (<div>
  //   <MdLaptopMac />
  //   <div>
  //     {parseInt(x.distance_count) + parseInt(x.external_count)}
  //   </div>
  // </div>) : null
  //                                                                                                                     }
  //                                                                                                                     {
  //                                                                                                                       parseInt(x.evening_count) !== 0 ?
  //                                                                                                                         (<div>
  //                                                         <BsMoon/>
  //                                                         <div>
  //                                                           {x.evening_count}
  //                                                         </div>
  //                                                       </div>) : null
  //                                                                                                                     }
  //                                                                                                                   </>)
  //                   }
  //                 </LeftSideWrapper>
  //               </Wrapper>
  //             ))
  //           }
  //         </div>
  //       </Educators>
