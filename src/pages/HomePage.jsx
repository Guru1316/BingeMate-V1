// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import HeroCarousel from '../components/Home/HeroCarousel';
import SectionRow from '../components/Home/SectionRow';
import SkeletonLoader from '../components/Common/SkeletonLoader';
import { api } from '../utils/api';
import '../styles/pages/home.css';

const HomePage = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [onTheAir, setOnTheAir] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [trendingRes, popularRes, topRatedRes, airingTodayRes, onTheAirRes] = await Promise.all([
          fetch(api.getTrending('week')),
          fetch(api.getPopular()),
          fetch(api.getTopRated()),
          fetch(api.getAiringToday()),
          fetch(api.getOnTheAir())
        ]);

        const [trendingData, popularData, topRatedData, airingTodayData, onTheAirData] = await Promise.all([
          trendingRes.json(),
          popularRes.json(),
          topRatedRes.json(),
          airingTodayRes.json(),
          onTheAirRes.json()
        ]);

        setTrending(trendingData.results);
        setPopular(popularData.results);
        setTopRated(topRatedData.results);
        setAiringToday(airingTodayData.results);
        setOnTheAir(onTheAirData.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="home-skeleton">
        <div className="hero-skeleton skeleton" style={{ height: '500px', marginBottom: '2rem' }} />
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{ marginBottom: '2rem' }}>
            <div className="skeleton-text" style={{ width: '200px', marginBottom: '1rem' }} />
            <div className="series-row-skeleton">
              {[1, 2, 3, 4, 5, 6].map(j => (
                <div key={j} className="skeleton-card" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="home-page">
      <HeroCarousel series={trending.slice(0, 5)} />
      
      <SectionRow 
        title="Trending This Week"
        series={trending}
        seeMoreLink="/search?sort=trending"
      />
      
      <SectionRow 
        title="Popular Series"
        series={popular}
        seeMoreLink="/search?sort=popularity.desc"
      />
      
      <SectionRow 
        title="Top Rated"
        series={topRated}
        seeMoreLink="/search?sort=vote_average.desc"
      />
      
      <SectionRow 
        title="Airing Today"
        series={airingToday}
        seeMoreLink="/search?airing=today"
      />
      
      <SectionRow 
        title="Currently Running"
        series={onTheAir}
        seeMoreLink="/search?status=airing"
      />
    </div>
  );
};

export default HomePage;