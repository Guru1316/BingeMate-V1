// src/components/Common/Filters.jsx
import React from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import './filters.css';

const Filters = ({ 
  genres = [], 
  languages = [], 
  selectedGenres = [],
  selectedLanguage = '',
  sortBy = '',
  onGenreChange,
  onLanguageChange,
  onSortChange,
  onClearFilters 
}) => {
  const sortOptions = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'vote_average.desc', label: 'Top Rated' },
    { value: 'first_air_date.desc', label: 'Latest First' },
    { value: 'first_air_date.asc', label: 'Oldest First' },
    { value: 'name.asc', label: 'Name A-Z' },
    { value: 'name.desc', label: 'Name Z-A' }
  ];

  const handleGenreToggle = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      onGenreChange(selectedGenres.filter(id => id !== genreId));
    } else {
      onGenreChange([...selectedGenres, genreId]);
    }
  };

  return (
    <div className="filters-container">
      <div className="filters-header">
        <h3 className="filters-title">
          <FiFilter /> Filters
        </h3>
        <button onClick={onClearFilters} className="clear-filters-btn">
          <FiX /> Clear All
        </button>
      </div>

      <div className="filter-section">
        <h4 className="filter-section-title">Genres</h4>
        <div className="genre-chips">
          {genres.map(genre => (
            <button
              key={genre.id}
              className={`genre-chip ${selectedGenres.includes(genre.id) ? 'active' : ''}`}
              onClick={() => handleGenreToggle(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-section-title">Language</h4>
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="language-select"
        >
          <option value="">All Languages</option>
          {languages.map(lang => (
            <option key={lang.iso_639_1} value={lang.iso_639_1}>
              {lang.english_name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <h4 className="filter-section-title">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="active-filters">
        {selectedGenres.length > 0 && (
          <div className="active-filter">
            <span>Genres: </span>
            {selectedGenres.map(id => {
              const genre = genres.find(g => g.id === id);
              return (
                <span key={id} className="active-filter-tag">
                  {genre?.name}
                </span>
              );
            })}
          </div>
        )}
        {selectedLanguage && (
          <div className="active-filter">
            <span>Language: </span>
            <span className="active-filter-tag">
              {languages.find(l => l.iso_639_1 === selectedLanguage)?.english_name || selectedLanguage}
            </span>
          </div>
        )}
        {sortBy && (
          <div className="active-filter">
            <span>Sorted by: </span>
            <span className="active-filter-tag">
              {sortOptions.find(o => o.value === sortBy)?.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;