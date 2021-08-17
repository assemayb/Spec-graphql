import React, { useMemo } from "react";

export const DOTS = "...";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

type usePaginationProps = {
  pageSize: number;
  currentPage: number;
  totalCount: number;
  siblingCount?: number;
};

export const usePagination = ({
  currentPage,
  pageSize,
  totalCount,
  siblingCount = 1,
}: usePaginationProps) => {
  
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 9;

    if (totalPageNumbers >= totalPageCount) {
      const currRange = range(1, totalPageCount);
      return currRange;
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
    let output;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      console.log("shouldShowRightDots");
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      output = [...leftRange, DOTS, totalPageCount];
      return output;
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      console.log("shouldShowLeftDots");
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      output = [firstPageIndex, DOTS, ...rightRange];
      return output;
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      output = [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      return output;
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
