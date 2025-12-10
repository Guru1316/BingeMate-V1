// src/pages/FavoritesPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { FiHeart, FiTrash2, FiEye } from 'react-icons/fi';
import { getImageUrl } from '../utils/api';
import './favorites.css';

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [sortBy, setSortBy] = useState('added');

  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.vote_average || 0) - (a.vote_average || 0);
      case 'year':
        return (b.first_air_date?.substring(0, 4) || 0) - (a.first_air_date?.substring(0, 4) || 0);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleRemoveAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      favorites.forEach(fav => removeFavorite(fav.id));
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <div className="empty-icon">
          <FiHeart />
        </div>
        <h2>No Favorites Yet</h2>
        <p>Browse series and add them to your favorites to see them here.</p>
        <Link to="/" className="btn btn-primary">
          Explore Series
        </Link>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1 className="favorites-title">
          <FiHeart /> My Favorites
        </h1>
        <div className="favorites-stats">
          <span className="stat-item">{favorites.length} Series</span>
          <button onClick={handleRemoveAll} className="btn btn-outline btn-sm">
            <FiTrash2 /> Clear All
          </button>
        </div>
      </div>

      <div className="filters-bar">
        <div className="sort-filter">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="added">Recently Added</option>
            <option value="rating">Highest Rating</option>
            <option value="year">Release Year</option>
            <option value="name">A-Z</option>
          </select>
        </div>
      </div>

      <div className="favorites-grid">
        {sortedFavorites.map(series => (
          <div key={series.id} className="favorite-card">
            <div className="favorite-card-image">
              <img 
                src={getImageUrl(series.poster_path)} 
                alt={series.name}
                className="favorite-poster"
              />
              <div className="favorite-actions">
                <Link 
                  to={`/series/${series.id}`} 
                  className="action-btn view-btn"
                  title="View Details"
                >
                  <FiEye />
                </Link>
                <button 
                  onClick={() => removeFavorite(series.id)}
                  className="action-btn remove-btn"
                  title="Remove from Favorites"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
            
            <div className="favorite-card-content">
              <h3 className="favorite-title">{series.name}</h3>
              
              <div className="favorite-meta">
                {series.vote_average > 0 && (
                  <div className="meta-item">
                    <FiHeart /> {series.vote_average.toFixed(1)}
                  </div>
                )}
                {series.first_air_date && (
                  <div className="meta-item">
                    {series.first_air_date.substring(0, 4)}
                  </div>
                )}
              </div>
              
              <Link to={`/series/${series.id}`} className="btn btn-outline btn-sm">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;