import React, { useState, useEffect } from "react";
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
  Heading,
} from "@chakra-ui/react";
import { LoginFrom } from "../components/LoginFrom";
import { RegisterFrom } from "../components/RegisterForm";

import { FiUser,  FiCalendar } from "react-icons/fi";
interface QuestionFormProps {}
const QuestionForm: React.FC<QuestionFormProps> = () => {
  return (
    <Box display="flex" flexDirection="column" p="8px" my="10px" shadow="base">
      <form>
        <FormControl isRequired>
          <FormLabel color="green.400" fontWeight="bold">
            {" "}
            question
          </FormLabel>
          <Input type="text" name="question" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="green.400" fontWeight="bold">
            specilization
          </FormLabel>
          <Input type="text" name="specilization" />
        </FormControl>
      </form>
      <Button marginTop="12px" marginX="auto">
        submit
      </Button>
    </Box>
  );
};

interface QuestionBoxProps {}
const QuestionBox: React.FC<QuestionBoxProps> = () => {
  return (
    <Box pos="relative" width="100%" p="1rem" my="5px" shadow="base">
      <Heading as="h5" size="xs" color="gray.300" display="flex">
        <FiUser size="15px" />
        <Box ml="4px">username</Box>
      </Heading>
      <Heading as="h3" boxShadow="sm" size="md" my="5px" p="5px">
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
