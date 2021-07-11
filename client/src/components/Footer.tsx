import React from "react";
import { Container, Flex } from "@chakra-ui/react";
export const Footer = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      p="1rem"
      marginTop="1rem"
      bgColor="green.300"
      fontSize="medium"
      fontWeight="bold"
      position="relative"
      width="100%"
      bottom="1px"
    >
        This is the footer
    </Flex>
  );
};
