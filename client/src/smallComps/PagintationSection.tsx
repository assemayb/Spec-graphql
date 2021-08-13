import { Button, UnorderedList } from "@chakra-ui/react";
import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { usePagination, DOTS } from "../hooks/usePagintation";

interface PagintationProps {
  currentPage: number;
  onPageChange: (value: number) => any;
  totalCount: number;
  pageSize: number;
  siblingCount: number;
}

export const Pagination = (props: PagintationProps) => {
  const { onPageChange, totalCount, siblingCount, currentPage, pageSize } =
    props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })!;

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <UnorderedList display="flex" p="0.5rem" marginTop="10px">
      <li>
        <Button
          borderRadius="-20px"
          bg="green.200"
          color="white"
          isDisabled={currentPage === 5}
          onClick={onPrevious}
        >
          <BiChevronLeft size="25px" />
        </Button>
      </li>
      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            key={idx}
            // className={classnames("pagination-item", {
            //   selected: pageNumber === currentPage,
            // })}
          >
            <Button
              borderRadius="-20px"
              bg="green.400"
              color="white"
              onClick={() => onPageChange(pageNumber as any)}
            >
              {pageNumber}
            </Button>
          </li>
        );
      })}
      <li>
        <Button
          borderRadius="-20px"
          bg="green.200"
          color="white"
          isDisabled={currentPage === lastPage}
          onClick={onNext}
        >
          <BiChevronRight size="25px" />
        </Button>
      </li>
    </UnorderedList>
  );
};
