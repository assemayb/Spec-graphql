import React, { useState, useEffect } from "react";
import {
  useIsUserLoggedInQuery,
  useListThreadsQuery,
} from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { Box, Divider, Flex } from "@chakra-ui/react";

import { QuestionForm } from "../smallComps/QuestionForm";
import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";
import { SortBtn } from "../smallComps/SortBtn";
import { BiBarChartAlt } from "react-icons/bi";
import { FiClock } from "react-icons/fi";

interface HomeProps {}
export const Home: React.FC<RouteComponentProps> = ({ history, location }) => {
  const [threadsHeader, setThreadsHeader] = useState("Most trendy threads");
  const { data, loading, error, refetch } = useListThreadsQuery({
    fetchPolicy: "cache-first",
    variables: {
      sortBy: threadsHeader.split(" ")[1],
    },
  });

  useEffect(() => {
    console.log(data?.listThreads);
  }, [data]);

  
  let ThreadsComp: any = null;
  if (loading) {
    ThreadsComp = <FastBigSpinner />;
  } else if (data) {
    ThreadsComp = (
      <>
        {data.listThreads?.map((thread, idx) => {
          return (
            <QuestionBox
              key={idx}
              question={thread.question}
              username={thread.threadCreator}
              createdAt={thread.createdAt}
              repliesCount={thread.replies.length}
              specializtion={thread.specialization}
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
        {threadsHeader}
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

        <Flex
          flex="1"
          p="1rem"
          flexDirection="column"
          maxH="auto"
          marginX="8px"
        >
          <Box p="1rem" shadow="base" marginBottom="2rem">
            <Box
              onClick={() => setThreadsHeader("Most trendy threads")}
              textAlign="center"
              p="0.8rem"
              bgColor="green.300"
              color="Window"
              borderRadius="-10px"
              fontWeight="bold"
              cursor="pointer"
              _hover={{
                bgColor: "green.500",
              }}
              marginY="3px"
            >
              <Flex justify="center" align="center">
                <BiBarChartAlt size="25px" style={{ marginRight: "5px" }} />
                most answers
              </Flex>
            </Box>

            <Box
              onClick={() => setThreadsHeader("Most recent threads")}
              textAlign="center"
              p="0.8rem"
              bgColor="green.300"
              color="Window"
              borderRadius="-10px"
              fontWeight="bold"
              cursor="pointer"
              _hover={{
                bgColor: "green.500",
              }}
              marginY="3px"
            >
              <Flex justify="center" align="center">
                <FiClock size="25px" style={{ marginRight: "5px" }} />
                most recent
              </Flex>
            </Box>
          </Box>

          <QuestionForm refetch={refetch} />
        </Flex>
      </Flex>
    </>
  );
};
