import React, { useEffect, useState } from 'react';

const Pagination = props => {
  const { pageLimit, currentPage, setCurrentPage, totalPage } = props;

  const [pageArray, setPageArray] = useState([]);

  useEffect(() => {
    const arr = [];
    const startPage = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;
    const endPage = Math.min(startPage + pageLimit - 1, totalPage);

    for (let i = startPage; i < endPage + 1; i++) {
      arr.push(i);
    }
    setPageArray(arr);
  }, [totalPage, currentPage, pageLimit]);

  return (
    <div className="mt-10 flex w-full justify-center">
      <button
        className={`text-20px text-grayscaleD hover:text-grayscaleH ${
          currentPage === 1 ? 'invisible' : 'visible'
        }`}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        {'<'}
      </button>

      <ul className="flex gap-3 px-4">
        {pageArray.map(num => {
          return (
            <li key={num}>
              <button
                className={`text-20px hover:text-grayscaleH ${
                  num === currentPage ? 'text-grayscaleH' : 'text-grayscaleD'
                }`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        className={`text-20px text-grayscaleD hover:text-grayscaleH ${
          currentPage === totalPage ? 'invisible' : 'visible'
        }`}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
