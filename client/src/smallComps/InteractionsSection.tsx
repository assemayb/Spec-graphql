import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { BiCommentDetail } from "react-icons/bi";

interface InteractionsSectionProps {
  repliesCount: number;
}
export const InteractionsSection: React.FC<InteractionsSectionProps> = ({
  repliesCount,
}) => {
  return (
    <Flex
      p="0.2rem"
      justiy="center"
      align="center"
      pos="absolute"
      left="25px"
      bottom="1px"
      color="gray.400"
      fontSize="10px"
      marginTop="4px"
      fontWeight="bold"
    >
      <BiCommentDetail style={{ marginRight: "3px" }} />
      <Box>{repliesCount} replies</Box>
    </Flex>
  );
};
