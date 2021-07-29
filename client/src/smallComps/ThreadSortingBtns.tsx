import { ApolloQueryResult } from "@apollo/client";
import { Box, Button, Tooltip, Center } from "@chakra-ui/react";
import { BiTimeFive } from "react-icons/bi";
import { GetThreadDataQuery } from "../generated/graphql";

interface SortingButtonsSectionProps {
  fetchByUpvotes: () => Promise<ApolloQueryResult<GetThreadDataQuery>>;
  refetchByDate: () => any;
}
export const SortingButtonsSection: React.FC<SortingButtonsSectionProps> = ({
  fetchByUpvotes,
  refetchByDate,
}) => {
  return (
    <Box marginRight="0.4rem" p="0.4rem" textAlign="right">
      <Tooltip label="sort by upvotes">
        <Button
          onClick={() => {
            fetchByUpvotes();
          }}
          borderRadius="-10px"
          bg="red.100"
          p="0.6rem"
          mx="0.2rem"
        >
          upvotes
        </Button>
      </Tooltip>
      <Tooltip label="sort by recent">
        <Button
          onClick={() => {
            refetchByDate();
          }}
          borderRadius="-10px"
          bg="blue.100"
          p="0.6rem"
          mx="0.2rem"
        >
          <Center>
            <BiTimeFive size="15px" />
          </Center>
        </Button>
      </Tooltip>
    </Box>
  );
};
