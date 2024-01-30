import React from "react";

function Pagination({ currentPage, totalPages, handleClick }) {
  const pageLimit = 5;
  const halfLimit = Math.floor(pageLimit / 2);
  const startPage = Math.max(1, currentPage - halfLimit);
  const endPage = Math.min(totalPages, currentPage + halfLimit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="flex justify-between items-center mt-4">
      <div className="text-gray-700 text-sm">
        Showing <b>1</b> to <b>100</b> of <b>4000</b> Results
      </div>
      <div className="flex justify-center items-center">
        {currentPage > 1 && (
          <li>
            <button
              className="py-2 px-3  border rounded-md hover:border-gray-500 leading-tight text-sm text-gray-800"
              onClick={() => {
                handleClick(currentPage - 1);
              }}
            >
              Previous
            </button>
          </li>
        )}

        {startPage > 2 && (
          <li>
            <span className="py-2 px-3  border rounded-md hover:border-gray-500 text-sm leading-tight text-gray-800">
              ...
            </span>
          </li>
        )}

        {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
          <li key={pageNumber}>
            <button
              className={`border rounded-md py-2 px-3 leading-tight text-sm  ${
                pageNumber === currentPage ? "text-blue-800 " : "text-gray-800 "
              }`}
              onClick={() => {
                handleClick(pageNumber);
              }}
            >
              {pageNumber}
            </button>
          </li>
        ))}

        {endPage < totalPages - 1 && (
          <li>
            <span className="py-2 px-3  border rounded-md hover:border-gray-500 text-sm leading-tight text-gray-800">
              ...
            </span>
          </li>
        )}

        {currentPage < totalPages && (
          <li>
            <button
              className="py-2 px-3  border rounded-md hover:border-gray-500 leading-tight text-sm text-gray-800"
              onClick={() => {
                handleClick(currentPage + 1);
              }}
            >
              Next
            </button>
          </li>
        )}

        {currentPage > 1 && (
          <li>
            <button
              className="py-2 px-3  border rounded-md hover:border-gray-500 leading-tight text-sm text-gray-800"
              onClick={() => {
                handleClick(1);
              }}
            >
              First
            </button>
          </li>
        )}

        {currentPage < totalPages && (
          <li>
            <button
              className="py-2 px-3  border rounded-md hover:border-gray-500 leading-tight text-sm text-gray-800"
              onClick={() => {
                handleClick(totalPages);
              }}
            >
              Last
            </button>
          </li>
        )}
      </div>
    </ul>
  );
}

export default Pagination;
