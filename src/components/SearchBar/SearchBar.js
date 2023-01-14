import SearchIcon from '@mui/icons-material/Search';

import "./style.css";


const SearchBar = ({ searchValue, updateSearchValue }) => {
    return <>
        <div className='search__Item__Container'>
            <SearchIcon className='search__Icon' />
            <input type={"text"} placeholder={"Search"} value={searchValue ? searchValue : ""} onChange={(e) => updateSearchValue && typeof updateSearchValue === "function" ? updateSearchValue(e.target.value) : () => {}} />
        </div>
    </>
}

export default SearchBar;
