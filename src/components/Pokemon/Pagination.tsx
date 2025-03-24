'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // Generate array of page numbers to display
  const getPageNumbers = (current: number, total: number) => {
    const pages = [];

    if (total <= 7) {
      // If total pages are less than or equal to 7, show all pages
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Current page is in first 3 pages
      if (current <= 3) {
        pages.push(2, 3, 4, '...', total);
      }
      // Current page is in last 3 pages
      else if (current >= total - 2) {
        pages.push('...', total - 3, total - 2, total - 1, total);
      }
      // Current page is in the middle
      else {
        pages.push('...', current - 1, current, current + 1, '...', total);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex justify-center mt-8 space-x-2">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        Prev
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : page === '...'
              ? 'bg-white cursor-default'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        Next
      </button>
    </div>
  );
}
