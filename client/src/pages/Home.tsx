import React, { useState } from "react";
import { useListThreadsQuery } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { Box, Divider, Flex } from "@chakra-ui/react";

import { QuestionForm } from "../smallComps/QuestionForm";
import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";
import { BiBarChartAlt } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { Skeleton } from "../smallComps/Skeleton"

export const Home: React.FC<RouteComponentProps> = ({ history, location }) => {
  const [threadsHeader, setThreadsHeader] = useState("Most trendy threads");
  const { data, loading, refetch } = useListThreadsQuery({
    fetchPolicy: "cache-first",
    variables: {
      sortBy: threadsHeader.split(" ")[1],
    },
  });

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
              repliesCount={thread.replies?.length}
              specializtion={thread.specialization}
            />
          );
        })}
      </>
    );
  }

  return (
    < >

      <Box
        marginLeft="1rem"
        marginTop={["8px", "8px", "1rem", "1rem"]}
        fontSize={["15px", "20px", "30px", "30px"]}
        fontFamily="fantasy"
        fontWeight="bold"
        color="gray.500"
        textShadow="lg"
        maxWidth={["150px", "200px", "500px", "500px"]}
      >
        {threadsHeader}
        <Divider />
      </Box>

      <Flex marginTop="2rem">

        <Flex
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          flex="4"
          shadow="base"
          p={["5px", "5px", "1rem", "1rem"]}
        >
          {ThreadsComp}
        </Flex>

        <Flex
          flex="1"
          p="0.5rem"
          flexDirection="column"
          maxH="auto"
          marginX="8px"
        >
          <Box p={["0.5rem", "0.5rem", "0.8rem", "0.8rem"]} shadow="base" marginBottom="0.7rem">
            <Box
              onClick={() => setThreadsHeader("Most trendy threads")}
              textAlign="center"
              p={["0.5rem", "0.5rem", "0.8rem", "0.8rem"]}
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
                <BiBarChartAlt size="1rem" style={{ marginRight: "3px" }} />
                <span>most answers</span>
              </Flex>
            </Box>

            <Box
              onClick={() => setThreadsHeader("Most recent threads")}
              textAlign="center"
              p={["0.2rem", "0.2rem", "0.8rem", "0.8rem"]}
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
                <FiClock size="1rem" style={{ marginRight: "5px" }} />
                <span>most recent</span>
              </Flex>
            </Box>
          </Box>

          <QuestionForm refetch={refetch} />
        </Flex>
      </Flex>
    </>
  );
};
