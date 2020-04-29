import React from 'react'
import { List, Checkbox, Flex } from 'antd-mobile';

const CheckboxItem = Checkbox.CheckboxItem;

const CheckboxTypeFilter = props => {
  const { current, setMultipleCheck, title } = props;
  return (
      <List renderHeader={() => title}>
        { current ? current.map(i => (
          <CheckboxItem
            key={i.value}
            checked={i.checked}
            defaultChecked
            onChange={() =>
              setMultipleCheck(current.map(x => x === i ? {...x, checked: !x.checked} : x))}
          >
            {i.label}
          </CheckboxItem>
        )) : null }
      </List>
  );
};

export default CheckboxTypeFilter




/* style={{width: '100%', justifyContent: 'space-around'}} */


    // <div className="">
    //   {selectedType.map(({name, checked},i) => {
    //      return (
    //        <label key={i} className="panel-block">
    //          <input type="checkbox" checked={checked} onChange={handleType} value={name} />
    //          {name}
    //        </label>
    //      )
    //   })}
    // </div>
  // const handleType = ({target}) => {
  //   const data = []
  //   // TODO decision: make ternary and change to reduce?
  //   selectedType.map(({name, checked},i) => {

  //     if (target.checked) {
  //       if (name === target.value) {
  //         data.push({name, checked: true})
  //       } else {
  //         data.push({name, checked})
  //       }
  //     } else {
  //       if (name === target.value) {
  //         data.push({name, checked: false})
  //       } else {
  //         data.push({name, checked})
  //       }
  //     }
  //   })
  //   setType(data)
  // }
