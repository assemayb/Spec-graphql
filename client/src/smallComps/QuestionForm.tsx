import React, { useState, useEffect } from "react";
import {
  ListThreadsQuery,
  ListUserThreadsQuery,
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
  Select,
  Divider
} from "@chakra-ui/react";
import { ApolloQueryResult } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { topicsQuery } from "../pages/Topics";
interface QuestionFormProps {
  refetch?: () => Promise<ApolloQueryResult<ListThreadsQuery>>; /* from home page*/
  clickedFromProfilePage?: boolean;  /* if this prop is passed from profile page */
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>
  refetchProfileThreads?: () => Promise<ApolloQueryResult<ListUserThreadsQuery>>
}
export const QuestionForm: React.FC<QuestionFormProps> = ({
  refetch,
  clickedFromProfilePage,
  setShowModal,
  refetchProfileThreads
}) => {
  const [question, setQuestion] = useState("");
  const [specilization, setSpecilization] = useState("");
  const { data } = useQuery(topicsQuery);
  const [topicsArr, setTopicsArr] = useState([]);

  useEffect(() => {
    setTopicsArr(data && data.listTopics);
  }, [data]);

  const [createQuestion] = useCreateThreadMutation();
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
      if(refetchProfileThreads !== undefined) {
        await refetchProfileThreads()
        // setShowModal(false)
      }
      if (refetch !== undefined) {
        refetch();
      }
    } catch (error) {
      console.log(error.messge);
    }
  };
  return (
    <Box>
      <Heading
        as="h3"
        fontSize="20px"
        textAlign="center"
        textColor="gray.400"
        marginBottom="4px"
      >
        Create Thread
        <Divider  marginTop="5px"/>
      </Heading>

      <Box
        display="flex"
        flexDirection="column"
        p="1rem"
        my="10px"
        boxShadow={clickedFromProfilePage ? "" : "lg"}
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
            <Select
              onChange={(e) => setSpecilization(e.target.value)}
              fontSize="16px"
              defaultValue={"disabled"}
              name="topic"
              variant="flushed"
            >
              <option value="disabled" disabled>
                choose a topic
              </option>
              {topicsArr &&
                topicsArr.map((topic, idx) => (
                  <option key={idx} value={topic}>
                    {topic}
                  </option>
                ))}
            </Select>
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
    </Box>
  );
};
