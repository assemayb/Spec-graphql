import React, { useState, useEffect } from "react";
import {
  useIsUserLoggedInQuery,
  useListThreadsQuery,
} from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

import { QuestionForm } from "../smallComps/QuestionForm";
import { QuestionBox } from "../smallComps/QuestionBox";
import {FastBigSpinner} from "../smallComps/Spinners"

interface HomeProps {}
export const Home: React.FC<RouteComponentProps> = ({ history, location }) => {
  const [date, setDate] = useState("2018-07-22");
  const { data, loading, error } = useListThreadsQuery();

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
          p="0.5rem"
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
          <Box p="8px" shadow="base">
            <Box>the filtering and display btns</Box>
            <Box>the filtering and display btns</Box>
          </Box>
          <QuestionForm />
        </Flex>
      </Flex>
    </>
  );
};
