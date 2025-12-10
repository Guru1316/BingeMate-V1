// src/utils/helpers.js
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatRuntime = (minutes) => {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  }
  
  return `${hours}h ${mins}m`;
};

export const formatVoteCount = (count) => {
  if (!count) return 'No votes';
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k votes`;
  }
  return `${count.toLocaleString()} votes`;
};

export const getYearFromDate = (dateString) => {
  if (!dateString) return 'N/A';
  return dateString.substring(0, 4);
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const createArray = (length, fill = null) => {
  return Array.from({ length }, () => fill);
};

export const parseQueryString = (queryString) => {
  const params = new URLSearchParams(queryString);
  const result = {};
  
  for (const [key, value] of params) {
    if (value.includes(',')) {
      result[key] = value.split(',').map(v => isNaN(v) ? v : Number(v));
    } else {
      result[key] = isNaN(value) ? value : Number(value);
    }
  }
  
  return result;
};

export const createQueryString = (params) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        searchParams.set(key, value.join(','));
      }
    } else if (value !== '' && value !== null && value !== undefined) {
      searchParams.set(key, value);
    }
  });
  
  return searchParams.toString();
};