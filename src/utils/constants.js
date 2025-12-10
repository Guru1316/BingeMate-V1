// src/utils/constants.js
export const APP_NAME = 'BingeMate';

export const TMDB_CONFIG = {
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  BACKDROP_SIZES: {
    SMALL: 'w300',
    MEDIUM: 'w780',
    LARGE: 'w1280',
    ORIGINAL: 'original'
  },
  POSTER_SIZES: {
    SMALL: 'w185',
    MEDIUM: 'w342',
    LARGE: 'w500',
    ORIGINAL: 'original'
  },
  PROFILE_SIZES: {
    SMALL: 'w45',
    MEDIUM: 'w185',
    LARGE: 'h632',
    ORIGINAL: 'original'
  }
};

export const GENRES = [
  { id: 10759, name: 'Action & Adventure', color: '#FF6B6B' },
  { id: 16, name: 'Animation', color: '#4ECDC4' },
  { id: 35, name: 'Comedy', color: '#FFD166' },
  { id: 80, name: 'Crime', color: '#06D6A0' },
  { id: 99, name: 'Documentary', color: '#118AB2' },
  { id: 18, name: 'Drama', color: '#073B4C' },
  { id: 10751, name: 'Family', color: '#EF476F' },
  { id: 10762, name: 'Kids', color: '#7209B7' },
  { id: 9648, name: 'Mystery', color: '#3A86FF' },
  { id: 10763, name: 'News', color: '#FB5607' },
  { id: 10764, name: 'Reality', color: '#8338EC' },
  { id: 10765, name: 'Sci-Fi & Fantasy', color: '#FF006E' },
  { id: 10766, name: 'Soap', color: '#3A86FF' },
  { id: 10767, name: 'Talk', color: '#FB5607' },
  { id: 10768, name: 'War & Politics', color: '#8338EC' },
  { id: 37, name: 'Western', color: '#06D6A0' }
];

export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Top Rated' },
  { value: 'first_air_date.desc', label: 'Newest First' },
  { value: 'first_air_date.asc', label: 'Oldest First' },
  { value: 'name.asc', label: 'A-Z' },
  { value: 'name.desc', label: 'Z-A' },
  { value: 'vote_count.desc', label: 'Most Votes' }
];

export const LANGUAGE_OPTIONS = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'hi', name: 'Hindi' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' }
];

export const STATUS_COLORS = {
  'Returning Series': '#46d369',
  'Ended': '#ff4444',
  'Canceled': '#ffa00a',
  'In Production': '#2196f3',
  'Planned': '#9c27b0',
  'Pilot': '#ff9800'
};

export const STORAGE_KEYS = {
  FAVORITES: 'bingemate-favorites',
  THEME: 'theme',
  RECENT_SEARCHES: 'recent-searches'
};

export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  SERIES: '/series/:id',
  SEASON: '/series/:id/season/:seasonNumber',
  EPISODE: '/series/:id/season/:seasonNumber/episode/:episodeNumber',
  GENRES: '/genres',
  FAVORITES: '/favorites',
  COMING_SOON: '/coming-soon'
};