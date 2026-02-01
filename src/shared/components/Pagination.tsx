import React from "react";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../stores/store";
import { setPage } from "../stores/pagination.slice";

interface PaginationProps {
  totalItems: number;
  pageSize: number;
  storageKey: string; // unique key if multiple paginations in app
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  pageSize,
  storageKey,
  onPageChange,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.pagination[storageKey] || 1,
  );

  const totalPages = Math.ceil(totalItems / pageSize);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    dispatch(setPage({ key: storageKey, page }));
    if (onPageChange) onPageChange(page);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1 mt-4 flex-wrap">
      {/* Prev button */}
      <Button
        size="sm"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      {/* Page numbers */}
      {pageNumbers.map((num) => (
        <Button
          key={num}
          size="sm"
          color={num === currentPage ? "gray" : "light"}
          onClick={() => goToPage(num)}
        >
          {num}
        </Button>
      ))}

      {/* Next button */}
      <Button
        size="sm"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
