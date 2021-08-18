import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { topicsQuery } from "../pages/Topics";
import { useHistory } from "react-router-dom";

interface SideNavBoxProps {
  topics?: string[];
}

const SideNavBox: React.FC<SideNavBoxProps> = ({ topics }) => {
  const router = useHistory();
  return (
    <Flex
      flex="1"
      p="0.5rem"
      flexDirection="column"
      h="auto"
      marginX="8px"
      shadow="base"
    >
      {topics &&
        topics.map((topic, index) => {
          return (
            <Box
              as="button"
              onClick={() => {
                router.push(`/topics/${topic}`, { topics });
              }}
              key={index}
              textAlign="center"
              p="0.5rem"
              bgColor="green.300"
              color="white"
              borderRadius="-20px"
              cursor="pointer"
              _hover={{
                bgColor: "blue.200",
              }}
              marginY="3px"
            >
              <Flex justify="center" align="center">
                {topic}
              </Flex>
            </Box>
          );
        })}
    </Flex>
  );
};

export const SideTopicsSection = () => {
  const topicsArr = useQuery(topicsQuery, { fetchPolicy: "network-only" });
  if(topicsArr.data ) {
      return <SideNavBox topics={topicsArr.data.listTopics} />;
  } else {
      return <div></div>
  }
};
