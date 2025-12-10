// src/components/Home/SeriesCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';
import { FiHeart, FiStar } from 'react-icons/fi';
import { getImageUrl } from '../../utils/api';
import './cards.css';

const SeriesCard = ({ series }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(series.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(series.id);
    } else {
      addFavorite(series);
    }
  };

  return (
    <Link to={`/series/${series.id}`} className="series-card">
      <div className="card">
        <div className="card-image-container">
          <img 
            src={getImageUrl(series.poster_path)} 
            alt={series.name}
            className="card-image"
            loading="lazy"
          />
          <button 
            onClick={handleFavoriteClick}
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FiHeart />
          </button>
          <div className="card-rating">
            <FiStar />
            <span>{series.vote_average?.toFixed(1) || 'N/A'}</span>
          </div>
        </div>
        
        <div className="card-content">
          <h3 className="card-title">{series.name}</h3>
          <p className="card-year">
            {series.first_air_date?.substring(0, 4) || 'N/A'}
          </p>
          <div className="card-genres">
            {series.genre_names?.slice(0, 2).map(genre => (
              <span key={genre} className="card-genre">{genre}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SeriesCard;