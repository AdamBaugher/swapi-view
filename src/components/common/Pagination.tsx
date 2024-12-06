import React, { useState, useCallback, useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const [inputPage, setInputPage] = useState<number>(currentPage); // Track input value

  // Update the input page number whenever the currentPage prop changes
  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  // Handle page change when any page button is clicked
  const handlePageChange = useCallback((page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  }, [onPageChange, totalPages]);

  // Handle the input change and ensure it's a valid page number
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow only numbers or empty input
    if (value === "" || /^[1-9][0-9]*$/.test(value)) {
      setInputPage(Number(value));
    }
  };

  // Go to the page on "Enter" key press
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handlePageChange(inputPage);
    }
  };

  // Generate an array of page numbers surrounding the current page
  const generatePageNumbers = useCallback(() => {
    const pageNumbers: number[] = [];
    const delta = 1; // Number of pages before and after the current page to show
    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }, [currentPage, totalPages]);

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {/* First Page Button */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 bg-gray-200 rounded ${
          currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-300"
        }`}
      >
        {"<<"}
      </button>

      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 bg-gray-200 rounded ${
          currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-300"
        }`}
      >
        {"<"}
      </button>

      {/* Page Numbers */}
      {generatePageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 rounded ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 bg-gray-200 rounded ${
          currentPage === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-gray-300"
        }`}
      >
        {">"}
      </button>

      {/* Last Page Button */}
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 bg-gray-200 rounded ${
          currentPage === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-gray-300"
        }`}
      >
        {">>"}
      </button>

      {/* Input for Direct Page Navigation */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Page</span>
        <input
          type="number"
          value={inputPage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="px-4 py-2 border rounded w-16"
          min={1}
          max={totalPages}
        />
        <span className="text-sm text-gray-600">of {totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
