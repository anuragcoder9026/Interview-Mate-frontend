import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
    return (
        <div style={styles.searchContainer}>
            <FontAwesomeIcon icon={faSearch} style={styles.icon} />
            <input 
                type="text" 
                placeholder="Search..." 
                style={styles.input}
            />
        </div>
    );
};

const styles = {
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1b1b1b', // Dark gray color
        padding: 'px',
        borderRadius: '4px',
        width: '250px',
    },
    icon: {
        color: '#fff',
        marginRight: '8px',
    },
    input: {
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        color: '#fff',
        width: '100%',
    }
};

export default SearchBar;