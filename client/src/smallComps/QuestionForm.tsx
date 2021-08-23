/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  ListThreadsQuery,
  ListUserThreadsQuery,
  useCreateThreadMutation,
  useIsUserLoggedInLazyQuery,
  useMeLazyQuery,
} from "../generated/graphql";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Divider,
} from "@chakra-ui/react";
import { ApolloQueryResult } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { topicsQuery } from "../pages/Topics";
import { useGetUserThreads } from "../hooks/useGetUserThreads";

interface QuestionFormProps {
  refetch?: () => Promise<
    ApolloQueryResult<ListThreadsQuery>
  > /* from home page*/;
  clickedFromProfilePage?: boolean /* if this prop is passed from profile page */;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  refetchProfileThreads?: () => Promise<
    ApolloQueryResult<ListUserThreadsQuery>
  >;
}
export const QuestionForm: React.FC<QuestionFormProps> = ({
  refetch,
  clickedFromProfilePage,
  setShowModal,
  refetchProfileThreads,
}) => {
  const [question, setQuestion] = useState("");
  const [specilization, setSpecilization] = useState("");
  const topics = useQuery(topicsQuery);
  const [topicsArr, setTopicsArr] = useState([]);  
  
  useEffect(() => {
    setTopicsArr(topics.data && topics.data.listTopics);
  }, [topics.data]);


  const [triggerReload, setTriggerReload] = useState(false)
  const userThreads = useGetUserThreads({
    subData: triggerReload,
  }); /** using rest because of cache issues affecting profile query*/

  const [createQuestion] = useCreateThreadMutation();
  const [userLogginData, { data }] = useIsUserLoggedInLazyQuery();
  
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      userLogginData();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const submitQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createQuestion({
        variables: {
          question,
          spec: specilization,
        },
        update: () => {
          setTriggerReload(prevVal => !prevVal)
        }
      });

      if (refetchProfileThreads !== undefined) {
        await refetchProfileThreads();
        setTimeout(() => {
          setShowModal!(false);
          const x = document.querySelector("#footer")?.scrollHeight;
          console.log(x);
        }, 200);
      }
      refetch !== undefined && (await refetch());
      setQuestion("");
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
        p={{
          base: "1rem",
          md: "1.5rem",
        }}
        my={{
          base: "5px",
          md: "10px",
        }}
        boxShadow={clickedFromProfilePage ? "" : "lg"}
        textAlign="center"
      >
        <form onSubmit={(e) => submitQuestion(e)}>
          <FormControl isRequired fontWeight="bold">
            <FormLabel
              color="green.400"
              fontSize={{ base: "0.7rem", md: "1rem" }}
            >
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
          <FormControl isRequired fontWeight="bold">
            <FormLabel
              color="green.400"
              fontSize={{ base: "0.7rem", md: "1rem" }}
            >
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
            isDisabled={!data?.isUserLoggedIn}
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
