import React from "react";

import { Box, Heading, Badge, Flex, Button } from "@chakra-ui/react";

import { FiUser } from "react-icons/fi";
import { BiRightArrowAlt } from "react-icons/bi";
import {
  ListUserThreadsQuery,
  useDeleteThreadMutation,
  useListUserThreadsLazyQuery,
} from "../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { InteractionsSection } from "../smallComps/InteractionsSection";
import { FiTrash2 } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

interface QuestionBoxProps {
  threadId?: number;
  username?: string;
  question: string;
  specializtion?: string;
  createdAt?: string;
  repliesCount?: number;
  showThreadOptions?: boolean;
  fromTopicPage?: boolean;
  fromSingleTopicPage?: boolean;
  fromUserPage?: boolean;
  setShowThreadOptions?: React.Dispatch<React.SetStateAction<boolean>>;
  // refetchProfileThreads?: () => Promise<
  //   ApolloQueryResult<ListUserThreadsQuery>
  // >;
  refetchProfileThreads?: () => any;
  setTriggerReloadInProfilePage?: React.Dispatch<React.SetStateAction<boolean>>;
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
  fromSingleTopicPage,
  fromUserPage,
  setShowThreadOptions,
  refetchProfileThreads,
  setTriggerReloadInProfilePage,
}) => {
  const router = useHistory();
  const [deleteReq] = useDeleteThreadMutation();
  const deleteThread = async () => {
    await deleteReq({
      variables: {
        id: threadId!,
      },
    });
    setTimeout(() => window.location.reload(), 250);
  };

  const goToThread = () => {
    router.push(`/threads/${threadId}`);
  };

  return (
    <Box
      pos="relative"
      width="100%"
      p={username ? "1rem" : "0.5rem"}
      my="5px"
      shadow={username ? "md" : "sm"}
      bgColor="gray.100"
      _hover={{
        bgColor: "gray.200",
      }}
      borderRadius="-20px"
    >
      {username && (
        <Heading
          fontSize={{
            base: "10px",
            md: "1rem",
          }}
          color="gray.400"
          display="flex"
          alignItems="center"
        >
          <FiUser />
          <Link to={`/profiles/${username}`}>
            <Box ml="4px">{username}</Box>
          </Link>
        </Heading>
      )}

      <Heading
        as="button"
        w="100%"
        onClick={() => goToThread()}
        boxShadow="sm"
        cursor="pointer"
        marginTop="0.7rem"
        marginLeft="5px"
        marginBottom="0.6rem"
        p={["0.4rem", "0.4rem", "1.4rem", "1.4rem"]}
        pos="relative"
        borderRadius="-25px"
        textShadow="md"
        textAlign="left"
        color="#718096"
        textOverflow="ellipsis"
        fontSize={["13px", "16px", "large", "22px"]}
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
          right="1px"
          top="1px"
          fontSize={["0.5rem", "0.5rem", "0.5rem", "0.7rem"]}
          opacity="0.7"
        >
          {specializtion}
        </Badge>
      )}

      {!username && (
        <Flex marginLeft="6px" p="0.2rem" marginTop="6px">
          {!fromUserPage && (
            <Button
              onClick={() => deleteThread()}
              bgColor="whiteAlpha.600"
              width={{
                base: "80px",
                md: "120px",
              }}
              p={{
                base: "0.4rem",
                md: "1rem",
              }}
              height={{
                base: "25px",
                md: "40px",
              }}
              fontSize={{
                base: "10px",
                md: "1rem",
              }}
              borderRadius="-10px"
              _hover={{
                bgColor: "green.200",
                color: "white",
              }}
            >
              <FiTrash2 style={{ marginRight: "5px" }} />
              delete
            </Button>
          )}
          <Button
            onClick={() => goToThread()}
            bgColor="whiteAlpha.600"
            maxWidth={{
              base: "120px",
              md: "180px",
            }}
            fontSize={{
              base: "10px",
              md: "1rem",
            }}
            height={{
              base: "25px",
              md: "40px",
            }}
            borderRadius="-10px"
            marginLeft="4px"
            p={{
              base: "0.4rem",
              md: "1rem",
            }}
            _hover={{
              bgColor: "green.200",
              color: "white",
            }}
          >
            go to thread
            <BiRightArrowAlt style={{ marginLeft: "5px" }} />
          </Button>
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
