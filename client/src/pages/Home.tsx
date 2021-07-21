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
import { SortBtn } from "../smallComps/SortBtn"
import {BiBarChartAlt} from "react-icons/bi"
import {FiClock} from "react-icons/fi"



interface HomeProps {}
export const Home: React.FC<RouteComponentProps> = ({ history, location }) => {
  const { data, loading, error, refetch } = useListThreadsQuery({
    fetchPolicy : "cache-first"
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
            />
          );
        })}
      </>
    );
  }

  return (
    <>
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
            <SortBtn>
              <Flex justify="center" align="center">
              <BiBarChartAlt size="25px" style={{marginRight:"5px"}}/>
              most answered
              </Flex>
            </SortBtn>

            <SortBtn>
              <Flex justify="center" align="center">  
              <FiClock size="25px" style={{marginRight:"5px"}}/>
              most recent
              </Flex>
            </SortBtn>
          </Box>

          <QuestionForm refetch={refetch} />
        </Flex>
      </Flex>
    </>
  );
};
