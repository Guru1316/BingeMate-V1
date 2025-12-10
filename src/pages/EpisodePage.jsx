// src/pages/EpisodePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock, FiStar, FiUsers } from 'react-icons/fi';
import SkeletonLoader from '../components/Common/SkeletonLoader';
import { api, getImageUrl, getProfileUrl } from '../utils/api';
import './episode.css';

const EpisodePage = () => {
  const { id, seasonNumber, episodeNumber } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState(null);
  const [series, setSeries] = useState(null);
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      try {
        setLoading(true);
        
        const [episodeRes, seriesRes, seasonRes] = await Promise.all([
          fetch(api.getEpisodeDetails(id, seasonNumber, episodeNumber)),
          fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`),
          fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
        ]);
        
        if (!episodeRes.ok) throw new Error('Episode not found');
        
        const [episodeData, seriesData, seasonData] = await Promise.all([
          episodeRes.json(),
          seriesRes.json(),
          seasonRes.json()
        ]);
        
        setEpisode(episodeData);
        setSeries(seriesData);
        setSeason(seasonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodeDetails();
  }, [id, seasonNumber, episodeNumber]);

  const handleBackClick = () => {
    navigate(`/series/${id}/season/${seasonNumber}`);
  };

  if (loading) {
    return (
      <div className="episode-page-skeleton">
        <div className="episode-header-skeleton skeleton" style={{ height: '400px' }} />
        <div className="episode-info-skeleton">
          <div className="skeleton skeleton-text" style={{ width: '300px', height: '40px' }} />
          <div className="skeleton skeleton-text" style={{ width: '200px' }} />
          <div className="skeleton skeleton-text" style={{ width: '100%', height: '120px' }} />
        </div>
      </div>
    );
  }

  if (error || !episode || !series) {
    return (
      <div className="error-container">
        <h2>Episode not found</h2>
        <p>The episode you're looking for doesn't exist or has been removed.</p>
        <button onClick={handleBackClick} className="btn btn-primary">
          Back to Season
        </button>
      </div>
    );
  }

  const guestStars = episode.guest_stars || episode.credits?.guest_stars || [];

  return (
    <div className="episode-page">
      {/* Header */}
      <div className="episode-header">
        <button onClick={handleBackClick} className="back-btn">
          <FiArrowLeft /> Back to Season {seasonNumber}
        </button>
        
        <div className="episode-header-content">
          <div className="episode-still-container">
            <img 
              src={getImageUrl(episode.still_path, 'w780')} 
              alt={episode.name}
              className="episode-still"
            />
          </div>
          
          <div className="episode-header-info">
            <div className="episode-breadcrumb">
              <Link to={`/series/${id}`} className="breadcrumb-link">
                {series.name}
              </Link>
              <span className="breadcrumb-separator">›</span>
              <Link to={`/series/${id}/season/${seasonNumber}`} className="breadcrumb-link">
                Season {seasonNumber}
              </Link>
              <span className="breadcrumb-separator">›</span>
              <span className="breadcrumb-current">Episode {episodeNumber}</span>
            </div>
            
            <h1 className="episode-title">{episode.name}</h1>
            
            <div className="episode-meta-info">
              <div className="meta-item">
                <FiCalendar /> {episode.air_date ? new Date(episode.air_date).toLocaleDateString() : 'N/A'}
              </div>
              <div className="meta-item">
                <FiClock /> {episode.runtime || 'N/A'} min
              </div>
              {episode.vote_average > 0 && (
                <div className="meta-item">
                  <FiStar /> {episode.vote_average.toFixed(1)}/10
                </div>
              )}
            </div>
            
            <div className="episode-number-badge">
              Episode {episodeNumber}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="episode-content">
        <div className="episode-main">
          {/* Overview */}
          <div className="episode-section">
            <h2 className="section-title">Overview</h2>
            <p className="episode-overview">
              {episode.overview || 'No overview available for this episode.'}
            </p>
          </div>

          {/* Guest Stars */}
          {guestStars.length > 0 && (
            <div className="episode-section">
              <h2 className="section-title">
                <FiUsers /> Guest Stars
              </h2>
              <div className="guest-stars-grid">
                {guestStars.slice(0, 8).map(star => (
                  <div key={star.id} className="guest-star-card">
                    <img 
                      src={getProfileUrl(star.profile_path)} 
                      alt={star.name}
                      className="guest-star-image"
                    />
                    <div className="guest-star-info">
                      <h4>{star.name}</h4>
                      <p className="guest-star-character">{star.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Crew */}
          {episode.crew?.length > 0 && (
            <div className="episode-section">
              <h2 className="section-title">Crew</h2>
              <div className="crew-list">
                {episode.crew.map(person => (
                  <div key={person.id} className="crew-item">
                    <strong>{person.name}</strong>
                    <span>{person.job}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="episode-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Episode Details</h3>
            <div className="sidebar-details">
              <div className="detail-item">
                <strong>Season:</strong>
                <span>{seasonNumber}</span>
              </div>
              <div className="detail-item">
                <strong>Episode:</strong>
                <span>{episodeNumber}</span>
              </div>
              {season?.name && (
                <div className="detail-item">
                  <strong>Season Name:</strong>
                  <span>{season.name}</span>
                </div>
              )}
              <div className="detail-item">
                <strong>Air Date:</strong>
                <span>{episode.air_date ? new Date(episode.air_date).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div className="detail-item">
                <strong>Runtime:</strong>
                <span>{episode.runtime || 'N/A'} minutes</span>
              </div>
              {episode.vote_count > 0 && (
                <div className="detail-item">
                  <strong>Votes:</strong>
                  <span>{episode.vote_count.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Episode Navigation</h3>
            <div className="episode-navigation">
              {episodeNumber > 1 && (
                <Link 
                  to={`/series/${id}/season/${seasonNumber}/episode/${parseInt(episodeNumber) - 1}`}
                  className="nav-btn prev"
                >
                  ← Previous Episode
                </Link>
              )}
              
              {season?.episodes && episodeNumber < season.episodes.length && (
                <Link 
                  to={`/series/${id}/season/${seasonNumber}/episode/${parseInt(episodeNumber) + 1}`}
                  className="nav-btn next"
                >
                  Next Episode →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodePage;