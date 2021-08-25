import { useMemo, useState } from "react";

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

  function returnPaginationShape() {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;

    // type StringNumArray = Array<string>|Array<number>|Array<string|number> 
    let outputRange: any;

    if (totalPageNumbers >= totalPageCount) {
      // return range(1, totalPageCount);
      outputRange = range(1, totalPageCount);
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

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      // return [...leftRange, DOTS, totalPageCount];
      outputRange =  [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );

      // return [firstPageIndex, DOTS, ...rightRange];
      outputRange =  [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);

      // return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      outputRange =  [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return outputRange
  }

  const paginationRange = useMemo(returnPaginationShape, [
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  ]);

  return paginationRange;
};
