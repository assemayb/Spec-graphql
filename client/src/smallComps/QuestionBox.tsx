import React, { useState, useEffect, useRef } from "react";

import { Box, Heading, Divider, Flex, Badge, Tooltip } from "@chakra-ui/react";

import { FiUser } from "react-icons/fi";
import { useMeQuery } from "../generated/graphql";
import { BiCommentDetail, BiDotsHorizontal, BiCog } from "react-icons/bi";

interface InteractionsSectionProps {
  repliesCount: number;
}
export const InteractionsSection: React.FC<InteractionsSectionProps> = ({
  repliesCount,
}) => {
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
      <BiCommentDetail style={{ marginRight: "3px" }} />
      <Box>{repliesCount} replies</Box>
    </Flex>
  );
};

interface QuestionBoxProps {
  username?: string;
  question: string;
  specializtion?: string;
  createdAt?: string;
  repliesCount?: number;
}
export const QuestionBox: React.FC<QuestionBoxProps> = ({
  question,
  username,
  createdAt,
  repliesCount,
  specializtion,
}) => {
  // const currentUser = useMeQuery();

  return (
    <Box
      pos="relative"
      width="100%"
      p={username ? "1.2rem" : "14px"}
      my="5px"
      shadow={username ? "md" : "sm"}
      bgColor="gray.200"
      _hover={{
        bgColor: "gray.400",
        borderRadius: "-30px",
      }}
      borderRadius="-20px"
      borderLeft="5px solid green.200"
    >
      {username && (
        <Heading as="h5" size="xs" color="gray.400" display="flex">
          <FiUser size="15px" />
          <Box ml="4px">{username}</Box>
        </Heading>
      )}
      <Heading
        as="h3"
        boxShadow="sm"
        size="md"
        my="5px"
        marginLeft="2rem"
        p="10px"
        pos="relative"
        cursor="pointer"
        color="blackAlpha.700"
        fontSize="xl"
        _hover={{
          color: "green.600",
        }}
      >
        {question}

        <Badge
          variant="subtle"
          colorScheme="green"
          pos="absolute"
          p="0.3rem"
          right="2px"
          top="0.1rem"
          fontSize="0.8rem"
          // fontFamily="cursive"
          opacity="0.7"
        >
          {specializtion}
        </Badge>
      </Heading>
      {!username && (
        <Tooltip label="thread oprtions" aria-label="A tooltip">
          <Box pos="absolute" top="0px" right="1px">
            <BiDotsHorizontal color="gray" size="1.3rem" cursor="pointer" />
          </Box>
        </Tooltip>
      )}
      <InteractionsSection repliesCount={repliesCount!} />
      <Heading pos="absolute" right="20px" color="gray.400" fontSize="12px">
        {createdAt !== null && createdAt?.substr(0, 10)}
      </Heading>
    </Box>
  );
};
