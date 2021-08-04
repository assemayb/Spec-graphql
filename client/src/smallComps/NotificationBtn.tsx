import { Box, Button, Tooltip } from "@chakra-ui/react";
import { BiBell } from "react-icons/bi";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { useEffect } from "react";
import { useListThreadsQuery } from "../generated/graphql";

const NewThreadSubscription = gql`
  subscription {
    threadCreated {
      id
      question
      threadCreator
      specialization
    }
  }
`;

interface NotificationBtnProps {}
export const NotificationBtn: React.FC<NotificationBtnProps> = () => {
  //   const { data, loading } = useSubscription(NewThreadSubscription);
  const { data, loading,  subscribeToMore } = useListThreadsQuery({
    fetchPolicy: "network-only",
    variables: {
      sortBy: "recent",
    },
  });

  useEffect(() => {
    
  }, []);

  return (
    <>
      <Tooltip label="show notifications">
        <Button
          onClick={() => console.log("notifyyyyyyy")}
          height={["30%", "30%", "50%", "50%"]}
          fontSize={["sm", "sm", "medium", "medium"]}
          fontWeight="bold"
          bgColor="green.400"
          borderRadius="40px"
          _hover={{
            bgColor: "green.500",
          }}
          mx="0.4rem"
          pos="relative"
        >
          <Box
            pos="absolute"
            top="2px"
            right="2px"
            fontSize="1.2rem"
            textColor="red.500"
            fontWeight="bold"
            width="100%"
          ></Box>
          <BiBell size="22px" />
        </Button>
      </Tooltip>
    </>
  );
};
