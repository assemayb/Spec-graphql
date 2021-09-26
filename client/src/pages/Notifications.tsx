/* eslint-disable react-hooks/exhaustive-deps */

import { Flex, Center, Button, Tooltip } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { HeaderComp } from "../smallComps/HeaderComp";
import InfiniteScroll from "react-infinite-scroller";
import { FastBigSpinner } from "../smallComps/Spinners";
import { useGetNotification } from "../hooks/useListNotifications"
import { NotificationType, useGetNotifsNumLazyQuery, useGetThreadByReplyQuery } from "../generated/graphql";
import { useHistory, useLocation } from "react-router";


interface NotifItemProps {
  val?: string;
  data?: NotificationType
}


export const NotifItem: React.FC<NotifItemProps> = ({ val, data }) => {
  const notificationInfo = useGetThreadByReplyQuery({
    variables: {
      replyId: data?.replyId as number
    }, fetchPolicy: "network-only"
  })
  const [showDelBtn, setShowDelBtn] = useState(false)

  const notifThreadId = notificationInfo.data?.getThreadByReplyId

  const history = useHistory()
  function goToThread() {
    const repID = data?.replyId
    history.push(`/threads/${notifThreadId}`, { repID: repID })
  }

  return (
    <>
      <Flex
        as="button"
        w="100%"
        p="1rem"
        borderRadius="-20px"
        justify="space-between"
        flexDirection="row"
        //TODO:  make it darker if not openned
        bgColor="gray.100"
        shadow="md"
        fontSize="1.3rem"
        fontWeight="bold"
        color="#335344"
        minH="80px"
        borderLeft="7px solid #1e8244"
        textAlign="left"
        _hover={{
          bgColor: "gray.200",
        }}
        my="1rem"
        pos="relative"
        onClick={() => goToThread()}
      >
        {val}
        <Tooltip label="delete">
          <Button
            borderRadius="5px"
            fontSize="20px"
            bgColor="seashell"
            _hover={{
              bgColor: "red.300",
              color: "white"
            }}>
            x
          </Button>
        </Tooltip>
      </Flex>
    </>
  );
};



interface NotificationsProps { }
export const Notifications: React.FC<NotificationsProps> = () => {

  const [getNotifsNum, getNotifsNumOptions] = useGetNotifsNumLazyQuery();
  const [range, setRange] = useState({
    offset: 0,
    limit: 10
  })
  const notifs = useGetNotification(range.offset, range.limit)
  useEffect(() => {
    console.log("length  ===>> ", notifs.length);
  }, [notifs.length])

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getNotifsNum();
    }
    return () => {
      isMounted = false;
    };
  }, []);


  const laodMoreNotifs = () => {
    setTimeout(() => {
      const prevLimit = range.limit
      setRange((value) => ({ ...value, limit: prevLimit + 10 }))
    }, 850)
  }


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
            hasMore={getNotifsNumOptions.data?.getNotifsCount! > notifs.length}
            loadMore={laodMoreNotifs}
            pageStart={0}
            loader={
              <Center key={0}>
                <FastBigSpinner />
              </Center>
            }
          >
            {notifs && notifs?.map((val, index: number) => (
              <NotifItem
                key={index.toString() + "_" + index.toString()}
                val={val.text!}
                data={val}
              />
            ))}
          </InfiniteScroll>

        </Flex>
      </Flex>
    </>
  );
};
