// src/pages/SeriesPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCalendar, FiGlobe, FiStar, FiUsers, FiPlay, FiHeart } from 'react-icons/fi';
import { useFavorites } from '../hooks/useFavorites';
import SkeletonLoader from '../components/Common/SkeletonLoader';
import { api, getImageUrl, getBackdropUrl, getProfileUrl } from '../utils/api';
import './series.css';

const SeriesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(api.getSeriesDetails(id));
        if (!response.ok) throw new Error('Series not found');
        const data = await response.json();
        setSeries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesDetails();
  }, [id]);

  const handleFavoriteClick = () => {
    if (!series) return;
    
    if (isFavorite(series.id)) {
      removeFavorite(series.id);
    } else {
      addFavorite({
        id: series.id,
        name: series.name,
        poster_path: series.poster_path,
        vote_average: series.vote_average,
        first_air_date: series.first_air_date
      });
    }
  };

  const handleSeasonClick = (seasonNumber) => {
    navigate(`/series/${id}/season/${seasonNumber}`);
  };

  if (loading) {
    return (
      <div className="series-page-skeleton">
        <div className="backdrop-skeleton skeleton" style={{ height: '400px' }} />
        <div className="series-info-skeleton">
          <div className="skeleton skeleton-text" style={{ width: '300px', height: '40px' }} />
          <div className="skeleton skeleton-text" style={{ width: '200px' }} />
          <div className="skeleton skeleton-text" style={{ width: '100%', height: '100px' }} />
        </div>
      </div>
    );
  }

  if (error || !series) {
    return (
      <div className="error-container">
        <h2>Series not found</h2>
        <p>The series you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Go Back Home
        </button>
      </div>
    );
  }

  const trailer = series.videos?.results?.find(video => 
    video.type === 'Trailer' && video.site === 'YouTube'
  );

  const topCast = series.credits?.cast?.slice(0, 10) || [];

  return (
    <div className="series-page">
      {/* Backdrop */}
      <div 
        className="series-backdrop"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent, var(--primary-bg)), url(${getBackdropUrl(series.backdrop_path)})`
        }}
      />

      {/* Series Info */}
      <div className="series-info-container">
        <div className="series-poster">
          <img 
            src={getImageUrl(series.poster_path, 'w500')} 
            alt={series.name}
            className="poster"
          />
          <button 
            onClick={handleFavoriteClick}
            className={`favorite-btn-large ${isFavorite(series.id) ? 'active' : ''}`}
          >
            <FiHeart /> {isFavorite(series.id) ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>

        <div className="series-details">
          <h1 className="series-title">{series.name}</h1>
          
          <div className="series-meta">
            <div className="meta-item">
              <FiStar /> {series.vote_average?.toFixed(1)}/10
            </div>
            <div className="meta-item">
              <FiCalendar /> {series.first_air_date?.substring(0, 4)}
            </div>
            <div className="meta-item">
              <FiGlobe /> {series.original_language?.toUpperCase()}
            </div>
            <div className="meta-item">
              <FiUsers /> {series.number_of_seasons} Season{series.number_of_seasons !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="series-genres">
            {series.genres?.map(genre => (
              <span key={genre.id} className="genre-tag">{genre.name}</span>
            ))}
          </div>

          <div className="series-overview">
            <h3>Overview</h3>
            <p>{series.overview || 'No overview available.'}</p>
          </div>

          {/* Trailer */}
          {trailer && (
            <div className="series-trailer">
              <h3>Trailer</h3>
              <div className="trailer-container">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={`${series.name} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="trailer-iframe"
                />
              </div>
            </div>
          )}

          {/* Seasons */}
          <div className="series-seasons">
            <h3>Seasons</h3>
            <div className="seasons-grid">
              {series.seasons?.map(season => (
                <div 
                  key={season.id} 
                  className="season-card"
                  onClick={() => handleSeasonClick(season.season_number)}
                >
                  <img 
                    src={getImageUrl(season.poster_path, 'w185')} 
                    alt={season.name}
                    className="season-poster"
                  />
                  <div className="season-info">
                    <h4>{season.name}</h4>
                    <p className="season-meta">
                      {season.episode_count} Episodes • {season.air_date?.substring(0, 4)}
                    </p>
                    {season.overview && (
                      <p className="season-overview">
                        {season.overview.length > 100 
                          ? `${season.overview.substring(0, 100)}...` 
                          : season.overview}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cast */}
          <div className="series-cast">
            <h3>Cast</h3>
            <div className="cast-grid">
              {topCast.map(person => (
                <div key={person.id} className="cast-card">
                  <img 
                    src={getProfileUrl(person.profile_path)} 
                    alt={person.name}
                    className="cast-image"
                  />
                  <div className="cast-info">
                    <h4>{person.name}</h4>
                    <p className="cast-character">{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesPage;