import React from "react";
import { Box, Center } from "@chakra-ui/react";
import { useHistory } from "react-router";

interface TopicBoxProps {
  topic: string;
}

export const TopicBox: React.FC<TopicBoxProps> = ({ topic }) => {
  const router = useHistory();
  const goToTopic = () => {
    router.push(`/topics/${topic}`);
  };
  return (
    <Box
      as="button"
      onClick={goToTopic}
      w="100%"
      h="100px"
      bg="gray.100"
      shadow="inner"
      borderRadius="-20px"
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
            alt={topic}
          />
        </Center>
      </Box>
    </Box>
  );
};
