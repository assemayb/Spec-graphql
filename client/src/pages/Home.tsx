import React, { useState, useEffect } from "react";
import {
  useIsUserLoggedInQuery,
  useListThreadsQuery,
} from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

import { QuestionForm } from "../smallComps/QuestionForm";
import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";

export const SortBtn: React.FC = ({ children }) => {
  return (
    <Box
      textAlign="center"
      p="0.8rem"
      bgColor="green.300"
      color="Window"
      fontWeight="bold"
      cursor="pointer"
      _hover={{
        bgColor: "green.500",
      }}
      marginY="3px"
      borderRadius="5px"
    >
      {children}
    </Box>
  );
};
interface HomeProps {}
export const Home: React.FC<RouteComponentProps> = ({ history, location }) => {
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
          <Box p="1rem" shadow="base" marginBottom="2rem">
            <SortBtn>most answered</SortBtn>
            <SortBtn>most recent</SortBtn>
          </Box>

          <QuestionForm />
        </Flex>
      </Flex>
    </>
  );
};
