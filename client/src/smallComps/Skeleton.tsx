import React from "react";
import { Box } from "@chakra-ui/react";

export const Skeleton: React.FC = ({ children }) => {
  return (
    <Box padding="1.5rem" minHeight="100vh" width="100%">
      {children}
    </Box>
  );
};
