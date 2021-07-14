import React, { useState, useEffect } from "react";
import {
  useCreateThreadMutation,
  useIsUserLoggedInQuery,
  useListThreadsQuery,
} from "../generated/graphql";
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
  Heading,
} from "@chakra-ui/react";
import { LoginFrom } from "../components/LoginFrom";
import { RegisterFrom } from "../components/RegisterForm";

import { FiUser, FiCalendar } from "react-icons/fi";
interface QuestionFormProps {}
const QuestionForm: React.FC<QuestionFormProps> = () => {
  const [question, setQuestion] = useState("");
  const [specilization, setSpecilization] = useState("");

  const [createQuestion, { client, data, error, loading }] =
    useCreateThreadMutation();

  const submitQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("sbmmmmiit");

    try {
      await createQuestion({
        variables: {
          question,
          spec: specilization,
        },
      });
    } catch (error) {
      console.log(error.messge);
    }
  };
  return (
    <Box display="flex" flexDirection="column" p="8px" my="10px" shadow="base">
      <form onSubmit={(e) => submitQuestion(e)}>
        <FormControl isRequired>
          <FormLabel color="green.400" fontWeight="bold">
            {" "}
            question
          </FormLabel>
          <Input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="green.400" fontWeight="bold">
            specilization
          </FormLabel>
          <Input
            type="text"
            value={specilization}
            onChange={(e) => setSpecilization(e.target.value)}
          />
        </FormControl>
        <Button type="submit" marginTop="12px" marginX="auto">
          submit
        </Button>
      </form>
    </Box>
  );
};

interface QuestionBoxProps {}
const QuestionBox: React.FC<QuestionBoxProps> = () => {
  return (
    <Box
      pos="relative"
      width="100%"
      p="1rem"
      my="5px"
      shadow="inner"
      _hover={{ bgColor: "gray.50" }}
    >
      <Heading as="h5" size="xs" color="gray.300" display="flex">
        <FiUser size="15px" />
        <Box ml="4px">username</Box>
      </Heading>
      <Heading
        as="h3"
        boxShadow="sm"
        size="md"
        my="5px"
        p="10px"
        cursor="pointer"
        _hover={{
          color: "green.500",
        }}
      >
        what is this question taking about?
      </Heading>
      <Heading
        pos="absolute"
        right="20px"
        bottom="1px"
        color="gray.200"
        fontSize="12px"
      >
        12-2-2021
      </Heading>
    </Box>
  );
};

interface HomeProps {}
export const Home: React.FC<RouteComponentProps> = ({ history, location }) => {
  const [date, setDate] = useState("2018-07-22");
  const { data, loading, error } = useListThreadsQuery();

  useEffect(() => {
    if (loading) {
      console.log("loading.....");
    }
    if (data?.listThreads) {
      console.log(data?.listThreads);
    }
  });
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
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
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
