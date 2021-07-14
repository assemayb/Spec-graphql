import React, { useState, useEffect, FC } from "react";
import { useIsUserLoggedInQuery } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Grid,
} from "@chakra-ui/react";


interface TopicBoxProps {}
const TopicBox: FC<TopicBoxProps> = () => {
    return <Box w="100%" h="40" bg="gray.300" borderRadius="4px" shadow="inner" />;
};

export const Topics: React.FC<RouteComponentProps> = () => {
  return (
    <Box p="1rem" marginTop="2rem">
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      <TopicBox ></TopicBox>
      <TopicBox ></TopicBox>
      <TopicBox ></TopicBox>
      <TopicBox ></TopicBox>
      <TopicBox ></TopicBox>
      <TopicBox ></TopicBox>
      <TopicBox ></TopicBox>
      </Grid>
    </Box>
  );
};