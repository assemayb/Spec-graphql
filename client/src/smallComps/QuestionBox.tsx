import React from "react";

import { Box, Heading, Badge, Tooltip } from "@chakra-ui/react";

import { FiUser } from "react-icons/fi";
import { BiDotsHorizontal } from "react-icons/bi";
import { ListUserThreadsQuery } from "../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { OptionsPopover } from "../smallComps/OptionsPopover";
import { InteractionsSection } from "../smallComps/InteractionsSection";

interface QuestionBoxProps {
  threadId?: number;
  username?: string;
  question: string;
  specializtion?: string;
  createdAt?: string;
  repliesCount?: number;
  showThreadOptions?: boolean;
  setShowThreadOptions?: React.Dispatch<React.SetStateAction<boolean>>;
  refetchProfileThreads?: () => Promise<
    ApolloQueryResult<ListUserThreadsQuery>
  >;
}
export const QuestionBox: React.FC<QuestionBoxProps> = ({
  threadId,
  question,
  username,
  createdAt,
  repliesCount,
  specializtion,
  showThreadOptions,
  setShowThreadOptions,
  refetchProfileThreads,

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
          p="0.2rem"
          right="2px"
          top={username ? "0.1rem" : "1.2rem"}
          fontSize="0.7rem"
          opacity="0.7"
        >
          {specializtion}
        </Badge>
      </Heading>
      {!username && (
        <Tooltip label="thread oprtions" aria-label="A tooltip">
          <OptionsPopover
          setShowThreadOptions={setShowThreadOptions}
          refetch={refetchProfileThreads!} threadId={threadId!}>
            <Box
              as="button"
              onClick={() => {
                if (setShowThreadOptions) {
                  setShowThreadOptions((prevVal) => !prevVal);
                }
              }}
              pos="absolute"
              top="0px"
              right="1px"
            >
              <BiDotsHorizontal color="gray" size="1.3rem" cursor="pointer" />
            </Box>
          </OptionsPopover>
        </Tooltip>
      )}
      {username && (
        <>
          <InteractionsSection repliesCount={repliesCount!} />
          <Heading pos="absolute" right="20px" color="gray.400" fontSize="12px">
            {createdAt !== null && createdAt?.substr(0, 10)}
          </Heading>
        </>
      )}
    </Box>
  );
};
