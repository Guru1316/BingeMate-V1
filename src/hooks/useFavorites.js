// src/hooks/useFavorites.js
import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('bingemate-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bingemate-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (series) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === series.id)) return prev;
      return [...prev, series];
    });
  };

  const removeFavorite = (seriesId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== seriesId));
  };

  const isFavorite = (seriesId) => {
    return favorites.some(fav => fav.id === seriesId);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};