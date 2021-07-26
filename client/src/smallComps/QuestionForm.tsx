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
      if (refetchProfileThreads !== undefined) {
        await refetchProfileThreads()
        // setShowModal(false)
      }
      if (refetch !== undefined) {
        refetch();
      }
      setQuestion("")
      setSpecilization("")
    } catch (error) {
      console.log(error.messge);
    }
  };
  return (
    <Box>
      <Heading
        fontSize={{ base: "14px", md: "1.5rem" }}
        textAlign="center"
        textColor="gray.400"
        marginBottom={{ base: "6px", md: "1rem" }}
      >
        Create Thread
        <Divider marginTop="8px" />
      </Heading>

      <Box
        display="flex"
        flexDirection="column"
        // p={["0.4rem", "1rem","1rem"]}
        p={{
          base: "0.6rem",
          md: "1rem",
        }}
        my={{
          base: "5px",
          md: "10px"
        }}
        boxShadow={clickedFromProfilePage ? "" : "lg"}
        textAlign="center"
      >
        <form onSubmit={(e) => submitQuestion(e)}>
          <FormControl isRequired>
            <FormLabel color="green.400" fontSize={{ base: "0.7rem", md: "1rem" }}>
              {" "}
              question
            </FormLabel>
            <Input
              fontSize={{ base: "0.7rem", md: "1rem" }}
              borderRadius="-10px"
              padding={{ base: "0.4rem", md: "1rem" }}
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color="green.400" fontSize={{ base: "0.7rem", md: "1rem" }}>
              specilization
            </FormLabel>
            <Select
              onChange={(e) => setSpecilization(e.target.value)}
              fontSize="12px"
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
            marginTop={{
              base: "8px",
              md: "12px",
            }}

            marginX="auto"
            fontSize={{
              base: "10px",
              md: "1rem",
            }}
          >
            submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};
