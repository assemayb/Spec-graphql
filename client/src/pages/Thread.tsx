/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Tooltip,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
  useGetThreadDataLazyQuery,
  useGetThreadDataQuery,
  useIsUserLoggedInLazyQuery,
} from "../generated/graphql";
import { LikeSection } from "../smallComps/LikeSection";
import { SortingButtonsSection } from "../smallComps/ThreadSortingBtns";
import { AddReplyModal } from "../smallComps/AddReplyModal";

interface HeaderSectionProps {
  question: string;
}
export const HeaderSection: React.FC<HeaderSectionProps> = ({ question }) => {
  return (
    <Heading
      p={{
        base: "0.5rem",
        md: "1rem",
      }}
      textShadow="lg"
      color="#718096"
      textTransform="uppercase"
      fontSize={{
        base: "20px",
        md: "25px",
      }}
    >
      {question}
      <Divider marginTop="1rem" />
    </Heading>
  );
};

interface ThreadProps {}
export const Thread: React.FC<ThreadProps> = () => {
  const params: {
    threadId: string;
  } = useParams();
  const [isUserLoggedInLazyQuery, isUserLoggedInLazyQueryData] =
    useIsUserLoggedInLazyQuery({
      fetchPolicy: "network-only",
    });

  // const { data, refetch } = useGetThreadDataQuery({
  const [getThreadDataQuery, { data, refetch }] = useGetThreadDataLazyQuery({
    fetchPolicy: "network-only",
    variables: {
      id: parseInt(params.threadId!),
      sortBy: "recent",
    },
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted === true) {
      getThreadDataQuery();
      isUserLoggedInLazyQuery();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // useEffect(() => {
  //   let isMounted = true;
  //   if (isMounted) {
  //     isUserLoggedInLazyQuery();
  //   }
  //   return () => {
  //     isMounted = false;
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const fetchByUpvotes = () =>
    refetch!({
      id: parseInt(params.threadId!),
      sortBy: "upvotes",
    });

  const refetchByDate = () => {
    refetch!({
      id: parseInt(params.threadId!),
      sortBy: "recent",
    });
  };
  const [repliesCount, setRepliesCount] = useState(0);
  const [showReplies, setShowReplies] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const addNewReply = () => {
    const isUserLoggedIn: boolean =
      isUserLoggedInLazyQueryData.data?.isUserLoggedIn === true;
    if (isUserLoggedIn) {
      return setShowModal(true);
    }
    const profileBtn: HTMLElement = document.getElementById("profile-btn")!;
    profileBtn.click();
  };

  return (
    <Flex
      mx="auto"
      marginTop="2rem"
      p={{ base: "0.6rem", md: "1rem" }}
      boxShadow="md"
      flexDir="column"
    >
      <AddReplyModal
        setShowModal={setShowModal}
        showModal={showModal}
        threadId={parseInt(params.threadId!)}
        refetch={refetchByDate}
      />
      <Flex align="center" justify="space-between" p="1.5rem">
        <HeaderSection question={data?.getThread?.question!} />
        <Tooltip label="Add a reply to this thread">
          <Flex
            onClick={() => addNewReply()}
            bg="green.300"
            cursor="pointer"
            color="white"
            p="0.6rem"
            marginBottom="0.8rem"
            opacity="0.80"
            boxShadow="lg"
            borderRadius="-10px"
            _hover={{
              bg: "green.500",
              opacity: "1",
            }}
            fontWeight="bold"
          >
            <Center>add reply</Center>
            {/* <BiCommentAdd size="30px"/> */}
          </Flex>
        </Tooltip>
      </Flex>
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
                    marginTop="12px"
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
