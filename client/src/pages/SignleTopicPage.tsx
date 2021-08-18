import { Box, Flex } from "@chakra-ui/react";
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useListTopicThreadsLazyQuery } from "../generated/graphql";
import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";
import { topicsQuery } from "./Topics";
import { HeaderComp } from "../smallComps/HeaderComp";
import { Pagination } from "../smallComps/PagintationSection";

interface SideNavBoxProps {
  topics?: string[];
}

export const SideNavBox: React.FC<SideNavBoxProps> = ({ topics }) => {
  const router = useHistory();

  return (
    <Flex
      flex="1"
      p="0.5rem"
      flexDirection="column"
      h="auto"
      marginX="8px"
      shadow="base"
    >
      {topics &&
        topics.map((topic, index) => {
          return (
            <Box
              as="button"
              onClick={() => {
                router.push(`/topics/${topic}`, { topics });
              }}
              key={index}
              textAlign="center"
              p="0.5rem"
              bgColor="green.300"
              color="white"
              borderRadius="-20px"
              cursor="pointer"
              _hover={{
                bgColor: "blue.200",
              }}
              marginY="3px"
            >
              <Flex justify="center" align="center">
                {topic}
              </Flex>
            </Box>
          );
        })}
    </Flex>
  );
};

interface SignleTopicPageProps {}
export const SignleTopicPage: React.FC<SignleTopicPageProps> = () => {
  const params: { topicName: string } = useParams();
  const topicsArr = useQuery(topicsQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [ListTopicThreadsQuery, { data, loading, refetch }] =
    useListTopicThreadsLazyQuery({
      fetchPolicy: "cache-and-network",
      variables: {
        topic: params.topicName,
        offset: (currentPage - 1) * 3,
        limit: 3,
      },
    });

  useEffect(() => {
    if (data?.lisTopicThreads) {
      refetch!({
        topic: params.topicName,
        offset: (currentPage - 1) * 3,
        limit: 3,
      });
    }
  }, [currentPage, setCurrentPage]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted === true) {
      ListTopicThreadsQuery();
    }
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let ThreadsComp: any = null;
  if (loading) {
    ThreadsComp = <FastBigSpinner />;
  } else if (data) {
    ThreadsComp = (
      <>
        {data.lisTopicThreads?.map((thread, idx) => {
          return (
            <QuestionBox
              key={idx}
              fromTopicPage={true}
              question={thread.question}
              threadId={thread.id}
              username={thread.threadCreator}
              createdAt={thread.createdAt}
              repliesCount={thread.replies?.length}
              fromSingleTopicPage={true}
            />
          );
        })}
      </>
    );
  }

  let PaginationSection = (
    <>
      {data?.lisTopicThreads && (
        <Pagination
          pageSize={3}
          currentPage={currentPage}
          totalCount={data.lisTopicThreads?.length}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );

  return (
    <>
      <HeaderComp header={`${params.topicName} Threads`} />

      <Flex marginRight="auto" marginLeft="auto" marginTop="2rem">
        <Flex
          flexDirection="column"
          alignItems="center"
          flex="7"
          shadow="base"
          p="1rem"
        >
          {ThreadsComp}
          {PaginationSection}
        </Flex>
        {topicsArr.data && <SideNavBox topics={topicsArr.data.listTopics} />}
      </Flex>
    </>
  );
};
