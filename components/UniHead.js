import s from '@emotion/styled'
import Router from 'next/router'

const UniHead = ({shortName, name}) => (
    <Head>
      <HeadImg style={{marginLeft: '12px'}} src="/images/eduBuilding64.png"/>
      <div style={{textAlign: 'right', fontSize: '17px', color: '#888', fontWeight: '500'}}>{shortName}</div>
      <Title isTrue={true}>
        {name}
      </Title>
    </Head>
);

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
min-width: 99%;
height: 56px;
top: 0;
left: 0;
`

export default UniHead;
