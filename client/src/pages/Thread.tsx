import { Box, Divider, Flex, Heading, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  useAddReplyMutation,
  useGetThreadDataQuery,
} from "../generated/graphql";
interface ThreadProps {}

interface params {
  threadId: string;
}

export const Thread: React.FC<ThreadProps> = ({}) => {
  const params: params = useParams();

  const { data, loading, error, client } = useGetThreadDataQuery({
    fetchPolicy: "network-only",
    variables: {
      id: parseInt(params.threadId!),
    },
  });

  const [repliesCount, setRepliesCount] = useState(0);
  const [showReplies, setShowReplies] = useState(false);
  const addReply = useAddReplyMutation();

  useEffect(() => {
    setRepliesCount(data?.getThread?.replies?.length!);
  }, [data?.getThread, params]);

  useEffect(() => {
    console.log(repliesCount);
    if (repliesCount > 0) {
      setTimeout(() => {
        setShowReplies(true);
      }, 400);
    }
  }, [repliesCount]);

  return (
    <Flex
      mx="auto"
      marginTop="2rem"
      p={{ base: "0.6rem", md: "1rem" }}
      boxShadow="md"
      flexDir="column"
    >
      <Heading
        p="1rem"
        textShadow="lg"
        color="#718096"
        textTransform="uppercase"
        fontSize="25px"
        // justify="center"
        // display="flex"
      >
        {data?.getThread?.question}
        <Divider marginTop="0.5rem" />
      </Heading>

      <Box>
        {showReplies === false ? (
          Array(repliesCount)
            .fill("-")
            .map((item, idx) => (
              <Skeleton key={idx} p="1rem" height="50px" my="0.6rem" />
            ))
        ) : (
          <>
            {data?.getThread &&
              data?.getThread?.replies?.map((reply, idx) => {
                return (
                  <Heading
                    key={idx}
                    as="h4"
                    p="1.5rem"
                    textShadow="md"
                    color="#718096"
                    fontSize="15px"
                    borderLeft="2px solid gray"
                    marginTop="8px"
                    bgColor="gray.50"
                    marginLeft="0.5rem"
                    pos="relative"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {reply.text}
                    <Box
                      display="flex"
                      left="1x"
                      bottom="1px"
                      p="10px"
                      bg="green.100"
                      boxShadow="md"
                    >
                      <Box mx="5px">{reply.upvotes}</Box>
                      <Box>like</Box>
                    </Box>
                  </Heading>
                );
              })}
          </>
        )}
      </Box>
    </Flex>
  );
};
