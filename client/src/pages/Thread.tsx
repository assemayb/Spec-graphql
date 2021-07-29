import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetThreadDataQuery } from "../generated/graphql";
import { LikeSection } from "../smallComps/LikeSection";
import { SortingButtonsSection } from "../smallComps/ThreadSortingBtns";

interface HeaderSectionProps {
  question: string;
}
export const HeaderSection: React.FC<HeaderSectionProps> = ({ question }) => {
  return (
    <Heading
      p="1rem"
      textShadow="lg"
      color="#718096"
      textTransform="uppercase"
      fontSize="25px"
    >
      {question}
      <Divider marginTop="0.5rem" />
    </Heading>
  );
};

interface ThreadProps {}
export const Thread: React.FC<ThreadProps> = () => {
  const params: {
    threadId: string;
  } = useParams();
  const { data, refetch } = useGetThreadDataQuery({
    fetchPolicy: "network-only",
    variables: {
      id: parseInt(params.threadId!),
      sortBy: "recent",
    },
  });
  const fetchByUpvotes = () =>
    refetch({
      id: parseInt(params.threadId!),
      sortBy: "upvotes",
    });

  const refetchByDate = () => {
    refetch({
      id: parseInt(params.threadId!),
      sortBy: "recent",
    });
  };
  const [repliesCount, setRepliesCount] = useState(0);
  const [showReplies, setShowReplies] = useState(false);

  useEffect(() => {
    setRepliesCount(data?.getThread?.replies?.length!);
  }, [data?.getThread, params]);

  useEffect(() => {
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
      <HeaderSection question={data?.getThread?.question!} />
      <Box>
        {showReplies === false ? (
          Array(repliesCount)
            .fill("-")
            .map((item, idx) => (
              <Skeleton key={idx} p="1rem" height="50px" my="0.6rem" />
            ))
        ) : (
          <>
            <SortingButtonsSection
              fetchByUpvotes={fetchByUpvotes}
              refetchByDate={refetchByDate}
            />
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
                    borderLeft="4px solid gray"
                    marginTop="8px"
                    bgColor="gray.50"
                    _hover={{
                      bgColor: "gray.100",
                      textShadow: "lg",
                    }}
                    marginLeft="0.5rem"
                    pos="relative"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {reply.text}
                    <LikeSection
                      refetch={refetchByDate}
                      replyId={reply.id}
                      upvotes={reply.upvotes}
                    />
                  </Heading>
                );
              })}
          </>
        )}
      </Box>
    </Flex>
  );
};
