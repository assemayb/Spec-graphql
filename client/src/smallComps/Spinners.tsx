import React from "react";
import { Spinner } from "@chakra-ui/react";

export const SmallSpinner = () => {
  return <Spinner size="md" color="green.400" thickness="3px" />;
};

export const FastBigSpinner = () => {
  return (
    <Spinner
      border="1px solid black"
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="green.500"
      size="xl"
    />
  );
};
