import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './SearchBar.module.css';
const searchbar = props => {
    return (
        <div className={classes.SearchBar}>
            <FontAwesomeIcon icon={faSearch} className={classes.SearchIcon} />
            <input placeholder="Search"
                type="text"
                value={props.searchValue}
                onChange={props.onChange}
                className={classes.SearchInput} />
        </div>
    )
};
export default searchbar
