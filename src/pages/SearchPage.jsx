// src/pages/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import Filters from '../components/Common/Filters';
import SeriesCard from '../components/Home/SeriesCard';
import Pagination from '../components/Common/Pagination';
import SkeletonLoader from '../components/Common/SkeletonLoader';
import { api } from '../utils/api';
import './search.css';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [query, setQuery] = useState(queryParams.get('q') || '');
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter states
  const [selectedGenres, setSelectedGenres] = useState(
    queryParams.get('genres')?.split(',').map(Number).filter(Boolean) || []
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    queryParams.get('language') || ''
  );
  const [sortBy, setSortBy] = useState(
    queryParams.get('sort') || 'popularity.desc'
  );
  
  const debouncedQuery = useDebounce(query, 500);

  // Fetch genres and languages on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [genresRes, languagesRes] = await Promise.all([
          fetch(api.getGenres()),
          fetch(api.getLanguages())
        ]);
        
        const [genresData, languagesData] = await Promise.all([
          genresRes.json(),
          languagesRes.json()
        ]);
        
        setGenres(genresData.genres);
        setLanguages(languagesData);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch search results
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        
        let url;
        if (debouncedQuery.trim()) {
          url = api.searchSeries(debouncedQuery, currentPage);
        } else {
          let apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${currentPage}&sort_by=${sortBy}`;
          
          if (selectedGenres.length > 0) {
            apiUrl += `&with_genres=${selectedGenres.join(',')}`;
          }
          
          if (selectedLanguage) {
            apiUrl += `&with_original_language=${selectedLanguage}`;
          }
          
          url = apiUrl;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        setResults(data.results || []);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); // TMDB限制
      } catch (error) {
        console.error('Error fetching results:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, currentPage, selectedGenres, selectedLanguage, sortBy]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (query) params.set('q', query);
    if (selectedGenres.length > 0) params.set('genres', selectedGenres.join(','));
    if (selectedLanguage) params.set('language', selectedLanguage);
    if (sortBy !== 'popularity.desc') params.set('sort', sortBy);
    
    navigate(`/search?${params.toString()}`, { replace: true });
  }, [query, selectedGenres, selectedLanguage, sortBy, navigate]);

  const handleClearFilters = () => {
    setQuery('');
    setSelectedGenres([]);
    setSelectedLanguage('');
    setSortBy('popularity.desc');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1 className="search-title">
          {debouncedQuery ? `Search Results for "${debouncedQuery}"` : 'Browse Series'}
        </h1>
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for series..."
            className="search-input-main"
          />
        </div>
      </div>

      <div className="search-content">
        <div className="filters-sidebar">
          <Filters
            genres={genres}
            languages={languages}
            selectedGenres={selectedGenres}
            selectedLanguage={selectedLanguage}
            sortBy={sortBy}
            onGenreChange={setSelectedGenres}
            onLanguageChange={setSelectedLanguage}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
          />
        </div>

        <div className="search-results">
          {loading ? (
            <div className="results-skeleton">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="skeleton-card" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="no-results">
              <h3>No series found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
              <button onClick={handleClearFilters} className="btn btn-primary">
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="results-grid">
                {results.map(series => (
                  <SeriesCard key={series.id} series={series} />
                ))}
              </div>
              
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;