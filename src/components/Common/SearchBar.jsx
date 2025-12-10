// src/components/Common/SearchBar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { FiSearch, FiX } from 'react-icons/fi';
import './searchBar.css';

const SearchBar = ({ onSearch, placeholder = "Search series..." }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('q');
    if (searchParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery(searchParam);
    }
  }, [location.search]);

  useEffect(() => {
    if (onSearch && debouncedQuery.trim()) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    navigate('/search');
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`search-bar ${isFocused ? 'focused' : ''}`}
    >
      <div className="search-input-wrapper">
        <FiSearch className="search-icon" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="search-input"
          aria-label="Search series"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="clear-btn"
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
      </div>
      <button type="submit" className="search-submit-btn">
        Search
      </button>
    </form>
  );
};

export default SearchBar;