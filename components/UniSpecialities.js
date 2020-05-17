import { useState } from 'react'
import s from '@emotion/styled'
import { Icon, Popover, Accordion, List, WhiteSpace } from 'antd-mobile'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { GiCheckboxTree } from 'react-icons/gi'
import { RiUserStarLine } from 'react-icons/ri'
import { BsMoon, BsSun, BsArrowUpDown } from 'react-icons/bs'
import * as R from 'ramda'

// TODO make smaller components
//
const SpecialitiesTab = ({ specResults, educatorsCount }) => {
    const [studSortState, setStudSortState] = useState('studCount');
    const [toggleSortState, setToggleSortState] = useState(true);

    const Item = Popover.Item;
    const sortSpecialitiesByName = toggleSortState ? R.ascend(R.prop(studSortState)) : R.descend(R.prop(studSortState));
    const sorted = R.sort(sortSpecialitiesByName, specResults);
    return (
        <Specialities>
          <Accordion defaultActiveKey="0" className="my-accordion">
            <CompactFilter>
              <div style={{display: 'flex', alignItems: 'center'}}>
                {`Спеціальнойстей:`}
                <div style={{fontSize: '13px', color: '#555657', marginLeft: '4px' }}>
                  {specResults.length}
                </div>
              </div>
              <Popover overlayClassName="fortest"
                       overlayStyle={{ color: 'currentColor' }}
                       visible={false}
                       onSelect={(node, i) => i === 0 ? [setStudSortState('speciality_name'), setToggleSortState(!toggleSortState)] : i === 1 ? [setStudSortState('studCount'), setToggleSortState(!toggleSortState)] : [setStudSortState('hoursCount'), setToggleSortState(!toggleSortState)] }
                       overlay={[
                           (<Item key="4" value="scan" data-seed="logId">Алфавiту</Item>),
                           (<Item key="5" value="special" style={{ whiteSpace: 'nowrap' }}>Студенти</Item>),
                           (<Item key="6" value="button ct">
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
            <div style={{marginLeft: '8px'}}>Учнiв:</div>
            <CountPanel>
              <SumEducators>
                <RiUserStarLine color="#888" size="18px" />
                <CountedNumber>
                  {educatorsCount}
                </CountedNumber>
              </SumEducators>
              <SumEducators>
                        <AiOutlineFieldTime color="#888" size="18px" />
                        <CountedNumber>
                        {educatorsCount}
                        </CountedNumber>
              </SumEducators>
            </CountPanel>
            {sorted
             // .sort((a,b) => studCountState ? b.studCount - a.studCount : a.studCount - b.studCount)
             // .sort(function(a, b){
             //     if(a.speciality_name < b.speciality_name) { return -1; }
             //     if(a.speciality_name > b.speciality_name) { return 1; }
             //     return 0;
             // })
             .map(x => [
                 <AccordionHeader>
                   <SumEducators>
                    <RiUserStarLine color="#888" size="18px" />
                    <CountedNumber>
                      {x.studCount}
                    </CountedNumber>
                  </SumEducators>
                  {
                      x.hoursCount ? (
                          <SumEducators>
                            <AiOutlineFieldTime color="#888" size="18px" />
                            <CountedNumber>
                              {x.hoursCount}
                            </CountedNumber>
                          </SumEducators>
                      ) : (<div>Нема даних</div>)
                  }
                  {
                      x.isSpec
                          ? (<SumSpecializations>
                               <GiCheckboxTree color="#888" size="22px" />
                               <CountedNumber>
                                 {x.merged.filter(x => x.specialization_name !== '').length}
                               </CountedNumber>
                             </SumSpecializations>)
                          : null
                  }
                </AccordionHeader>,
                 <Accordion.Panel key={x.speciality_id} style={{margin: '3px 0 24px 0'}} header={(<div>{x.speciality_name}</div>)}>
                  {
                      !x.isSpec
                          ? x.merged.map((y, i) =>
                              <List.Item key={i}>
                                <div>
                                  {y.qualification_group_name}
                                </div>
                                <div>
                                  {y.certificate && y.certificate !== ' ' ? y.certificate : <div>'Нема даних'</div>}
                                </div>
                              </List.Item>
                          )
                          : (<Accordion>
                               {x.merged.map((k,i) =>(
                                   <Accordion.Panel key={i} header={k.specialization_name}>
                                     {k.qualification_group_name}
                                   </Accordion.Panel>
                               ))}
                             </Accordion>)}
                 </Accordion.Panel>
            ])}
          </Accordion>
        </Specialities>
    )
}

const Specialities = s.div`
`
const CompactFilter = s.div`
display: flex;
padding: 32px 16px 8px 16px;
justify-content: space-between;
color: #555656;
font-size: 13px;
`
const CountPanel = s.div`
display: flex;
margin: 16px 0;
> div {
 border: 1px solid #6bd0ff;
 border-radius: 6px;
 padding: 0 4px;
 width: 80px;
 &:first-of-type {
  margin-left: 28px;
 }
 &:last-of-type {
  margin-left: 6px;
 }
}
`
const AccordionHeader = s.div`
display: flex;
background: #fff;
`
const SumSpecializations = s.div`
align-self: flex-end;
display: flex;
align-items: center;
margin-left: auto;
color: #999;
padding-right: 12px;
div:last-of-type {
 text-transform: uppercase;
}
`
const SumEducators = s.div`
width: 70px;
display: flex;
align-items: center;
color: #777;
margin-left: 16px;
margin-right: 8px;
&:first-of-type {
 margin-left: 32px;
}
`
const CountedNumber = s.div`
margin: 0 4px;
color: #454749;
font-size: 15px;
`

export default SpecialitiesTab;

