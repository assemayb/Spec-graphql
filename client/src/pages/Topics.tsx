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
  Divider,
} from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";

interface TopicBoxProps {
  topic: string;
}
const TopicBox: FC<TopicBoxProps> = ({ topic }) => {
  return (
    <Box
      cursor="pointer"
      w="100%"
      h="100px"
      bg="gray.100"
      shadow="md"
      borderRadius="-10px"
      _hover={{
        color: "green.400",
        bg: "gray.300",
        shadow: "lg",
      }}
    >
      <Box
        textAlign="center"
        p="0.2rem"
        fontSize="20px"
        fontWeight="bold"
        textShadow="md"
        marginTop="5px"
      >
        {topic}
      </Box>
    </Box>
  );
};

export const topicsQuery = gql`
  query listTopics {
    listTopics
  }
`;
export const Topics: React.FC<RouteComponentProps> = () => {
  const { data } = useQuery(topicsQuery);
  const [topcis, setTopics] = useState([]);
  const [dummieArr] = useState(new Array(12).fill(""));

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setTopics(data.listTopics);
      }, 300);
    }
  }, [data]);

  return (
    <>
    <Box
      marginLeft="1rem"
      marginTop="1rem"
      fontSize="30px"
      fontFamily="fantasy"
      fontWeight="bold"
      color="gray.500"
      textShadow="lg"
    >
      Health Topics
      <Divider />
    </Box>

      <Box p="2rem" marginTop="2rem" shadow="base">
        <Grid templateColumns="repeat(5, 1fr)" gap={5}>
          <>
            {topcis.length < 1
              ? dummieArr.map((item, idx) => {
                  return <Skeleton color="green.100" key={idx} height="80px" />;
                })
              : topcis.map((item, idx) => <TopicBox key={idx} topic={item} />)}
          </>
        </Grid>
      </Box>
    </>
  );
};
