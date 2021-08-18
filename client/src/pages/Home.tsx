/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  useGetThreadsNumLazyQuery,
  useListThreadsLazyQuery,
} from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

import { QuestionForm } from "../smallComps/QuestionForm";
import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";
import { BiBarChartAlt } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { HeaderComp } from "../smallComps/HeaderComp";
import { Pagination } from "../smallComps/PagintationSection";

const PageSize = 4;
export const Home: React.FC<RouteComponentProps> = ({ history, location }) => {
  const [threadsHeader, setThreadsHeader] = useState("Most trendy threads");
  const [threadsNum, threadsNumOptions] = useGetThreadsNumLazyQuery({
    fetchPolicy: "network-only",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [ListThreadsQuery, { data, loading, refetch }] =
    useListThreadsLazyQuery({
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
      variables: {
        sortBy: threadsHeader.split(" ")[1],
        offset: (currentPage - 1) * PageSize,
        limit: PageSize,
      },
    });
  // this useEffect and use of lazy query is to fix apollo-related issue
  useEffect(() => {
    let isMounted = true;
    if (isMounted === true) {
      threadsNum();
      ListThreadsQuery();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (data?.listThreads) {
      refetch!({
        sortBy: threadsHeader.split(" ")[1],
        offset: (currentPage - 1) * PageSize,
        limit: PageSize,
      });
    }
  }, [currentPage, setCurrentPage]);

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

        {data.listThreads && (
          <Pagination
            pageSize={PageSize}
            currentPage={currentPage}
            totalCount={threadsNumOptions.data?.getThreadsNum!}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
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
