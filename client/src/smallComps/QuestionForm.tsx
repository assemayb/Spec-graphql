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
  Select,
} from "@chakra-ui/react";
import { ApolloQueryResult } from "@apollo/client";
import { AiFillEdit } from "react-icons/ai";
import { useQuery } from "@apollo/client";
import { topicsQuery } from "../pages/Topics";
interface QuestionFormProps {
  refetch?: () => Promise<ApolloQueryResult<ListThreadsQuery>>;
  clickedFromProfilePage?: boolean;
}
export const QuestionForm: React.FC<QuestionFormProps> = ({
  refetch,
  clickedFromProfilePage,
}) => {
  const [question, setQuestion] = useState("");
  const [specilization, setSpecilization] = useState("");

  const { data } = useQuery(topicsQuery);
  const [topicsArr, setTopicsArr] = useState([]);
  useEffect(() => {
    setTopicsArr(data?.listTopics);
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
        {/* <AiFillEdit size="15px"/> */}
        Create Thread
      </Heading>

      <Box
        display="flex"
        flexDirection="column"
        p="1rem"
        my="10px"
        // bgColor="gray.50"

        shadow={clickedFromProfilePage ? "" : "md"}
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
              {topicsArr && topicsArr.map((topic, idx) => (
                <option key={idx} value={topic} >
                  {topic}
                </option>
              ))}
            </Select>
            {/* <Input
              borderRadius="-10px"
              type="text"
              value={specilization}
              onChange={(e) => setSpecilization(e.target.value)}
            /> */}
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
