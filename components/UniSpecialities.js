import { useState } from 'react'
import s from '@emotion/styled'
import { Icon, Popover, Accordion, List, WhiteSpace } from 'antd-mobile'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { GiCheckboxTree } from 'react-icons/gi'
import { RiUserStarLine } from 'react-icons/ri'
import { BsHash, BsMoon, BsSun, BsArrowUpDown } from 'react-icons/bs'
import * as R from 'ramda'
import SearchFilter from './SearchFilter'

// TODO make smaller components
//
const SpecialitiesTab = ({ specResults, educatorsCount, hoursCount }) => {
    const [studSortState, setStudSortState] = useState('studCount');
    const [toggleSortState, setToggleSortState] = useState(false);

    const Item = Popover.Item;
    // how to return rest
    // const z = R.forEach(
    //     R.compose(R.toUpper(), R.prop('speciality_name'))
    // )
    //TODO make with ramda
    specResults.map(x => ({...x, speciality_name: x.speciality_name.toUpperCase()}))

    const sortSpecialitiesByName = toggleSortState ? R.ascend(R.prop(studSortState)) : R.descend(R.prop(studSortState));
    const sorted = R.sort(sortSpecialitiesByName, specResults);

    // TODO DRY: make reusable component
    const [word, setWord] = useState('');
    const [filterDisplay, setFilterDisplay] = useState(sorted);

    const handleChange = e => {
        let oldList = sorted.map(x => ({ ...x, speciality_name: x.speciality_name.toLowerCase() }));
        if (e !== "") {
            let newList = [];
            setWord(e);
            console.log('word', word.length)
            newList = oldList.filter(x => x.speciality_name.includes(word.toLowerCase()));
            setFilterDisplay(newList);
        } else {
            setFilterDisplay(sorted);
        }
    }
    //console.log('filetr, display', word)
    return (
        <Specialities>
          <Accordion defaultActiveKey="0" className="my-accordion">
            <SearchFilter cancel={setWord}
                          value={word}
                          placeholder="Пошук спецiальностi"
                          handleChange={handleChange} />
            <CompactFilter>
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
                    {hoursCount}
                  </CountedNumber>
                </SumEducators>
              </CountPanel>
              <Popover overlayClassName="fortest"
                       overlayStyle={{ color: 'currentColor' }}
                       visible={false}
                       onSelect={(node, i) => [setStudSortState(node.props.value), setToggleSortState(!toggleSortState)] }
                       overlay={[
                           (<Item key="4" value="speciality_name" data-seed="logId">Алфавiт</Item>),
                           (<Item key="5" value="studCount" style={{ whiteSpace: 'nowrap' }}>Студенти</Item>),
                           (<Item key="6" value="hoursCount"><span style={{ marginRight: 5 }}>Часи</span></Item>),
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
            <SpecialitiesCount style={{display: 'flex', alignItems: 'center'}}>
              <div>
                {`Спеціальностей:`}
              </div>
              <div style={{fontSize: '13px', color: '#555657', marginLeft: '4px' }}>
                {`${specResults.length}/${specResults.length}`}
              </div>
            </SpecialitiesCount>
            {filterDisplay
             .map(x => [
                 <AccordionHeader>
                   <SumEducators>
                     <RiUserStarLine color="#888" size="18px" />
                     <CountedNumber>
                       {x.studCount}
                     </CountedNumber>
                   </SumEducators>
                   {
                       <SumEducators>
                         <AiOutlineFieldTime color="#888" size="18px" />
                         <CountedNumber>
                           {x.hoursCount}
                         </CountedNumber>
                       </SumEducators>
                   }
                   {
                       x.isSpec
                           ? (<SumEducators>
                    <GiCheckboxTree color="#888" size="22px" />
                    <CountedNumber>
                      {x.merged.filter(x => x.specialization_name !== '').length}
                    </CountedNumber>
                  </SumEducators>)
                           : <SumEducators/>
                   }
                   <SumEducators>
                     <BsHash />
                     <CodeNumber>
                       {x.speciality_code}
                     </CodeNumber>
                   </SumEducators>
                 </AccordionHeader>,
                 <Accordion.Panel key={x.speciality_id} style={{margin: '3px 0 24px 0'}} header={x.speciality_name.toUpperCase()}>
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
                                          <Accordion.Panel key={i} header={k.specialization_name.toUpperCase()}>
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
padding: 24px 16px 8px 16px;
justify-content: space-between;
align-items: center;
color: #555656;
font-size: 13px;
`
const SpecialitiesCount = s.div`
font-size: 13px;
color: #777;
margin: 12px 16px;
display: flex;
justify-content: space-between;
`

const CountPanel = s.div`
display: flex;
> div {
 border: 1px solid #c278e8;
 border-radius: 6px;
 padding: 0 4px;
 width: 80px;
 &:last-of-type {
  margin-left: 28px;
 }
}
`
const AccordionHeader = s.div`
padding: 2px 0;
display: flex;
background: #fff;
> div {
 flex: 1;
}
`

const SumEducators = s.div`
display: flex;
align-items: center;
color: #777;
justify-content: center;
`
const CountedNumber = s.div`
margin: 0 4px;
color: #454749;
font-size: 15px;
`
const CodeNumber = s.div`
margin: 0 4px;
color: #555759;
font-size: 14px;
`

export default SpecialitiesTab;
