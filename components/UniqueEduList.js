import { Icon, Grid, Badge, Card, List, WhiteSpace, Accordion } from 'antd-mobile'
import { css, jsx } from '@emotion/core'
import Router from 'next/router'
import GradeDisplay from 'components/GradeDisplay'

// TODO uniqueedulist refactor
const UniqueList = ({unique, filterState}) => (
  <div>
    {
      unique
        .map((v,i) => {
          console.log('v*&&^&', v)
          const k = v.directions
          return (
            <div key={i}>
              <div css={{wordBreak: 'break-all', boxShadow: '0px 4px 4px rgba(120, 120, 120, .115)'}}>

                <div>
                  <WhiteSpace size="lg" />
                  <Card full>
                    <Card.Header
                      style={{wordBreak: 'break-word', fontSize: '15px', color: '#ccc !important'}}
                      title={`${v.name}`}
                      thumb="/images/eduBuilding64.png"
                      onClick={() => {Router.push('/universitet/[universitet]', `/universitet/${v.edrpou}`)}}
                    />
                    <Card.Body style={{padding: 18, overflow: 'auto'}}>
                      <GradeDisplay licenses={v.licenses} filterState={filterState} />
                    </Card.Body>
                    <Card.Footer style={{fontSize: '13px', margin: '2px 0'}} content={'Лiцензiй по напрямкам:'} extra={<div style={{paddingRight: '4px'}}>{v.countLicenses}</div>} />
                  </Card>
                </div>
              </div>
            </div>
          )
        })
    }
  </div>
)
export default UniqueList

                        // <Accordion accordion>
                        // </Accordion>
                        // {
                        //   categories ? categories.map((x,i) => {
                        //     // iterate qualification state over existing qualifications, show not filtered but different colors
                        //     // k[x.name] ? k[x.name].filter(n => (n === q.label))[0] ? {color: 'green'} : {color: '#ccc'} : []
                        //     return k[x.name] ? (
                        //       <Accordion.Panel css={{fontSize: '13px !important'}} key={i} header={x.name.toUpperCase()}>
                        //         <List css={{color: '#ccc', fontSize: '13px'}}>
                        //         </List>
                        //       </Accordion.Panel>
                        //     ) : null
                        //   }) : null
                        // }
