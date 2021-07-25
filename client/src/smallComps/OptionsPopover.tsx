import React from "react";

import {
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Button,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

import {
  ListUserThreadsQuery,
  useDeleteThreadMutation,
} from "../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";

interface OptionsPopoverProps {
  threadId: number;
  refetch: () => Promise<ApolloQueryResult<ListUserThreadsQuery>>;
  setShowThreadOptions: React.Dispatch<React.SetStateAction<boolean>>
  showThreadOptions?: boolean
}

export const OptionsPopover: React.FC<OptionsPopoverProps> = ({
  children,
  threadId,
  refetch,
  showThreadOptions,
  setShowThreadOptions,
}) => {

  const [deleteReq] = useDeleteThreadMutation({
    update: () => {
      refetch();
    },
  });
  const deleteThread = () => {
    deleteReq({
      variables: {
        id: threadId,
      },
    });
    setShowThreadOptions(false);
  };

  const editThread = () => {
    console.log("edit thread funcc");
  }

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      {showThreadOptions === true && (
        <PopoverContent maxW="120px">
          <PopoverArrow />
          <PopoverBody padding="6px">
            <Flex justify="center" direction="column">
              <Button
                bgColor="green.300"
                _hover={{
                  color: "white",
                  bgColor: "green.400",
                }}
                onClick={() => deleteThread()}
              >
                <FiTrash2 style={{ marginRight: "3px" }} />
                delete
              </Button>
              <Button
                onClick={() => editThread()}
                marginTop="6px">edit</Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      )}

    </Popover>
  );

};
