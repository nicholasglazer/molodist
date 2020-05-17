import s from '@emotion/styled'
import { Icon, Popover } from 'antd-mobile'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Router from 'next/router'


const myImg = src => <img src={`https:gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
const Item = Popover.Item;

const goBack = () => Router.back();

const UniHead = ({shortName, name}) => (
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
                      </Item>
                     ),
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
