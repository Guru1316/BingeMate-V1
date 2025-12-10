// src/components/Common/SkeletonLoader.jsx
import React from 'react';
import './skeleton.css';

const SkeletonLoader = ({ type = 'card', count = 1, className = '' }) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  const getSkeletonClass = () => {
    switch (type) {
      case 'card':
        return 'skeleton-card';
      case 'text':
        return 'skeleton-text';
      case 'circle':
        return 'skeleton-circle';
      case 'title':
        return 'skeleton-title';
      case 'image':
        return 'skeleton-image';
      default:
        return 'skeleton-card';
    }
  };

  if (count > 1) {
    return (
      <div className={`skeleton-container ${className}`}>
        {skeletons.map(i => (
          <div key={i} className={getSkeletonClass()} />
        ))}
      </div>
    );
  }

  return <div className={`${getSkeletonClass()} ${className}`} />;
};

export default SkeletonLoader;