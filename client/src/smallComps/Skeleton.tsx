import React from "react";
import { Box, Container } from "@chakra-ui/react";

export const Skeleton: React.FC = ({ children }) => {
  return (
    <Box padding="0.5rem" height="100vh" width="100%">
      {children}
    </Box>
  );
};
