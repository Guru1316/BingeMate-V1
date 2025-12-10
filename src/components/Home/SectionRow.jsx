// src/components/Home/SectionRow.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import SeriesCard from './SeriesCard';
import './sectionRow.css';

const SectionRow = ({ title, series, seeMoreLink, loading = false }) => {
  if (loading) {
    return (
      <div className="section-row">
        <div className="section-header">
          <h2 className="section-title skeleton skeleton-text" style={{ width: '200px' }} />
          <div className="skeleton skeleton-text" style={{ width: '100px' }} />
        </div>
        <div className="series-row-skeleton">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      </div>
    );
  }

  if (!series || series.length === 0) return null;

  return (
    <div className="section-row">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {seeMoreLink && (
          <Link to={seeMoreLink} className="see-more-link">
            See More <FiChevronRight />
          </Link>
        )}
      </div>
      <div className="series-row">
        {series.slice(0, 6).map((item) => (
          <SeriesCard key={item.id} series={item} />
        ))}
      </div>
    </div>
  );
};

export default SectionRow;