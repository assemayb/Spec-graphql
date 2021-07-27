import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
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
  const addReply = useAddReplyMutation();

  useEffect(() => {
    console.log(params);
    console.log(data?.getThread);
  }, [data?.getThread, params]);

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
                display="flex"
              >
                {reply.text} ||
                {reply.upvotes}
              </Heading>
            );
          })}
      </Box>
    </Flex>
  );
};
