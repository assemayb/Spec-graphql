import React, { useState, useEffect, useRef } from "react";

import { Box, Heading, Divider, Flex } from "@chakra-ui/react";

import { FiUser } from "react-icons/fi";
import { useMeQuery } from "../generated/graphql";
import {BiCommentDetail} from "react-icons/bi"

interface InteractionsSectionProps {}
export const InteractionsSection = () => {
  return (
    <Flex
      p="0.2rem"
      justiy="center"
      align="center"
      pos="absolute"
      left="25px"
      bottom="1px"
      color="gray.400"
      fontSize="10px"
      marginTop="4px"
      fontWeight="bold"
    >
      <BiCommentDetail  style={{marginRight: "3px"}}/>
      12 replies
    </Flex>
  );
};

interface QuestionBoxProps {
  username?: string;
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
      p={username ? "1.2rem" : "14px"}
      my="5px"
      shadow={username ? "md" : "sm"}
      bgColor="gray.100"
      _hover={{ bgColor: "gray.300", borderRadius: "-30px" }}
      borderRadius="-20px"
      borderLeft="5px solid green.200"
    >
      {username && (
        <Heading as="h5" size="xs" color="gray.400" display="flex">
          <FiUser
            size="15px"
            // color={currentUser.data?.me?.isSpec === true ? "orange" : ""}
          />
          <Box ml="4px">{username}</Box>
        </Heading>
      )}
      <Heading
        as="h3"
        boxShadow="sm"
        size="md"
        my="5px"
        marginLeft="10px"
        p="10px"
        // fontWeight="bold"
        cursor="pointer"
        color="blackAlpha.700"
        fontSize="xl"
        _hover={{
          color: "green.600",
        }}
      >
        {question}
      </Heading>
      <InteractionsSection />
      <Heading
        pos="absolute"
        right="20px"
        bottom="1px"
        color="gray.400"
        fontSize="12px"
      >
        {createdAt !== null && createdAt?.substr(0, 10)}
      </Heading>
    </Box>
  );
};
