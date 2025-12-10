// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SeriesPage from './pages/SeriesPage';
import SeasonPage from './pages/SeasonPage';
import EpisodePage from './pages/EpisodePage';
import GenresPage from './pages/GenresPage';
import FavoritesPage from './pages/FavoritesPage';
import ComingSoonPage from './pages/ComingSoonPage';
import './styles/main.css';

function App() {
  const { theme } = useTheme();

  return (
      <div className="app" data-theme={theme}>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/series/:id" element={<SeriesPage />} />
            <Route path="/series/:id/season/:seasonNumber" element={<SeasonPage />} />
            <Route path="/series/:id/season/:seasonNumber/episode/:episodeNumber" element={<EpisodePage />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/coming-soon" element={<ComingSoonPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
  );
}

export default App;