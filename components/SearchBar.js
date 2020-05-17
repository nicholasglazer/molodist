import { SearchBar, Button, WhiteSpace } from 'antd-mobile';
import s from '@emotion/styled'

const SearchBarComponent = () => {
    return (
        <SearchWrapper>
          <SearchBar placeholder="Пошук" cancelText="Ок" maxLength={8} />
        </SearchWrapper>
    )
}

const SearchWrapper = s.div`
display: flex;
flex: 1;
> form {
 width: 100%;
 .am-search-cancel {
  color: #0070f3;
 }
}
`
export default SearchBarComponent;
