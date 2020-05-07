import { Icon, Grid, Badge, Card, List, WhiteSpace, Accordion } from 'antd-mobile'
import { css, jsx } from '@emotion/core'

const FallbackUEL = () => {
    const mock = [0,1,2,3,4,5,6,7,8,9,10]
    return (<div>
              {mock.map(v => (<div key={v}>
                                 <div>
                                   <div>
                                     <WhiteSpace size="lg" />
                                     <Card full>
                                       <Card.Header
                                         style={{wordBreak: 'break-word', fontSize: '15px', color: '#ccc !important'}}
                                         title={``}
                                         thumb="/images/eduBuilding64.png"
                                       />
                                       <Card.Body style={{padding: 0}}>
                                         <Accordion accordion>
                                           <Accordion.Panel css={{fontSize: '13px !important'}}>
                                             <List css={{color: '#ccc', fontSize: '13px'}}>
                                               <List.Item>
                                                 <span css={css`display: flex; font-size: 13px; justify-content: space-between;`}>
                                                 </span>
                                               </List.Item>
                                             </List>
                                           </Accordion.Panel>
                                         </Accordion>
                                       </Card.Body>
                                       <Card.Footer css={{fontSize: '13px', margin: '2px 0'}} content={'Лiцензiй по напрямкам:'} extra={<div css={{paddingRight: '4px'}}></div>} />
                                     </Card>
                                   </div>
                                 </div>
                               </div>))}
            </div>)
}
export default FallbackUEL
