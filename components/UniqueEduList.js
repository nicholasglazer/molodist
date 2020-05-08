import { Icon, Grid, Badge, Card, List, WhiteSpace, Accordion } from 'antd-mobile'
import { css, jsx } from '@emotion/core'
import Router from 'next/router'

const UniqueList = (props) => {
  //console.log('props', props)
    // FIXME naming problem
    const { regionState, collCheck, uniCheck, qualificationState, propertyTypeState } = props.filterState;
    const isCollege = collCheck;
    const isUniversity = uniCheck;
    const qualifications = qualificationState;
    const propertyTypes = propertyTypeState;
    const region = regionState;
    return (
        <div>
          {
              props.unique
                  .filter(v => isCollege && v.type === 'college' || isUniversity && v.type === 'university')
                  .filter(v => v.licenses.some(j => qualifications.some(k => k.checked && k.label === j.qualification_group_name )))
                  .filter(v => propertyTypes.some(k => k.checked && k.label === v.financingType))
                  .filter(v => region[0] !== 'Всі регіони' ? region[0] === v.region : true)
                  .map((v,i) => {
                      const k = v.directions
                      //console.log('u', v)
                      return (
                          <div key={i}>
                          <div css={{wordBreak: 'break-all'}}>
                              <div>
                                <WhiteSpace size="lg" />
                                <Card full>
                                  <Card.Header
                                    style={{wordBreak: 'break-word', fontSize: '15px', color: '#ccc !important'}}
                                    title={`${v.name}`}
                                    thumb="/images/eduBuilding64.png"
                                    onClick={() => {Router.push('/universitet/[universitet]', `/universitet/${v.edrpou}`)}}
                                  />
                                  <Card.Body style={{padding: 0}}>
                                    <Accordion accordion>
                                      {
                                          props.categories.map((x,i) => {
                                              // iterate qualification state over existing qualifications, show not filtered but different colors
                                              // k[x.name] ? k[x.name].filter(n => (n === q.label))[0] ? {color: 'green'} : {color: '#ccc'} : []
                                              return k[x.name] ? (
                                                  <Accordion.Panel css={{fontSize: '13px !important'}} key={i} header={x.name.toUpperCase()}>
                                                    <List css={{color: '#ccc', fontSize: '13px'}}>
                                                      {
                                                          v.licenses.map(y => {
                                                              // TODO each item should be a link to the edu licenses || contacts
                                                              let dateExpired = new Date(y.certificate_expired)
                                                              let dateNow = Date.now()
                                                              //console.log(k[y.name], k[x.name])
                                                              return (
                                                                  qualifications.map((q,i) => (

                                                                      k[x.name] === k[y.name] && q.label === y.qualification_group_name && q.checked ? (
                                                                          <List.Item key={i}>
                                                                            {
                                                                                <span css={css`display: flex; font-size: 13px; justify-content: space-between;`}>
                                                                                  <div>
                                                                                    {q.short}
                                                                                  </div>
                                                                                  <div css={css`color: ${y.certificate_expired !== null ? dateNow >= dateExpired ? 'indianred' : 'forestgreen' : '#a9a9a9'};`}>
                                                                                    {y.certificate_expired !== null ? dateNow >= dateExpired ? <span>сертифікат <b>{y.certificate}</b> закінчився</span> : <span><b>{y.certificate}</b> дійсний до: </span> :  <span>уточнюйте дані у навчального закладу<b>{y.certificate}</b></span>} <b>{y.certificate_expired}</b>
                                                                                  </div>
                                                                                </span>
                                                                            }
                                                                          </List.Item>) : null
                                                                  ))
                                                              )})
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
                            </div>
                          </div>
                      )
                  })
          }
        </div>
    )
}
export default UniqueList
