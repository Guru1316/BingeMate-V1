// src/components/Common/Pagination.jsx
import React from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import './pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;
  
  const getPageNumbers = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="pagination-btn first"
        aria-label="First page"
      >
        <FiChevronsLeft />
      </button>
      
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn prev"
        aria-label="Previous page"
      >
        <FiChevronLeft />
      </button>

      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`pagination-number ${currentPage === 1 ? 'active' : ''}`}
          >
            1
          </button>
          {pageNumbers[0] > 2 && <span className="pagination-ellipsis">...</span>}
        </>
      )}

      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-number ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="pagination-ellipsis">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`pagination-number ${currentPage === totalPages ? 'active' : ''}`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn next"
        aria-label="Next page"
      >
        <FiChevronRight />
      </button>
      
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="pagination-btn last"
        aria-label="Last page"
      >
        <FiChevronsRight />
      </button>

      <div className="pagination-info">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;