/* eslint-disable react-hooks/exhaustive-deps */

import { Flex, Center, Button, Tooltip } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { HeaderComp } from "../smallComps/HeaderComp";
import InfiniteScroll from "react-infinite-scroller";
import { FastBigSpinner } from "../smallComps/Spinners";
import { useGetNotification } from "../hooks/useListNotifications";
import {
  NotificationType,
  useDeleteNotifMutation,
  useGetNotifsNumLazyQuery,
  useGetThreadByReplyQuery,
  useListUserNotifsLazyQuery,
} from "../generated/graphql";
import { useHistory } from "react-router";

interface NotifItemProps {
  val?: string;
  data?: NotificationType;
  deleteNotifMutation: any;
  // setRange: any;
  // range: {
  //   offset: number;
  //   limit: number;
  // };
}

export const NotifItem: React.FC<NotifItemProps> = ({
  val,
  data,
  deleteNotifMutation,
}) => {
  const notificationInfo = useGetThreadByReplyQuery({
    variables: {
      replyId: data?.replyId as number,
    },
    fetchPolicy: "network-only",
  });
  const [showDelBtn, setShowDelBtn] = useState(false);
  const notifThreadId = notificationInfo.data?.getThreadByReplyId;

  const history = useHistory();
  function goToThread() {
    const repID = data?.replyId;
    history.push(`/threads/${notifThreadId}`, { repID: repID });
  }

  return (
    <>
      <Flex
        // as="button"
        // w="100%"
        p="1rem"
        borderRadius="-20px"
        justify="space-between"
        flexDirection="row"

        //TODO:  make it darker if not openned
        bgColor="gray.100"
        shadow="lg"
        fontSize="1.3rem"
        fontWeight="bold"
        color="#335344"
        minH="80px"
        // borderLeft="7px solid #1e8244"
        textAlign="left"
        _hover={{
          bgColor: "gray.200",
        }}
        my="1rem"
        pos="relative"
      >
        <div
          style={{ width: "80%", cursor: "pointer" }}
          onClick={() => goToThread()}
        >
          {val}
        </div>
        <Tooltip label="delete">
          <Button
            onClick={() =>
              deleteNotifMutation({
                variables: {
                  id: data?.id!,
                },
                update: () => {
                  console.log("donee");
                },
              })
            }
            borderRadius="10px"
            fontSize="20px"
            bgColor="gray.400"
            _hover={{
              bgColor: "red.300",
              color: "white",
            }}
          >
            x
          </Button>
        </Tooltip>
      </Flex>
    </>
  );
};

interface NotificationsProps {}
export const Notifications: React.FC<NotificationsProps> = () => {
  const [getNotifsNum, getNotifsNumOptions] = useGetNotifsNumLazyQuery();
  const [range, setRange] = useState({
    offset: 0,
    limit: 10,
  });
  
  useEffect(() => {
    let isMounted = true;
    isMounted &&   getNotifsNum();
    return () => { isMounted = false};
  }, []);

  const notifs = useGetNotification(range.offset, range.limit);
  const [notifsSec, setNotifsSec] = useState<any[]>([]);
  useEffect(() => {
    if(notifs.length !== 0) {
      setNotifsSec(notifs)
    }
  }, [notifs]);

  const laodMoreNotifs = () => {
    setTimeout(() => {
      const prevLimit = range.limit;
      setRange((value) => ({ ...value, limit: prevLimit + 10 }));
    }, 850);
  };
  const [getNotifs, getNotifsOptions] = useListUserNotifsLazyQuery({
    fetchPolicy: "network-only",
  });

  const [deleteNotifMutation] = useDeleteNotifMutation({
    onCompleted: () => {
      getNotifs();
      const newList = getNotifsOptions.data?.listUserNotifs!;
      console.log(newList);
    },
  }); 

  

  useEffect(() => {
    if (getNotifsOptions.called) {
      const newList = getNotifsOptions.data?.listUserNotifs!;
      setNotifsSec(newList);
    }
  }, [getNotifsOptions.called]);

  return (
    <>
      <HeaderComp header={"Notifications"} />
      <Flex marginTop="0.5rem">
        <Flex
          flexDirection="column"
          flex="5"
          minH="80vh"
          p={["0.2rem", "0.4rem", "0.8rem", "0.8rem"]}
        >
          <InfiniteScroll
            // hasMore={getNotifsNumOptions.data?.getNotifsCount! > notifsSec.length}
            hasMore={false}
            loadMore={laodMoreNotifs}
            pageStart={0}
            loader={
              <Center key={0}>
                <FastBigSpinner />
              </Center>
            }
          >
            {notifsSec?.map((val, index: number) => (
              <NotifItem
                key={index.toString() + "_" + index.toString()}
                val={val.text!}
                data={val}
                deleteNotifMutation={deleteNotifMutation}
              />
            ))}
          </InfiniteScroll>
        </Flex>
      </Flex>
    </>
  );
};
