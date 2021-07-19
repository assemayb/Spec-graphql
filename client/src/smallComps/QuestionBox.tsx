import React, { useState, useEffect } from "react";

import { Box, Heading, Divider } from "@chakra-ui/react";

import { FiUser } from "react-icons/fi";
import { useMeQuery } from "../generated/graphql";

interface QuestionBoxProps {
  username: string;
  question: string;
  specializtion?: string;
  createdAt?: string;
}
export const QuestionBox: React.FC<QuestionBoxProps> = ({
  question,
  username,
  createdAt,
}) => {
  // const currentUser = useMeQuery();

  
  return (
    <Box
      pos="relative"
      width="100%"
      p="1rem"
      my="5px"
      shadow="md"
      bgColor="gray.50"
      _hover={{ bgColor: "gray.100" }}
      borderRadius="-20px"
      borderLeft="5px solid green.200"
    >
      <Heading as="h5" size="xs" color="gray.300" display="flex">
        <FiUser
          size="15px"
          // color={currentUser.data?.me?.isSpec === true ? "orange" : ""}
        />
        <Box ml="4px">{username}</Box>
      </Heading>
      <Heading
        as="h3"
        boxShadow="sm"
        size="md"
        my="5px"
        p="10px"
        fontWeight="bold"
        cursor="pointer"
        _hover={{
          color: "green.500",
        }}
      >
        {question}
      </Heading>
      <Heading
        pos="absolute"
        right="20px"
        bottom="1px"
        color="gray.200"
        fontSize="12px"
      >
        {createdAt?.substr(0, 10)}
      </Heading>
    </Box>
  );
};
