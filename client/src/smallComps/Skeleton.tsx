import React from "react";
import { Box } from "@chakra-ui/react";

export const Skeleton: React.FC = ({ children }) => {
  return (
    // <Box padding="1.5rem" minHeight="100vh" width="100%">
    <Box width="100%" minH="100vh" padding="1.5rem">
      {children}
    </Box>
  );
};
