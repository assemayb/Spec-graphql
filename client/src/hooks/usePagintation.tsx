import React, { useMemo } from "react";

export const DOTS = "...";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => length + idx);
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
    // the overall number of page-btns
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    // const totalPageNumbers = siblingCount + 5;
    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */

    // if (totalPageNumbers >= totalPageCount) {
    //   const currRange = range(1, totalPageCount);
    //   return currRange;
    // }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // if (!shouldShowLeftDots && shouldShowRightDots) {
    if (shouldShowRightDots) {
      console.log("shouldShowRightDots");
      let leftItemCount = 3 + (2 * siblingCount);
      let leftRange = range(1, leftItemCount);
      console.log("left Range", leftRange);
      
      return [...leftRange, DOTS, totalPageCount];
    }

    // if (shouldShowLeftDots && !shouldShowRightDots) {
    if (shouldShowLeftDots) {
      console.log("shouldShowLeftDots");      
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      console.log("shouldShowLeftDots && shouldShowRightDots");
      console.log(middleRange);
      
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
