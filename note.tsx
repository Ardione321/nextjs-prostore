import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const PAGE_LIMIT = 8; // Maximum number of pages to display

  // Calculate start and end of the visible range
  const start = Math.max(1, currentPage - Math.floor(PAGE_LIMIT / 2));
  const end = Math.min(totalPages, start + PAGE_LIMIT - 1);

  // Adjust start if the end exceeds the totalPages
  const adjustedStart = Math.max(1, end - PAGE_LIMIT + 1);

  // Generate page numbers for the current range
  const pages = Array.from({ length: end - adjustedStart + 1 }, (_, i) => adjustedStart + i);

  return (
    <div className="flex items-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-lg ${
          currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-black hover:bg-gray-100"
        }`}
      >
        Previous
      </button>

      {/* Pagination Numbers */}
      {pages.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          disabled={number === currentPage}
          className={`px-4 py-2 border rounded-lg ${
            number === currentPage
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {number}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-lg ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
