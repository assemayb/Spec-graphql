import React, { useState, useEffect } from "react";

import { Box, Divider, Flex } from "@chakra-ui/react";



export const SortBtn: React.FC = ({ children }) => {
  return (
    <Box
      textAlign="center"
      p="0.8rem"
      bgColor="green.300"
      color="Window"
      borderRadius="-10px"
      fontWeight="bold"
      cursor="pointer"
      _hover={{
        bgColor: "green.500",
      }}
      marginY="3px"
    >
      {children}
    </Box>
  );
};
