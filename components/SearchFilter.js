import { SearchBar } from 'antd-mobile';
import s from '@emotion/styled';

const SearchFilter = ({ value, handleChange, placeholder="Пошук", cancel }) => {
 return (
    <SearchWrapper>
      <SearchBar
        placeholder={placeholder}
        value={value}
        onSubmit={value => console.log('value', value) }
        onChange={handleChange}
        onClear={cancel}
        cancelText="Ок"
        maxLength={20}
      />
    </SearchWrapper>
);
}

const SearchWrapper = s.div`
display: flex;
box-shadow: 0 1px 3px rgba(0,0,0, .14);
flex: 1;
> form {
 width: 100%;
 .am-search-cancel {
  color: #0070f3;
 }
}
`
export default SearchFilter;
