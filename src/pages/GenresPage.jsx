// src/pages/GenresPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeriesCard from '../components/Home/SeriesCard';
import Pagination from '../components/Common/Pagination';
import SkeletonLoader from '../components/Common/SkeletonLoader';
import { api } from '../utils/api';
import './genres.css';

const genresList = [
  { id: 10759, name: 'Action & Adventure', icon: '⚔️' },
  { id: 16, name: 'Animation', icon: '🎬' },
  { id: 35, name: 'Comedy', icon: '😂' },
  { id: 80, name: 'Crime', icon: '🔫' },
  { id: 99, name: 'Documentary', icon: '📽️' },
  { id: 18, name: 'Drama', icon: '🎭' },
  { id: 10751, name: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 10762, name: 'Kids', icon: '🧒' },
  { id: 9648, name: 'Mystery', icon: '🔍' },
  { id: 10763, name: 'News', icon: '📰' },
  { id: 10764, name: 'Reality', icon: '📺' },
  { id: 10765, name: 'Sci-Fi & Fantasy', icon: '🚀' },
  { id: 10766, name: 'Soap', icon: '🧼' },
  { id: 10767, name: 'Talk', icon: '🎙️' },
  { id: 10768, name: 'War & Politics', icon: '⚔️' },
  { id: 37, name: 'Western', icon: '🤠' }
];

const GenresPage = () => {
  const [selectedGenre, setSelectedGenre] = useState(10759); // Action & Adventure
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSeriesByGenre = async () => {
      try {
        setLoading(true);
        const response = await fetch(api.getSeriesByGenre(selectedGenre, currentPage));
        const data = await response.json();
        
        setSeries(data.results || []);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
      } catch (error) {
        console.error('Error fetching series by genre:', error);
        setSeries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesByGenre();
  }, [selectedGenre, currentPage]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedGenreData = genresList.find(g => g.id === selectedGenre);

  return (
    <div className="genres-page">
      <div className="genres-header">
        <h1 className="genres-title">Browse by Genre</h1>
        <p className="genres-subtitle">
          Discover series from different genres
        </p>
      </div>

      <div className="genres-container">
        {/* Genre Categories */}
        <div className="genres-sidebar">
          <h3 className="sidebar-title">Genres</h3>
          <div className="genres-list">
            {genresList.map(genre => (
              <button
                key={genre.id}
                className={`genre-btn ${selectedGenre === genre.id ? 'active' : ''}`}
                onClick={() => handleGenreClick(genre.id)}
              >
                <span className="genre-icon">{genre.icon}</span>
                <span className="genre-name">{genre.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Series Grid */}
        <div className="genres-content">
          <div className="genre-header">
            <h2 className="current-genre">
              {selectedGenreData?.icon} {selectedGenreData?.name}
            </h2>
            <p className="genre-description">
              Explore the best {selectedGenreData?.name.toLowerCase()} series
            </p>
          </div>

          {loading ? (
            <div className="series-skeleton">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="skeleton-card" />
              ))}
            </div>
          ) : series.length === 0 ? (
            <div className="no-series">
              <h3>No series found in this genre</h3>
              <p>Try selecting a different genre</p>
            </div>
          ) : (
            <>
              <div className="series-grid">
                {series.map(seriesItem => (
                  <SeriesCard key={seriesItem.id} series={seriesItem} />
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

export default GenresPage;