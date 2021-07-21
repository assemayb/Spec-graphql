import React, { useState, useEffect } from "react";
import {
  ListThreadsQuery,
  useCreateThreadMutation,
  useIsUserLoggedInQuery,
} from "../generated/graphql";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { ApolloQueryResult } from "@apollo/client";
import { AiFillEdit } from "react-icons/ai";

interface QuestionFormProps {
  refetch?: () => Promise<ApolloQueryResult<ListThreadsQuery>>;
  clickedFromProfilePage?: boolean
}
export const QuestionForm: React.FC<QuestionFormProps> = ({ refetch , clickedFromProfilePage }) => {
  const [question, setQuestion] = useState("");
  const [specilization, setSpecilization] = useState("");

  const [createQuestion ] =
    useCreateThreadMutation();
  const userLogginData = useIsUserLoggedInQuery();
  const submitQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createQuestion({
        variables: {
          question,
          spec: specilization,
        },
      });
      if(refetch !== undefined) {
        refetch()
      }
    } catch (error) {
      console.log(error.messge);
    }
  };
  return (
    <>
      <Heading
        as="h3"
        fontSize="20px"
        textAlign="center"
        textColor="gray.400"
        marginBottom="4px"
      >
        {/* <AiFillEdit size="15px"/> */}
        Create Thread
      </Heading>
      
      <Box
        display="flex"
        flexDirection="column"
        p="8px"
        my="10px"
        shadow={clickedFromProfilePage ? "" : "md" }        
        textAlign="center"
      >
        <form onSubmit={(e) => submitQuestion(e)}>
          <FormControl isRequired>
            <FormLabel color="green.400" fontWeight="bold">
              {" "}
              question
            </FormLabel>
            <Input
              borderRadius="-10px"
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
              borderRadius="-10px"
              type="text"
              value={specilization}
              onChange={(e) => setSpecilization(e.target.value)}
            />
          </FormControl>
          <Button
            isDisabled={!userLogginData.data?.isUserLoggedIn}
            type="submit"
            borderRadius="-20px"
            marginTop="12px"
            marginX="auto"
          >
            submit
          </Button>
        </form>
      </Box>
    </>
  );
};
