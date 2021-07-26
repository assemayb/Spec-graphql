import React, { useState } from "react";

import { Box, Heading, Badge, Tooltip, Flex, Button } from "@chakra-ui/react";

import { FiUser } from "react-icons/fi";
import { BiDotsHorizontal } from "react-icons/bi";
import {
  ListUserThreadsQuery,
  useDeleteThreadMutation,
} from "../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { OptionsPopover } from "../smallComps/OptionsPopover";
import { InteractionsSection } from "../smallComps/InteractionsSection";
import { FiTrash2 } from "react-icons/fi";

interface QuestionBoxProps {
  threadId?: number;
  username?: string;
  question: string;
  specializtion?: string;
  createdAt?: string;
  repliesCount?: number;
  showThreadOptions?: boolean;
  fromTopicPage?: boolean;
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
  fromTopicPage,
  setShowThreadOptions,
  refetchProfileThreads,
}) => {
  // const currentUser = useMeQuery();

  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const [deleteReq] = useDeleteThreadMutation({
    update: () => {
      refetchProfileThreads!();
    },
  });

  const deleteThread = () => {
    deleteReq({
      variables: {
        id: threadId!,
      },
    });
  };

  const handleThreadQuestionClick = () => {
    console.log("editinnggg");
    setCurrentlyEditing(true);
  };

  return (
    <Box
      pos="relative"
      width="100%"
      p={username ? "1rem" : "0.8rem"}
      my="5px"
      shadow={username ? "md" : "sm"}
      bgColor="gray.200"
      _hover={{
        bgColor: "gray.400",
        borderRadius: "-30px",
      }}
      borderRadius="-20px"
    >
      {username && (
        <Heading size="6px" color="gray.400" display="flex" alignItems="center">
          <FiUser />
          <Box ml="4px">{username}</Box>
        </Heading>
      )}
      <Heading
        onClick={() => handleThreadQuestionClick()}
        boxShadow="sm"
        marginTop="0.7rem"
        marginLeft="5px"
        p={["0.4rem", "0.4rem", "1.4rem", "1.4rem"]}
        pos="relative"
        borderRadius="5px"
        // cursor="pointer"
        bgColor="whiteAlpha.400"
        color="blackAlpha.700"
        textOverflow="ellipsis"
        fontSize={["10px", "16px", "large", "xl"]}
        _hover={{
          color: "green.600",
        }}
      >
        {question}
      </Heading>
      {!fromTopicPage && (
        <Badge
          variant="subtle"
          colorScheme="green"
          pos="absolute"
          p="0.1rem"
          right="5px"
          top="2px"
          fontSize={["0.5rem", "0.5rem", "0.5rem", "0.7rem"]}
          opacity="0.7"
        >
          {specializtion}
        </Badge>
      )}

      {!username && (
        <Flex align="center" marginLeft="6px" p="0.3rem" marginTop="6px">
          <Button
            onClick={() => deleteThread()}
            bgColor="whiteAlpha.600"
            width="100px"
            height="30px"
            borderRadius="-10px"
          >
            <FiTrash2 style={{ marginRight: "5px" }} />
            delete
          </Button>
          {currentlyEditing ? (
            <Button
              bgColor="whiteAlpha.600"
              width="100px"
              height="30px"
              marginLeft="1rem"
              borderRadius="-10px"
            >
              save
            </Button>
          ) : (
            <Button
              bgColor="whiteAlpha.600"
              width="100px"
              height="30px"
              marginLeft="1rem"
              borderRadius="-10px"
            >
              edit
            </Button>
          )}
        </Flex>
      )}
      {username && (
        <>
          <InteractionsSection repliesCount={repliesCount!} />
          <Heading
            pos="absolute"
            right="20px"
            color="gray.400"
            fontSize={["8px", "8px", "10px", "12px"]}
          >
            {createdAt !== null && createdAt?.substr(0, 10)}
          </Heading>
        </>
      )}
    </Box>
  );
};
