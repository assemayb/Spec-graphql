import React from "react";
import { Container } from "@chakra-ui/react";

export const Skeleton: React.FC = ({ children }) => {
  return (
    <Container padding="2rem" margin="1rem">
      {children}
    </Container>
  );
};
