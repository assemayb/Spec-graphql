import React from "react";
import { Spinner } from "@chakra-ui/react";

export const SmallSpinner = () => {
  return <Spinner size="md" color="green.400" thickness="3px" />;
};

export const FastBigSpinner = () => {
  return (
    <Spinner
      thickness="8px"
      speed="0.8s"
      emptyColor="gray.200"
      color="green.500"
      size="xl"
    />
  );
};
