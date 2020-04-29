import React from "react"
import s from '@emotion/styled'

const DirectionQualification = props => {
  const { setQualification, selected } = props
  const qualifications = [
    'Усі',
    'Доктор філософії',
    'Магістр',
    'Бакалавр',
    'Молодший спеціаліст'
  ]
  return (
    <div >
        {qualifications.map((x, i) => (
          <a className={selected === x ? 'is-active' : ''} key={i} onClick={() => setQualification(x)}>
              {x}
          </a>
        ))}
      </div>
  )
}
const QWrapper = s.div`
max-width: 400px;
min-width: 400px;
font-size: .85rem;
`

export default DirectionQualification
