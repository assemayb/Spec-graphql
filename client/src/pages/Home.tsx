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
} from "@chakra-ui/react";
import { LoginFrom } from "../components/LoginFrom";
import { RegisterFrom } from "../components/RegisterForm";

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
          flex="6"
          bgColor="whiteAlpha.200"
          shadow="base"
          p="0.5rem"
        >
          <Box width="100%" p="5px" my="5px" shadow="lg">
            <h4>the question form section</h4>
          </Box>
          <Box width="100%" p="5px" my="5px" shadow="lg">
            <h4>the question form section</h4>
          </Box>
          <Box width="100%" p="5px" my="5px" shadow="lg">
            <h4>the question form section</h4>
          </Box>
          <Box width="100%" p="5px" my="5px" shadow="lg">
            <h4>the question form section</h4>
          </Box>
          <Box width="100%" p="5px" my="5px" shadow="lg">
            <h4>the question form section</h4>
          </Box>
          <Box width="100%" p="5px" my="5px" shadow="lg">
            <h4>the question form section</h4>
          </Box>
          <Box width="100%" p="5px" my="5px" shadow="lg">
            <h4>the question form section</h4>
          </Box>
          <Box width="100%" p="5px" my="5px" shadow="lg">
            <h4>the question form section</h4>
          </Box>
          <Box width="100%" p="5px" my="5px" shadow="lg">
            <h4>the question form section</h4>
          </Box>
          <Box width="100%" p="5px" my="5px" shadow="lg">
            <h4>the question form section</h4>
          </Box>
        </Flex>

        <Flex
          flex="1"
          p="0.5rem"
          bgColor="whiteAlpha.400"
          shadow="base"
          flexDirection="column"
          maxH="auto"
          marginX="8px"
        >
          <Box p="8px" shadow="base" bgColor="whiteAlpha.600">
            <Box>the filtering and display btns</Box>
            <Box>the filtering and display btns</Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            p="8px"
            my="10px"
            shadow="base"
            bgColor="whiteAlpha.600"
          >
            <form>
              <FormControl isRequired>
                <FormLabel>add a question</FormLabel>
                <Input type="text" name="question" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>specilization</FormLabel>
                <Input type="text" name="specilization" />
              </FormControl>
            </form>
            <Button my="5px" marginX="auto">
              add
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
