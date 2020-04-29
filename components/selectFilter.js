import React from "react"
import { Picker, List, WhiteSpace } from 'antd-mobile'

const Regions = props => {
  const { setRegion, current, title } = props

// TODO make as json data
  const regions = [
    {
        label: 'Всі регіони',
        value: 'Всі регіони'
    },
      {
        label: 'КИЇВ',
        value: 'КИЇВ'
      },
      {
        label: 'Вінницька область',
        value: 'Вінницька область'
      },
      {
        label: 'Волинська область',
        value: 'Волинська область'
      },
      {
        label: 'Дніпропетровська область',
        value: 'Дніпропетровська область'
      },
      {
        label: 'Донецька область',
        value: 'Донецька область'
      },
      {
        label: 'Житомирська область',
        value: 'Житомирська область'
      },
      {
        label: 'Закарпатська область',
        value: 'Закарпатська область'
      },
      {
        label: 'Запорізька область',
        value: 'Запорізька область'
      },
      {
        label: 'Івано-Франківська область',
        value: 'Івано-Франківська область'
      },
      {
        label: 'Київська область',
        value: 'Київська область'
      },
      {
        label: 'Кіровоградська область',
        value: 'Кіровоградська область'
      },
      {
        label: 'Луганська область',
        value: 'Луганська область'
      },
      {
        label: 'Львівська область',
        value: 'Львівська область'
      },
      {
        label: 'Миколаївська область',
        value: 'Миколаївська область'
      },
      {
        label: 'Одеська область',
        value: 'Одеська область'
      },
      {
        label: 'Полтавська область',
        value: 'Полтавська область'
      },
      {
        label: 'Рівненська область',
        value: 'Рівненська область'
      },
      {
        label: 'Сумська область',
        value: 'Сумська область'
      },
      {
        label: 'Тернопільська область',
        value: 'Тернопільська область'
      },
      {
        label: 'Харківська область',
        value: 'Харківська область'
      },
      {
        label: 'Херсонська область',
        value: 'Херсонська область'
      },
      {
        label: 'Хмельницька область',
        value: 'Хмельницька область'
      },
      {
        label: 'Черкаська область',
        value: 'Черкаська область'
      },
      {
        label: 'Чернівецька область',
        value: 'Чернівецька область'
      },
      {
        label: 'Чернігівська область',
        value: 'Чернігівська область'
      }
  ]

  return (
    <List renderHeader={() => title}>
      <Picker
        data={regions}
        okText="Ок"
        cols={1}
        dismissText="Вийти"
        onChange={v => setRegion(v)}
        className="forss"
        value={current}
        extra={`${current.value}`}
      >
          <List.Item arrow="horizontal">Регiон</List.Item>
        </Picker>
    </List>
  )
}

export default Regions

          //<Select value={selectedRegion} onChange={handleChange}>
           // {regions.map((x, i) => <option key={i} >{x}</option>)}
          //</Select>
