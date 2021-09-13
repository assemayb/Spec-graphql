import React, { useEffect, useState, useLayoutEffect } from "react";
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
  const [showNumberedSection, setShowNumberedSection] = useState(() => {
    if (window.innerWidth < 800)  return false;
    if (window.innerWidth > 800)  return true;
  });

  useLayoutEffect(() => {
    const setterFunc = () => {
      if (window.innerWidth < 800) {
        setShowNumberedSection(false)
      } else {
        setShowNumberedSection(true)
      }
    };
    window.addEventListener("resize", setterFunc);
    return () => {
      window.removeEventListener("resize", setterFunc);
    };
  }, []);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })!;

  let firstPage = 1;
  let lastPage = paginationRange &&  paginationRange[paginationRange.length - 1];
  

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return <div></div>;
    // return null;
  }

  return (
    <Box display="flex" marginTop="10px" width="auto">
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

      {showNumberedSection === true &&
        paginationRange &&
        paginationRange.map((pageNumber: any, idx: number) => {
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
              fontSize="1rem"
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
