import { Box, Divider, Flex} from "@chakra-ui/react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {useQuery} from "@apollo/client"
import { useListTopicThreadsQuery } from "../generated/graphql";
import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";
import { topicsQuery } from "./Topics";

interface SideNavBoxProps {
  topics?: string[]
}

export const SideNavBox: React.FC<SideNavBoxProps> = ({ topics }) => {
  const router = useHistory()
  return (
    <Flex
      flex="1"
      p="0.5rem"
      flexDirection="column"
      maxH="autox"
      marginX="8px"
      shadow="base"
    >
      {topics && topics.map((topic, index) => (
        <Box
          onClick={() => {
            router.push(`/topics/${topic}`, { topics });
          }}
          key={index}
          textAlign="center"
          p="0.5rem"
          bgColor="green.200"
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

      ))}
    </Flex>
  );
};

interface SignleTopicPageProps { }
export const SignleTopicPage: React.FC<SignleTopicPageProps> = ({ }) => {
  const params: any = useParams();
  const topicsArr = useQuery(topicsQuery)
  const { data, loading } = useListTopicThreadsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      topic: params.topicName,
    },
  });

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
      <Box
        marginLeft="1rem"
        marginTop="1rem"
        fontSize="30px"
        fontFamily="fantasy"
        fontWeight="bold"
        color="gray.500"
        textShadow="lg"
        width="500px"
      >
        {`${params.topicName} Threads`}
        <Divider />
      </Box>

      <Flex marginRight="auto" marginLeft="auto" marginTop="2rem">
        <Flex
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          flex="7"
          shadow="base"
          p="1rem"
        >
          {ThreadsComp}
        </Flex>
        {topicsArr.data && (
          <SideNavBox topics={topicsArr.data.listTopics} />
        )}
      </Flex>
    </>
  );
};
