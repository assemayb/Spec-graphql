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
      position="fixed"
      width="100%"
      bottom="0"
      borderRadius="5px"
    >
        This is the footer
    </Flex>
  );
};
