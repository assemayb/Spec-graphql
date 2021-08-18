/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  useGetTopicThreadsNumLazyQuery,
  useListTopicThreadsLazyQuery,
} from "../generated/graphql";
import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";
import { HeaderComp } from "../smallComps/HeaderComp";
import { Pagination } from "../smallComps/PagintationSection";
import { SideTopicsSection } from "../smallComps/SideNavSection";

const pageSize = 3;
interface SignleTopicPageProps {}

export const SignleTopicPage: React.FC<SignleTopicPageProps> = () => {
  const params: { topicName: string } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const [getTopicThreadsNum, getTopicThreadsNumOptions] =
    useGetTopicThreadsNumLazyQuery({
      // fetchPolicy: "network-only",
      variables: {
        topic: params.topicName,
      },
    });

  const [ListTopicThreadsQuery, { data, loading, refetch }] =
    useListTopicThreadsLazyQuery({
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
      variables: {
        topic: params.topicName,
        offset: (currentPage - 1) * pageSize,
        limit: pageSize,
      },
    });

  useEffect(() => {
    let isMounted = true;
    if (isMounted === true) {
      ListTopicThreadsQuery();
      getTopicThreadsNum();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (data?.lisTopicThreads) {
      refetch!({
        topic: params.topicName,
        offset: (currentPage - 1) * pageSize,
        limit: pageSize,
      });
    }
  }, [currentPage, setCurrentPage]);

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
        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalCount={getTopicThreadsNumOptions.data?.getTopicThreadsNum!}
          pageSize={pageSize}
        />
      </>
    );
  }

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
        </Flex>
        <SideTopicsSection />
      </Flex>
    </>
  );
};
