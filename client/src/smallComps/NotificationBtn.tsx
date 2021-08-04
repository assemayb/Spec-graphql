/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Tooltip, useToast } from "@chakra-ui/react";
import { BiBell } from "react-icons/bi";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { useEffect } from "react";
import {
  useListUserThreadsLazyQuery,
  useMeLazyQuery,
  useOnReplyCreatedSubscription,
} from "../generated/graphql";

interface NotificationBtnProps {}
export const NotificationBtn: React.FC<NotificationBtnProps> = () => {
  const [meQuery, meQueryOptions] = useMeLazyQuery({
    fetchPolicy: "network-only",
  });
  const [userThreadsQuery, userThreadsQueryOptions] =
    useListUserThreadsLazyQuery({
      fetchPolicy: "network-only",
    });
  const { data, loading, variables } = useOnReplyCreatedSubscription({
    fetchPolicy: "network-only",
  });
  const toast = useToast();
  useEffect(() => {
    let isMounted = true;
    if (isMounted === true) {
      meQuery();
      userThreadsQuery();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (data?.onReplyCreated) {
      const currentUserThreadsIDs =
        userThreadsQueryOptions.data?.listUserThreads?.map(({ id }) => id);

      const addedReplyThreadID = data?.onReplyCreated.replyThread;
      const addedReplySpecID = data?.onReplyCreated.replySpecialist;
      const anotherUserReplied =
        meQueryOptions.data?.me?.id !== addedReplySpecID;
      const doesAddedReplyBelongToUserThreads =
        currentUserThreadsIDs?.includes(addedReplyThreadID);

      if (doesAddedReplyBelongToUserThreads && anotherUserReplied) {
        toast({
          title: "some replied to your thread",
          description: data?.onReplyCreated.text,
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "top-left",
        });
      }
    }
  }, [data?.onReplyCreated]);

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
