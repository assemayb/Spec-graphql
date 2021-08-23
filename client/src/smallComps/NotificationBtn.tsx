/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Box, Button, Tooltip, useToast } from "@chakra-ui/react";
import { BiBell } from "react-icons/bi";

import {
  useMeLazyQuery,
  useOnReplyCreatedSubscription,
} from "../generated/graphql";

import { useGetUserThreads } from "../hooks/useGetUserThreads";
import { useHistory } from "react-router-dom";

interface NotificationBtnProps {}
export const NotificationBtn: React.FC<NotificationBtnProps> = () => {
  const toast = useToast();
  const [meQuery, meQueryOptions] = useMeLazyQuery({
    fetchPolicy: "network-only",
  });
  const { data } = useOnReplyCreatedSubscription({
    fetchPolicy: "network-only",
  });
  const userThreads = useGetUserThreads({
    subData: data?.onReplyCreated,
  }); /** using rest because of cache issues affecting profile query*/

  useEffect(() => {
    let isMounted = true;
    if (isMounted === true) {
      meQuery();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (data?.onReplyCreated && userThreads.threads.length !== 0) {
      console.log("A reply has been added");
      const currentUserThreadsIDs =
        userThreads &&
        userThreads?.threads.map((thread: { id: number }) => thread.id);
      const addedReplyThreadID: any = data?.onReplyCreated.replyThread;
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
  }, [data?.onReplyCreated.id]);
  

  const router = useHistory();
  const goToNotificationsPage = () => {
    const currUserId = meQueryOptions.data?.me?.id;
    router.push(`/notifications/${currUserId}`);
  };

  return (
    <>
      <Tooltip label="show notifications">
        <Button
          onClick={goToNotificationsPage}
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
