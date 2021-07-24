import { Box, Divider, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useListTopicThreadsQuery } from "../generated/graphql";
import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";

interface SideNavBoxProps {
  topics?: string[]
}
export const SideNavBox: React.FC<SideNavBoxProps> = ({topics}) => {
  return (
    <Flex
      flex="1"
      p="0.5rem"
      flexDirection="column"
      maxH="500px"
      marginX="8px"
      shadow="base"
    >
      {topics && topics.map((topic, index) => (
      <Box
        key={index}
        textAlign="center"
        p="1rem"
        bgColor="yellow.200"
        color="Window"
        borderRadius="-20px"
        cursor="pointer"
        _hover={{
          bgColor: "orange.200",
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
  const { data, loading } = useListTopicThreadsQuery({
    fetchPolicy: "cache-first",
    variables: {
      topic: params.topicName,
    },
  });

  useEffect(() => {
    console.log(Object.entries(params));
  })

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
          flex="4"
          shadow="base"
          p="1rem"
        >
          {ThreadsComp}
        </Flex>
        <SideNavBox />
      </Flex>
    </>
  );
};
