import { List } from 'antd-mobile'

const FacultiesTab = ({ facultets }) => (facultets ? <List>{facultets.map((x,i) => <List.Item key={i}>{x}</List.Item> )} </List> : <div>Без факультетiв</div>);

export default FacultiesTab;
