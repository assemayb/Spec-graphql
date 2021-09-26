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
import { useParams, useLocation } from "react-router-dom";
import {
  useGetThreadDataLazyQuery,
  useIsUserLoggedInLazyQuery,
  useIsUserLoggedInQuery,
  useListUserLikedRepliesLazyQuery,
  useMeLazyQuery,
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
        md: "1.2rem",
      }}
      textShadow="lg"
      color="#718096"
      textTransform="uppercase"
      fontSize={{
        base: "20px",
        md: "25px",
      }}
    // bgColor="green.50"
    >
      {question}
      <Divider marginTop="0.6rem" />
    </Heading>
  );
};

interface ThreadProps { }
export const Thread: React.FC<ThreadProps> = () => {
  const params: { threadId: string } = useParams();
  const [userLoggedInCheck, userLoggedInCheckOptions] = useIsUserLoggedInLazyQuery({ fetchPolicy: "no-cache" })

  useEffect(() => {
    let mounted = true
    mounted === true && userLoggedInCheck()
    return () => { mounted = false }
  }, [])

  const [isUserLoggedInLazyQuery, isUserLoggedInLazyQueryData] =
    useIsUserLoggedInLazyQuery({
      fetchPolicy: "network-only",
    });
  const [meQuery, meQueryoptions] = useMeLazyQuery({
    fetchPolicy: "network-only",
  });
  const isLoggedUserSpec = meQueryoptions.data?.me?.isSpec!;

  const [getThreadDataQuery, { data, refetch }] = useGetThreadDataLazyQuery({
    fetchPolicy: "network-only",
    variables: {
      id: parseInt(params.threadId!),
      sortBy: "upvotes",
    },
  });
  const [listLikedReplies, listLikedRepliesOptions] = useListUserLikedRepliesLazyQuery({ fetchPolicy: "network-only" });

  useEffect(() => {
    setShowReplies((prev) => !prev);
    setShowReplies((prev) => !prev);
  }, [listLikedRepliesOptions.refetch, listLikedRepliesOptions.data]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted === true) {
      const isUserLogged = userLoggedInCheckOptions.data?.isUserLoggedIn
      if (isUserLogged === true) {
        listLikedReplies();
        meQuery();
        isUserLoggedInLazyQuery();
      }
      getThreadDataQuery();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const fetch = (type: string) => {
    refetch!({
      id: parseInt(params.threadId!),
      sortBy: type,
    });
  }
  const fetchByUpvotes = () => fetch("upvotes")
  const refetchByDate = () => fetch("recent")

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
      }, 100);
    }
  }, [repliesCount]);


  const { state }: any = useLocation()
  useEffect(() => {
    if (state) {
      const passedReply = state.repID
      setTimeout(() => {
        console.log(passedReply);
      }, 2000)
    }
  }, [state])


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
        {isLoggedUserSpec && (
          <Tooltip label="Add a reply to this thread">
            <Flex
              as="button"
              onClick={() => addNewReply()}
              bg="green.300"
              cursor="pointer"
              color="white"
              p="0.6rem"
              marginBottom="0.8rem"
              opacity="0.80"
              boxShadow="lg"
              marginLeft="0.7rem"
              borderRadius="-10px"
              _hover={{
                bg: "green.500",
                opacity: "1",
              }}
              fontWeight="bold"
            >
              <Center>add reply</Center>
            </Flex>
          </Tooltip>
        )}
      </Flex>
      <Box>
        {showReplies === false ? (
          Array(repliesCount)
            .fill("-")
            .map((_, idx) => (
              <Skeleton key={idx} p="1.5em" height="50px" marginTop="12px" />
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
                    // as="h4"
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
                      likedRepliesIds={
                        listLikedRepliesOptions.data?.listUserLikedReplies!
                      }
                      refetchLikedReplies={listLikedRepliesOptions.refetch}
                      refetch={fetchByUpvotes}
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
