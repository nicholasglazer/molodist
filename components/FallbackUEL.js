import { Icon, Grid, Badge, Card, List, WhiteSpace, Accordion } from 'antd-mobile'
import { css, jsx, keyframes } from '@emotion/core'

const FallbackUEL = () => {
    const mock = [0,1,2,3,4,5,6,7,8,9,10]
    return (<div>
              {mock.map(v => (<div key={v}>
                                <WhiteSpace size="lg" />
                                <Card full>
                                  <Card.Header
                                    title={
                                        <span>
                                          <span css={stylePattern}>Lorem mollis aliquam ut porttitor </span>
                                          <span css={stylePattern}>leo a diam sollicitudin! Why?</span>
                                        </span>
                                    }
                                    thumb="/images/eduBuilding64.png"
                                  />
                                  <Card.Body css={{padding: 0}}>
                                    <Accordion accordion>
                                      <Accordion.Panel header={
                                          <span css={stylePattern}>
                                            {`Scientia potentia est.`.toUpperCase()}
                                          </span>
                                      }>
                                        <List css={stylePattern}>
                                          <List.Item>
                                          </List.Item>
                                        </List>
                                      </Accordion.Panel>
                                    </Accordion>
                                  </Card.Body>
                                  <Card.Footer
                                    css={{fontSize: '13px', margin: '2px 0'}}
                                    content={'Лiцензiй по напрямкам:'}
                                    extra={
                                        <div css={{paddingRight: '4px'}}>
                                          <span css={stylePattern}>
                                            {`10`}
                                          </span>
                                        </div>
                                    } />
                                </Card>
                              </div>))}
            </div>)
}

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
animation: ${gradient} 6s ease-in-out infinite;
background: linear-gradient(-60deg, #e4e5e7, #ddd, #f0f0f1, #ddd);
color: transparent;
background-size: 300%;
`


export default FallbackUEL
