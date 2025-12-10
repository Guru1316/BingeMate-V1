// src/pages/SeasonPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock, FiStar, FiPlay } from 'react-icons/fi';
import SkeletonLoader from '../components/Common/SkeletonLoader';
import { api, getImageUrl, getBackdropUrl } from '../utils/api';
import './season.css';

const SeasonPage = () => {
  const { id, seasonNumber } = useParams();
  const navigate = useNavigate();
  const [season, setSeason] = useState(null);
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeasonDetails = async () => {
      try {
        setLoading(true);
        
        const [seasonRes, seriesRes] = await Promise.all([
          fetch(api.getSeasonDetails(id, seasonNumber)),
          fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
        ]);
        
        if (!seasonRes.ok) throw new Error('Season not found');
        
        const [seasonData, seriesData] = await Promise.all([
          seasonRes.json(),
          seriesRes.json()
        ]);
        
        setSeason(seasonData);
        setSeries(seriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonDetails();
  }, [id, seasonNumber]);

  const handleEpisodeClick = (episodeNumber) => {
    navigate(`/series/${id}/season/${seasonNumber}/episode/${episodeNumber}`);
  };

  const handleBackClick = () => {
    navigate(`/series/${id}`);
  };

  if (loading) {
    return (
      <div className="season-page-skeleton">
        <div className="season-header-skeleton skeleton" style={{ height: '300px' }} />
        <div className="season-info-skeleton">
          <div className="skeleton skeleton-text" style={{ width: '250px', height: '40px' }} />
          <div className="skeleton skeleton-text" style={{ width: '150px' }} />
          <div className="skeleton skeleton-text" style={{ width: '100%', height: '80px' }} />
        </div>
      </div>
    );
  }

  if (error || !season || !series) {
    return (
      <div className="error-container">
        <h2>Season not found</h2>
        <p>The season you're looking for doesn't exist or has been removed.</p>
        <button onClick={handleBackClick} className="btn btn-primary">
          Back to Series
        </button>
      </div>
    );
  }

  return (
    <div className="season-page">
      {/* Header */}
      <div className="season-header">
        <button onClick={handleBackClick} className="back-btn">
          <FiArrowLeft /> Back to {series.name}
        </button>
        
        <div 
          className="season-backdrop"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent, var(--primary-bg)), url(${getBackdropUrl(season.poster_path || series.backdrop_path)})`
          }}
        />
        
        <div className="season-header-content">
          <div className="season-poster-container">
            <img 
              src={getImageUrl(season.poster_path || series.poster_path, 'w500')} 
              alt={season.name}
              className="season-poster-large"
            />
          </div>
          
          <div className="season-header-info">
            <h1 className="season-title">{season.name}</h1>
            <h2 className="series-title">{series.name}</h2>
            
            <div className="season-meta-info">
              <div className="meta-item">
                <FiCalendar /> {season.air_date?.substring(0, 4) || 'N/A'}
              </div>
              <div className="meta-item">
                {season.episodes?.length || 0} Episodes
              </div>
              {season.episodes?.[0]?.runtime && (
                <div className="meta-item">
                  <FiClock /> ~{season.episodes[0].runtime} min per episode
                </div>
              )}
            </div>
            
            {season.overview && (
              <div className="season-overview">
                <h3>Season Overview</h3>
                <p>{season.overview}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Episodes */}
      <div className="episodes-container">
        <h2 className="episodes-title">Episodes</h2>
        
        <div className="episodes-list">
          {season.episodes?.map((episode) => (
            <div 
              key={episode.id} 
              className="episode-card"
              onClick={() => handleEpisodeClick(episode.episode_number)}
            >
              <div className="episode-number">
                {episode.episode_number}
              </div>
              
              <div className="episode-image">
                <img 
                  src={getImageUrl(episode.still_path, 'w300')} 
                  alt={episode.name}
                  loading="lazy"
                />
                <div className="episode-play-overlay">
                  <FiPlay />
                </div>
              </div>
              
              <div className="episode-details">
                <div className="episode-header">
                  <h3 className="episode-name">{episode.name}</h3>
                  <div className="episode-meta">
                    {episode.air_date && (
                      <span className="episode-date">
                        <FiCalendar /> {new Date(episode.air_date).toLocaleDateString()}
                      </span>
                    )}
                    {episode.runtime && (
                      <span className="episode-runtime">
                        <FiClock /> {episode.runtime} min
                      </span>
                    )}
                    {episode.vote_average > 0 && (
                      <span className="episode-rating">
                        <FiStar /> {episode.vote_average.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="episode-overview">
                  {episode.overview?.length > 200 
                    ? `${episode.overview.substring(0, 200)}...` 
                    : episode.overview || 'No description available.'}
                </p>
                
                {episode.guest_stars?.length > 0 && (
                  <div className="episode-guest-stars">
                    <strong>Guest Stars: </strong>
                    {episode.guest_stars.slice(0, 3).map(star => star.name).join(', ')}
                    {episode.guest_stars.length > 3 && '...'}
                  </div>
                )}
                
                <button className="btn btn-outline btn-sm episode-details-btn">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonPage;