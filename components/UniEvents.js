import s from '@emotion/styled'

const EventsTab = () => (<Events> Наразі немає створених подій </Events>);

const Events = s.div`
min-height: 40vh;
display: flex;
justify-content: center;
align-items: center;
color: #888;
`
export default EventsTab;
