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
  Spinner,
  Skeleton,
} from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";

interface TopicBoxProps {}
const TopicBox: FC<TopicBoxProps> = () => {
  return <Box w="100%" h="90px" bg="green.100" borderRadius="5px">

  </Box>;
};

const topicsQuery = gql`
  query listTopics {
    listTopics
  }
`;
export const Topics: React.FC<RouteComponentProps> = () => {
  const { data, loading, error } = useQuery(topicsQuery);
  const [topcis, setTopics] = useState([]);
  const [dummieArr] = useState(new Array(12).fill(""));

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setTopics(data.listTopics);
      }, 600);
    }
  }, [data]);

  return (
    <Box p="1rem" marginTop="2rem">
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <>
          {topcis.length < 1
            ? dummieArr.map((item, idx) => {
                return <Skeleton color="green.100" key={idx} height="80px" />;
              })
            : topcis.map((item, idx) => <TopicBox key={idx} />)}
        </>
      </Grid>
    </Box>
  );
};
