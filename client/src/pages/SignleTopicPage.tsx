import { Box, Divider, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useListTopicThreadsQuery } from "../generated/graphql";
import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";

interface SignleTopicPageProps {}

export const SignleTopicPage: React.FC<SignleTopicPageProps> = ({}) => {
  const params: {
    topicName: string;
  } = useParams();
  const { data, loading } = useListTopicThreadsQuery({
    fetchPolicy: "cache-first",
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

  // useEffect(() => {
  //   console.log(data?.lisTopicThreads);
  // }, [data]);

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
        <Divider />
      </Box>

      <Flex marginRight="auto" marginLeft="auto" marginTop="2rem">
        <Flex
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          flex="4"
          shadow="base"
          p="1rem"
        >
          {ThreadsComp}
        </Flex>
      </Flex>
    </>
  );
};
