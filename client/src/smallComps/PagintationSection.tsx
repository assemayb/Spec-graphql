import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { usePagination, DOTS } from "../hooks/usePagintation";

type PagintationProps  = {
  currentPage: number;
  onPageChange: (value: number) => any;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
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

  let firstPage = 1
  let lastPage = paginationRange[paginationRange.length - 1];
  
  React.useEffect(() => {
    console.log("currentPage", currentPage);
    console.log("paginationRange", paginationRange);

  }, [paginationRange, totalCount, currentPage]);

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <Box
      display="flex"
      p="1rem"
      bg="green.50"
      marginTop="10px"
      boxShadow="inner"
    >
      <Button
        borderRadius="-15px"
        bg="green.300"
        marginX="2px"
        color="white"
        isDisabled={currentPage === firstPage}
        onClick={() => onPageChange(currentPage - 1)}
      >
        previous
      </Button>

      {paginationRange && paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return <li key={idx}>&#8230;</li>;
        }

        return (
          <Button
            key={idx}
            borderRadius="-20px"
            bg={pageNumber === currentPage ? "blue.700" : "green.400"}
            color="white"
            marginX="2px"
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </Button>
        );
      })}
      <Button
        borderRadius="-15px"
        bg="green.300"
        color="white"
        marginX="2px"
        isDisabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {/* <BiChevronRight size="25px" /> */}
        next
      </Button>
    </Box>
  );
};
