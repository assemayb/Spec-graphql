import React from "react";
import { Flex } from "@chakra-ui/react";
export const Footer = () => {
  return (
    <Flex
      id="footer"
      justifyContent="center"
      alignItems="center"
      p="1rem"
      marginTop="1rem"
      bgColor="green.300"
      fontSize="medium"
      fontWeight="bold"
      color="white"
      width="100%"
    >
      This is the footer
    </Flex>
  );
};
