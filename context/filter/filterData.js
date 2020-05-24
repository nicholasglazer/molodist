const filterData = {
    initialQualificationState: [
        {
            value: 0,
            checked: true,
            level: 5,
            short: 'Д',
            label: 'Доктор філософії'
        },
        {
            value: 1,
            checked: true,
            level: 4,
            short: 'М',
            label: 'Магістр'
        },
        {
            value: 2,
            checked: true,
            level: 3,
            short: 'Б',
            label: 'Бакалавр'
        },
        {
            value: 3,
            checked: true,
            level: 2,
            short: 'С',
            label: 'Спеціаліст'
        },
        {
            value: 4,
            checked: true,
            level: 1,
            short: 'М',
            label: 'Молодший спеціаліст'
        }
    ],
    initialPropertyState: [
        {
            value: 0,
            checked: true,
            label: 'Державна'
        },
        {
            value: 1,
            checked: true,
            label: 'Приватна'
        },
        {
            value: 2,
            checked: true,
            label: 'Комунальна'
        }
    ],

    initialRegionState: ["Всі регіони"],
    initialUniState: true,
    initialCollState: true
}

export default filterData
