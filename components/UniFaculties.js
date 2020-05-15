import { List } from 'antd-mobile'

const FacultiesTab = ({ facultets }) => (<List>{facultets.map((x,i) => <List.Item key={i}>{x}</List.Item> )} </List>);

export default FacultiesTab;
