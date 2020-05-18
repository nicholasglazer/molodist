import s from '@emotion/styled'
import { css, jsx, keyframes } from '@emotion/core'
import { Icon, Popover, Accordion, List, WhiteSpace } from 'antd-mobile'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { GiCheckboxTree } from 'react-icons/gi'
import { RiUserStarLine } from 'react-icons/ri'
import { BsHash, BsArrowUpDown } from 'react-icons/bs'

const mock = [0,1,2,3,4,5,6,7,8,9,10]

const SpecialitiesFallback = () => {
    const Item = Popover.Item;
    return (
        <Specialities>
          <Accordion defaultActiveKey="0" className="my-accordion">
            <CompactFilter>
              <CountPanel>
                <SumEducators>
                  <RiUserStarLine color="#888" size="18px" />
                  <CountedNumber css={stylePattern}>
                    9000
                  </CountedNumber>
                </SumEducators>
                <SumEducators>
                  <AiOutlineFieldTime color="#888" size="18px" />
                  <CountedNumber css={stylePattern}>
                    9000
                  </CountedNumber>
                </SumEducators>
              </CountPanel>
              <BsArrowUpDown color="#888" size="18px" />
            </CompactFilter>

            <SpecialitiesCount style={{display: 'flex', alignItems: 'center'}}>
              <div>
                {`Спеціальностей:`}
              </div>
              <div style={{fontSize: '13px', marginLeft: '4px' }} css={stylePattern}>
                42/42
              </div>
            </SpecialitiesCount>
            {mock
             .map(x => [
                 <AccordionHeader>
                   <SumEducators>
                     <RiUserStarLine color="#888" size="18px" />
                     <CountedNumber css={stylePattern}>
                       100
                     </CountedNumber>
                   </SumEducators>
                   <SumEducators>
                     <AiOutlineFieldTime color="#888" size="18px" />
                     <CountedNumber css={stylePattern}>
                       100
                     </CountedNumber>
                   </SumEducators>
                   <SumEducators>
                     <BsHash />
                     <CodeNumber css={stylePattern}>
                       4.2000042
                     </CodeNumber>
                   </SumEducators>
                 </AccordionHeader>,
                 <Accordion.Panel style={{margin: '3px 0 24px 0'}} header={<div><span css={stylePattern}>Non sodales neque sodales ut etiam sit amet nisl.</span></div>}>
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
`
const SpecialitiesCount = s.div`
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
`
const CodeNumber = s.div`
margin: 0 4px;
color: #555759;
`


const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
`
const stylePattern = css`
animation: ${gradient} 5s ease-in-out infinite;
background: linear-gradient(-60deg, #e4e5e7, #ddd, #f0f0f1, #ddd);
color: transparent;
background-size: 300%;
`
export default SpecialitiesFallback;
