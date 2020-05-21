import { SearchBar } from 'antd-mobile';
import s from '@emotion/styled';

const SearchFilter = ({ value, handleChange, placeholder="Пошук", cancel }) => (
    <SearchWrapper>
      <SearchBar
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onClear={cancel}
        cancelText="Ок"
        maxLength={20}
      />
    </SearchWrapper>
);

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
export default SearchFilter;
