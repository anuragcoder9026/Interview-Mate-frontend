import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleResize = () => {
        if (window.innerWidth >= 768) {
            setIsExpanded(true);  // Expand by default on larger screens
        } else {
            setIsExpanded(false); // Collapse by default on smaller screens
        }
    };

    useEffect(() => {
        handleResize(); // Set the initial state based on screen size
        window.addEventListener('resize', handleResize); // Update state on window resize
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    const handleClick = () => {
        if (window.innerWidth < 768) { // Only toggle on small screens
            setIsExpanded(!isExpanded);
        }
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            const url = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
            window.location.href = url;
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    };

    return (
        <div className="relative">
            <div
                className={`flex items-center transition-all duration-300 ease-in-out ${
                    isExpanded ? 'w-48' : 'w-12'
                } ${isExpanded ? 'bg-slate-800' : 'bg-gray-700'} rounded-full`}
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
