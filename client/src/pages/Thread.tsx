import React, { useEffect, useState } from "react";
import { Box, Divider, Flex, Heading, Skeleton } from "@chakra-ui/react";
import { BiLike } from "react-icons/bi";
import { useParams, useLocation } from "react-router-dom";
import {
  useAddReplyMutation,
  useGetThreadDataQuery,
  useUpvoteReplyMutation,
} from "../generated/graphql";
interface ThreadProps {}

interface params {
  threadId: string;
}

export const Thread: React.FC<ThreadProps> = ({}) => {
  const params: params = useParams();

  const { data, loading, refetch } = useGetThreadDataQuery({
    fetchPolicy: "network-only",
    variables: {
      id: parseInt(params.threadId!),
    },
  });

  const [addReplyReq, { client }] = useUpvoteReplyMutation();

  const [repliesCount, setRepliesCount] = useState(0);
  const [showReplies, setShowReplies] = useState(false);

  const upvoteReply = async (id: any) => {
    await addReplyReq({
      variables: { id },
    });
    await refetch();
  };
  useEffect(() => {
    setRepliesCount(data?.getThread?.replies?.length!);
    console.log(data?.getThread);
  }, [data?.getThread, params]);

  useEffect(() => {
    console.log(repliesCount);
    if (repliesCount > 0) {
      setTimeout(() => {
        setShowReplies(true);
      }, 200);
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
                    p="1.2em"
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
                    <Box display="flex" left="1x" bottom="1px">
                      <Box
                        as="button"
                        onClick={() => upvoteReply(reply.id)}
                        borderRadius="-20px"
                        p="10px"
                        bg="green.50"
                        _hover={{
                          bg: "blue.300",
                          color: "white",
                        }}
                        boxShadow="md"
                        marginRight="3px"
                      >
                        <BiLike size="15px" />
                      </Box>
                      <Box
                        _hover={{
                          bg: "blue.300",
                          color: "white",
                        }}
                        p="10px"
                        bg="green.100"
                        boxShadow="md"
                        mx="3px"
                        borderRadius="-20px"
                      >
                        {reply.upvotes} likes
                      </Box>
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
