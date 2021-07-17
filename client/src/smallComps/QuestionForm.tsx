import React, { useState, useEffect } from "react";
import {
  ListThreadsQuery,
  useCreateThreadMutation,
  useIsUserLoggedInQuery,
} from "../generated/graphql";

import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ApolloQueryResult } from "@apollo/client";

interface QuestionFormProps {
  refetch: () => Promise<ApolloQueryResult<ListThreadsQuery>>
}
export const QuestionForm: React.FC<QuestionFormProps> = ({
  refetch
}) => {
  const [question, setQuestion] = useState("");
  const [specilization, setSpecilization] = useState("");

  const [createQuestion, { client, data, error, loading }] =
    useCreateThreadMutation();
  const userLogginData = useIsUserLoggedInQuery();
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
      refetch()
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
        <Button
          isDisabled={!userLogginData.data?.isUserLoggedIn}
          type="submit"
          marginTop="12px"
          marginX="auto"
        >
          submit
        </Button>
      </form>
    </Box>
  );
};
