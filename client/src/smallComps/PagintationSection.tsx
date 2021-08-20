import React from "react";
import { Box, Button, Center } from "@chakra-ui/react";
import { usePagination, DOTS } from "../hooks/usePagintation";
import { BsThreeDots } from "react-icons/bs";

type PagintationProps = {
  currentPage: number;
  onPageChange: (value: number) => any;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
};

export const Pagination = (props: PagintationProps) => {
  const { onPageChange, totalCount, siblingCount, currentPage, pageSize } =
    props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })!;

  let firstPage = 1;
  let lastPage = paginationRange[paginationRange.length - 1];
  // console.log("paginationRange", paginationRange);

  if (currentPage === 0 || paginationRange.length < 2) {
    return <div></div>;
    // return null;
  }

  return (
    <Box
      display="flex"
      marginTop="10px"
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

      {paginationRange &&
        paginationRange.map((pageNumber, idx) => {
          if (pageNumber === DOTS)
            return (
              <Center key={idx}>
                <BsThreeDots size="15" />
              </Center>
            );

          return (
            <Button
              key={idx}
              borderRadius="-20px"
              bg={pageNumber === currentPage ? "green.900" : "green.400"}
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
        isDisabled={currentPage >= lastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        next
      </Button>
    </Box>
  );
};
