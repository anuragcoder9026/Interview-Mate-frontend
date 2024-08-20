import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            // Redirect to Google search with the search term
            const url = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
            window.location.href = url;
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submission
            handleSearch();
        }
    };

    return (
        <div className="relative w-full">
            <div
                className={`flex items-center transition-all duration-300 ease-in-out ${
                    isExpanded ? 'w-48 sm:w-2/3' : 'w-12'
                } ${isExpanded ? 'bg-gray-600' : 'bg-gray-700 '} rounded-full`}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className={`py-1 px-3 text-white bg-transparent outline-none ${
                        isExpanded ? 'block' : 'hidden'
                    }`}
                    style={{ width: 'calc(100% - 40px)' }}
                />
                <button
                    onClick={handleClick}
                    className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full"
                >
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="text-white"
                    />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
