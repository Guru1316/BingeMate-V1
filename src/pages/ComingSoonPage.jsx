// src/pages/ComingSoonPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiBell, FiChevronRight } from 'react-icons/fi';
import { getImageUrl } from '../utils/api';
import './comingSoon.css';

const ComingSoonPage = () => {
  const [upcomingSeries, setUpcomingSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for coming soon series
    const mockUpcomingSeries = [
      {
        id: 1,
        name: 'The Last of Us Season 2',
        poster_path: '/aUQKIpZZ31KWbpdHMCmaV76u78T.jpg',
        first_air_date: '2024-12-15',
        overview: 'Continuing the story of Joel and Ellie in a post-apocalyptic world.',
        status: 'Production'
      },
      {
        id: 2,
        name: 'Stranger Things Season 5',
        poster_path: '/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
        first_air_date: '2024-11-01',
        overview: 'The final season of the hit series.',
        status: 'Filming'
      },
      {
        id: 3,
        name: 'The Witcher Season 4',
        poster_path: '/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
        first_air_date: '2024-10-20',
        overview: 'New adventures of Geralt of Rivia.',
        status: 'Post-Production'
      },
      {
        id: 4,
        name: 'House of the Dragon Season 2',
        poster_path: '/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
        first_air_date: '2024-08-04',
        overview: 'The Targaryen civil war continues.',
        status: 'Completed'
      },
      {
        id: 5,
        name: 'The Mandalorian Season 4',
        poster_path: '/sWgBv7LV2PRoQgkxw0kdF8t4k4h.jpg',
        first_air_date: '2024-12-25',
        overview: 'The adventures of Din Djarin and Grogu continue.',
        status: 'Pre-Production'
      },
      {
        id: 6,
        name: 'Bridgerton Season 3',
        poster_path: '/hTyMpOeZ8mchYjKbUMBQUSv7Id2.jpg',
        first_air_date: '2024-05-16',
        overview: 'The story of Penelope Featherington and Colin Bridgerton.',
        status: 'Coming Soon'
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setUpcomingSeries(mockUpcomingSeries);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'var(--success-color)';
      case 'Post-Production':
        return '#46d369';
      case 'Filming':
        return '#ffa00a';
      case 'Pre-Production':
        return '#ff4444';
      case 'Production':
        return '#2196f3';
      default:
        return 'var(--secondary-text)';
    }
  };

  const getDaysUntilRelease = (dateString) => {
    const releaseDate = new Date(dateString);
    const today = new Date();
    const diffTime = releaseDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Released';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks`;
    return `${Math.floor(diffDays / 30)} months`;
  };

  if (loading) {
    return (
      <div className="coming-soon-skeleton">
        <div className="skeleton skeleton-text" style={{ width: '200px', height: '40px', marginBottom: '2rem' }} />
        <div className="upcoming-grid-skeleton">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="coming-soon-page">
      <div className="coming-soon-header">
        <h1 className="page-title">
          <FiCalendar /> Coming Soon
        </h1>
        <p className="page-subtitle">
          Discover upcoming series and mark your calendar
        </p>
      </div>

      <div className="countdown-section">
        <div className="countdown-card">
          <h3>
            <FiBell /> Next Release
          </h3>
          <div className="next-release">
            <h4>{upcomingSeries[0]?.name}</h4>
            <p className="release-date">
              {new Date(upcomingSeries[0]?.first_air_date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <div className="countdown-timer">
              <span className="countdown-label">In</span>
              <span className="countdown-value">
                {getDaysUntilRelease(upcomingSeries[0]?.first_air_date)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="upcoming-series">
        <div className="section-header">
          <h2>Upcoming Series</h2>
          <div className="status-legend">
            <span className="legend-item completed">Completed</span>
            <span className="legend-item post-production">Post-Production</span>
            <span className="legend-item filming">Filming</span>
            <span className="legend-item production">Production</span>
          </div>
        </div>

        <div className="upcoming-grid">
          {upcomingSeries.map(series => (
            <div key={series.id} className="upcoming-card">
              <div className="upcoming-card-image">
                <img 
                  src={getImageUrl(series.poster_path)} 
                  alt={series.name}
                  className="upcoming-poster"
                />
                <div className="upcoming-badge">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(series.status) }}
                  >
                    {series.status}
                  </span>
                </div>
              </div>
              
              <div className="upcoming-card-content">
                <h3 className="upcoming-title">{series.name}</h3>
                
                <div className="upcoming-meta">
                  <div className="meta-item">
                    <FiCalendar />
                    {new Date(series.first_air_date).toLocaleDateString()}
                  </div>
                  <div className="meta-item">
                    <FiClock />
                    {getDaysUntilRelease(series.first_air_date)}
                  </div>
                </div>
                
                <p className="upcoming-overview">
                  {series.overview?.length > 120 
                    ? `${series.overview.substring(0, 120)}...` 
                    : series.overview}
                </p>
                
                <div className="upcoming-actions">
                  <button className="btn btn-outline btn-sm reminder-btn">
                    <FiBell /> Set Reminder
                  </button>
                  <Link to={`/series/${series.id}`} className="btn btn-primary btn-sm">
                    Details <FiChevronRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="calendar-section">
        <h2>Release Calendar</h2>
        <div className="calendar-grid">
          {upcomingSeries.map(series => (
            <div key={series.id} className="calendar-card">
              <div className="calendar-date">
                {new Date(series.first_air_date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <div className="calendar-info">
                <h4>{series.name}</h4>
                <div className="calendar-status">
                  <span 
                    className="status-dot"
                    style={{ backgroundColor: getStatusColor(series.status) }}
                  />
                  {series.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;