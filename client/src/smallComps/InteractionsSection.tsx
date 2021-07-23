import React, { useState, useEffect, useRef } from "react";

import {
  Box,
  Heading,
  Divider,
  Flex,
  Badge,
  Tooltip,
} from "@chakra-ui/react";

import { FiUser } from "react-icons/fi";
import { BiCommentDetail, BiDotsHorizontal } from "react-icons/bi";
import {
  ListUserThreadsQuery,
  useDeleteThreadMutation,
} from "../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { OptionsPopover } from "../smallComps/OptionsPopover";



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
  