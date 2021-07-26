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

  return (
    <Box
      pos="relative"
      width="100%"
      p={username ? "0.8rem" : "0.6rem"}
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
        // as="h3"
        boxShadow="sm"
        size="md"
        my="5px"
        marginLeft={["0.1rem", "0.4rem", "1rem", "2rem"]}
        p={["2px", "2px","10px", "10px"]}
        pos="relative"
        cursor="pointer"
        color="blackAlpha.700"
        // maxW={{
        //   base: "180px",
        //   "lg": "auto"
        // }}
        textOverflow='ellipsis'
        fontSize={["10px", "16px", "large", "xl"]}
        _hover={{
          color: "green.600",
        }}
      >
        {question}
        {!fromTopicPage && (
          <Badge
            variant="subtle"
            colorScheme="green"
            pos="absolute"
            p="0.1rem"
            right="2px"
            top={username ? "0.1rem" : "1.2rem"}
            fontSize={["0.5rem", "0.5rem", "0.5rem","0.7rem"]}
            opacity="0.7"
          >
            {specializtion}
          </Badge>
        )}
      </Heading>
      {!username &&(
        <OptionsPopover
          showThreadOptions={showThreadOptions}
          setShowThreadOptions={setShowThreadOptions!}
          refetch={refetchProfileThreads!}
          threadId={threadId!}
        >
          <Box
            as="button"
            onClick={() => {
              if (setShowThreadOptions !== undefined) {
                setShowThreadOptions(true);
              }
            }}
            pos="absolute"
            top="0px"
            right="1px"
          >
            {/* <Tooltip
              label="thread oprtions"
              aria-label="thread oprtions tooltip"
            > */}
              <div>
                <BiDotsHorizontal color="gray" size="1.3rem" cursor="pointer" />
              </div>
            {/* </Tooltip> */}
          </Box>
        </OptionsPopover>
      )}
      {username && (
        <>
          <InteractionsSection repliesCount={repliesCount!} />
          <Heading pos="absolute" right="20px" color="gray.400" fontSize={["8px", "8px", "10px","12px"]}>
            {createdAt !== null && createdAt?.substr(0, 10)}
          </Heading>
        </>
      )}
    </Box>
  );
};
