// src/components/Layout/Footer.jsx
import React from 'react';
import { FiHeart, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">
              Binge<span>Mate</span>
            </h3>
            <p className="footer-tagline">
              Your ultimate web series explorer. Discover, watch, and enjoy.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>Browse</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/genres">Genres</a></li>
                <li><a href="/coming-soon">Coming Soon</a></li>
                <li><a href="/favorites">Favorites</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                  TMDB API
                </a></li>
                <li><a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                  React
                </a></li>
                <li><a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">
                  Vite
                </a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FiGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FiLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FiTwitter />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} BingeMate. Made with <FiHeart className="heart-icon" /> for series lovers.
          </p>
          <p className="footer-disclaimer">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;