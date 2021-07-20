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
import { useListUserThreadsQuery } from "../generated/graphql";

export const Profile = () => {
  const { data, error, loading } = useListUserThreadsQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    console.log(data?.listUserThreads);
    
  }, [data])

  function createNewThread() {
    console.log("create new");
    // TODO: import the modal here
  }

  let ThreadSection: any = null;
  if (loading) {
    ThreadSection = <FastBigSpinner />;
  } else if (data) {
    ThreadSection = (
      <>
        {data.listUserThreads?.map((thread, idx) => {
          return (
            <QuestionBox
              key={idx}
              question={thread.question}
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
          {ThreadSection}
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
              onClick={() => createNewThread()}
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
              create a new thread
            </Box>
          </Box>

          {/* <QuestionForm refetch={refetch} /> */}
        </Flex>
      </Flex>
    </>
  );
};
