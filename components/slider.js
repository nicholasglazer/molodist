import React from 'react'
import s from '@emotion/styled'

const initialData {

}
const Slider = (props) => {
    console.log('props', props)
    return (
        <div>
          <div>{props.title}</div>
          <div>{`0/${props.data.length}`}</div>
          <div>
            <ItemsWrapper length={props.data.length}>
              {
                  props.data.map(v => (
                      (<div></div>)
                  ))
              }
            </ItemsWrapper>
          </div>
        </div>
    )
}
const ItemsWrapper = s.div`
width: ${props => props.length * props.length}px;
transform: translate3d(${props => props.length * (props.length/2)}px,0px,0px);
`

export default Slider
