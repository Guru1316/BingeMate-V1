// src/utils/api.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const api = {
  // Series endpoints
  getTrending: (timeWindow = 'day') => 
    `${BASE_URL}/trending/tv/${timeWindow}?api_key=${API_KEY}`,
  
  getPopular: (page = 1) => 
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`,
  
  getTopRated: (page = 1) => 
    `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&page=${page}`,
  
  getAiringToday: (page = 1) => 
    `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&page=${page}`,
  
  getOnTheAir: (page = 1) => 
    `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&page=${page}`,
  
  getSeriesDetails: (id) => 
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos,similar`,
  
  getSeasonDetails: (seriesId, seasonNumber) => 
    `${BASE_URL}/tv/${seriesId}/season/${seasonNumber}?api_key=${API_KEY}&append_to_response=credits`,
  
  getEpisodeDetails: (seriesId, seasonNumber, episodeNumber) => 
    `${BASE_URL}/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${API_KEY}&append_to_response=credits`,
  
  searchSeries: (query, page = 1) => 
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
  
  getGenres: () => 
    `${BASE_URL}/genre/tv/list?api_key=${API_KEY}`,
  
  getSeriesByGenre: (genreId, page = 1) => 
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`,
  
  getLanguages: () => 
    `${BASE_URL}/configuration/languages?api_key=${API_KEY}`,
};

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path, size = 'w1280') => {
  if (!path) return 'https://via.placeholder.com/1280x720?text=No+Image';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getProfileUrl = (path, size = 'w185') => {
  if (!path) return 'https://via.placeholder.com/185x278?text=No+Image';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};