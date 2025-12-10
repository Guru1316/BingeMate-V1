// src/components/Layout/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { FiSearch, FiSun, FiMoon, FiHeart, FiHome, FiFilter } from 'react-icons/fi';
import './header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-text">Binge</span>
            <span className="logo-accent">Mate</span>
          </Link>

          <nav className="nav">
            <Link to="/" className="nav-link">
              <FiHome /> Home
            </Link>
            <Link to="/coming-soon" className="nav-link">
              Coming Soon
            </Link>
            <Link to="/genres" className="nav-link">
              <FiFilter /> Genres
            </Link>
            <Link to="/favorites" className="nav-link">
              <FiHeart /> Favorites
            </Link>
          </nav>

          <div className="header-actions">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search series..."
                className="search-input"
              />
              <button type="submit" className="search-btn">
                <FiSearch />
              </button>
            </form>

            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;