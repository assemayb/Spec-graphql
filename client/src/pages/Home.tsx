import React, { useState, useEffect } from "react";
import { useListThreadsLazyQuery } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";

import { QuestionForm } from "../smallComps/QuestionForm";
import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";
import { BiBarChartAlt } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { HeaderComp } from "../smallComps/HeaderComp";

export const Home: React.FC<RouteComponentProps> = ({ history, location }) => {
  const [threadsHeader, setThreadsHeader] = useState("Most trendy threads");
  const [offset, setOffset] = useState(0);
  const [ListThreadsQuery, { data, loading, refetch, subscribeToMore }] =
    useListThreadsLazyQuery({
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
      variables: {
        sortBy: threadsHeader.split(" ")[1],
        offset,
        limit: 5,
      },
    });

  useEffect(() => {
    console.log(offset);
    
    if (data?.listThreads) {
      refetch!({
        sortBy: threadsHeader.split(" ")[1],
        offset,
        limit: 5,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset ,setOffset]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted === true) {
      ListThreadsQuery();
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
        {data.listThreads?.map((thread, idx) => {
          return (
            <QuestionBox
              key={idx}
              threadId={thread.id}
              question={thread.question}
              username={thread.threadCreator}
              createdAt={thread.createdAt}
              repliesCount={thread.replies?.length}
              specializtion={thread.specialization}
            />
          );
        })}
        <Button
          onClick={() => setOffset((prevOffset) => prevOffset + 5 )}
          p="1.5rem"
          marginTop="1.2rem"
          borderRadius="-20px"
          bg="gray.300"
        >
          load more
        </Button>
      </>
    );
  }

  return (
    <>
      <HeaderComp header={threadsHeader} />

      <Flex marginTop="1rem" minH="80vh">
        <Flex
          flexDirection="column"
          alignItems="center"
          flex="4"
          shadow="base"
          p={["5px", "5px", "1rem", "1rem"]}
        >
          {ThreadsComp}
        </Flex>

        <Flex flex="1" flexDirection="column" marginX="10px">
          <Box
            p={["0.3rem", "0.4rem", "0.8rem", "0.8rem"]}
            shadow="base"
            marginBottom="1rem"
          >
            <Box
              onClick={() => setThreadsHeader("Most trendy threads")}
              textAlign="center"
              p={["0.2rem", "0.4rem", "0.8rem", "0.8rem"]}
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
              <Flex
                justify="center"
                align="center"
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
              >
                <BiBarChartAlt style={{ marginRight: "5px" }} />
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
              <Flex
                justify="center"
                align="center"
                fontSize={{ base: "0.7rem", md: "1.2rem" }}
              >
                <FiClock style={{ marginRight: "5px" }} />
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
