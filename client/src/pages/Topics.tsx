import React, { useState, useEffect, FC } from "react";
import { useIsUserLoggedInQuery } from "../generated/graphql";
import { RouteComponentProps, useHistory } from "react-router-dom";
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
  Center,
} from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { HeaderComp } from "../smallComps/HeaderComp";

interface TopicBoxProps {
  topic: string;
}
const TopicBox: FC<TopicBoxProps> = ({ topic }) => {
  const router = useHistory();
  const goToTopic = () => {
    router.push(`/topics/${topic}`);
  };
  return (
    <Box
      onClick={() => goToTopic()}
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
        fontSize={["10px", "13px", "18px", "20px"]}
        fontWeight="bold"
        textShadow="md"
        marginTop="5px"
      >
        {topic}
        <Center marginTop="5px">
          <img
            src={topic === "Cancer" ? `${topic}.png` : `${topic}.svg`}
            width={topic === "Cancer" ? "35px" : ""}
            alt=""
          />
        </Center>
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
      }, 200);
    }
  }, [data]);

  return (
    <>
      <HeaderComp threadsHeader={"Health Topics"}/>
      <Box p={["0.8rem", "0.8rem", "1rem", "1rem"]}  shadow="base" marginTop="1rem">
        <Grid
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
            "repeat(5, 1fr)",
          ]}
          gap={5}
        >
          <>
            {topcis.length < 1
              ? dummieArr.map((item, idx) => {
                return <Skeleton color="green.100" key={idx} height="80px" />;
              })
              : topcis.map((item, idx) => <TopicBox  key={idx} topic={item} />)}
          </>
        </Grid>
      </Box>
    </>
  );
};
