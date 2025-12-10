// src/components/Home/HeroCarousel.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiPlay, FiInfo } from 'react-icons/fi';
import { getBackdropUrl, getImageUrl } from '../../utils/api';
import './carousel.css';

const HeroCarousel = ({ series }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || series.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % series.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [series.length, isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? series.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % series.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (series.length === 0) return null;

  const currentSeries = series[currentIndex];

  return (
    <div className="hero-carousel">
      <div className="carousel-slide">
        <div 
          className="carousel-backdrop"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url(${getBackdropUrl(currentSeries.backdrop_path, 'w1280')})`
          }}
        >
          <div className="carousel-content">
            <div className="carousel-info">
              <h1 className="carousel-title">{currentSeries.name}</h1>
              <div className="carousel-meta">
                <span className="carousel-rating">
                  ⭐ {currentSeries.vote_average?.toFixed(1)}/10
                </span>
                <span className="carousel-year">
                  {currentSeries.first_air_date?.substring(0, 4)}
                </span>
                <span className="carousel-genres">
                  {currentSeries.genre_ids?.slice(0, 2).join(' • ')}
                </span>
              </div>
              <p className="carousel-overview">
                {currentSeries.overview?.length > 200 
                  ? `${currentSeries.overview.substring(0, 200)}...` 
                  : currentSeries.overview}
              </p>
              <div className="carousel-actions">
                <Link 
                  to={`/series/${currentSeries.id}`} 
                  className="btn btn-primary btn-lg"
                >
                  <FiPlay /> Watch Now
                </Link>
                <Link 
                  to={`/series/${currentSeries.id}`} 
                  className="btn btn-secondary btn-lg"
                >
                  <FiInfo /> More Info
                </Link>
              </div>
            </div>
            <div className="carousel-poster">
              <img 
                src={getImageUrl(currentSeries.poster_path)} 
                alt={currentSeries.name}
                className="poster-image"
              />
            </div>
          </div>
        </div>
      </div>

      <button className="carousel-btn prev" onClick={handlePrev}>
        <FiChevronLeft />
      </button>
      <button className="carousel-btn next" onClick={handleNext}>
        <FiChevronRight />
      </button>

      <div className="carousel-indicators">
        {series.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;