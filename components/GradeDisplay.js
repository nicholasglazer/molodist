import { css, jsx } from '@emotion/core'
import { Popover } from 'antd-mobile'

// TODO each item should be a link to the edu licenses || contacts
//
const expiredStyle = css``;
const Grade = ({ licenses, filterState }) => {
    return (
        <div css={css`display: flex;`}>
          {
              licenses.map(y => {
                  let dateExpired = new Date(y.certificate_expired)
                  let dateNow = Date.now()
                  return (
                      filterState.qualificationState.map((q,i) => (
                          q.label === y.qualification_group_name && q.checked
                              ? (<div css={css`display:flex; order: ${q.level};padding: 8px; min-height: 80px;`} key={i}>
                                   {
                                       <div css={css`display: flex; flex-direction: column; font-size: 13px; justify-content: center; align-items: center; color: ${y.certificate_expired !== null ? dateNow >= dateExpired ? 'indianred' : 'forestgreen' : '#a9a9a9'};`}>
                                         <Popover placement="topLeft"
                                                  onSelect={i => i}
                                                  overlay={[
                                                      (<Popover.Item key="6" value="button ct">
                                                         <span css={css`color: #a2a3a2;`}>Ліцензія: </span><b>{q.label}</b>
                                                       </Popover.Item>),
                                                      (<Popover.Item key="6" value="button ct">
                                                         {
                                                             y.certificate_expired !== null
                                                                 ? dateNow >= dateExpired
                                                                 ? <div><span css={css`color: #a2a3a2;`}>Номер: </span><b>{y.certificate}</b></div>
                                                             : <div><span css={css`color: #a2a3a2;`}>Номер: </span><b>{y.certificate}</b></div>
                                                             : <div css={css`color: #a2a3a2;`}>Данi не знайдено...<b>{y.certificate}</b></div>
                                                         }
                                                       </Popover.Item>),
                                                      (<Popover.Item key="6" value="button ct">
                                                                       {
                                                                           y.certificate_expired !== null
                                                                               ? dateNow >= dateExpired
                                                                               ? <div><span css={css`color: #a2a3a2;`}>термін діі закінчився: </span><b css={css`color: ${y.certificate_expired !== null ? dateNow >= dateExpired ? 'indianred' : 'forestgreen' : '#a9a9a9'};`}>{y.certificate_expired}</b></div>
                                                                           : <div><span css={css`color: #a2a3a2;`}>дійсна до: </span><b css={css`color: ${y.certificate_expired !== null ? dateNow >= dateExpired ? 'indianred' : 'forestgreen' : '#a9a9a9'};`}>{y.certificate_expired}</b></div>
                                                                           : <div css={css`color: #a2a3a2;`}>уточнюйте данi у навчальному закладi!<b>{y.certificate}</b></div>
                                                                       }
                                                                     </Popover.Item>),
                                                  ]}
                                                  align={{
                                                      overflow: { adjustY: 0, adjustX: 0 },
                                                      offset: [-10, 0],
                                                  }}
                                         >
                                           <div css={css` font-size: 21px; font-weight: 600;`}>
                                             {q.short}
                                           </div>
                                         </Popover>
                                         <div>
                                           {
                                               [...Array(q.level)].map((_, i) =>
                                                   <svg key={i} viewBox="0 0 8 8" width="8">
                                                     <circle fill={`${q.level === 1 ? '#ce75c2' : q.level === 2 ? '#1a87b2' : q.level === 3 ? '#c278e8' : q.level === 4 ? 'orange' : '#275e72' }`} cx="4" cy="4" r="3.14"/>
                                                   </svg>
                                               )
                                           }
                                         </div>
                                       </div>
                                   }
                                 </div>) : null
                      ))
                  )})
          }
        </div>

    )
}

export default Grade
