import { Box, Flex } from "@chakra-ui/react";
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useListTopicThreadsLazyQuery } from "../generated/graphql";
import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";
import { topicsQuery } from "./Topics";
import { HeaderComp } from "../smallComps/HeaderComp";

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
  const params: any = useParams();
  const topicsArr = useQuery(topicsQuery);
  const [ListTopicThreadsQuery, { data, loading }] = useListTopicThreadsLazyQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      topic: params.topicName,
    },
  });

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
            />
          );
        })}
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
        {topicsArr.data && <SideNavBox topics={topicsArr.data.listTopics} />}
      </Flex>
    </>
  );
};
