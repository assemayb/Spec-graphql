/* eslint-disable react-hooks/exhaustive-deps */

import { Flex, Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { HeaderComp } from "../smallComps/HeaderComp";
import InfiniteScroll from "react-infinite-scroller";
import { FastBigSpinner } from "../smallComps/Spinners";
import { useGetNotification } from "../hooks/useListNotifications"
import { NotificationType, useGetNotifsNumLazyQuery, useGetThreadByReplyQuery } from "../generated/graphql";

interface NotifItemProps {
  handleClick: () => void;
  val?: string;
  data?: NotificationType
}


export const NotifItem: React.FC<NotifItemProps> = ({ handleClick, val, data }) => {
  const notificationInfo = useGetThreadByReplyQuery({
    variables: {
      replyId: data?.replyId as number
    }, fetchPolicy: "network-only"
  })

  const notifThreadId = notificationInfo.data?.getThreadByReplyId

  return (
    <>
      <Flex
        as="button"
        w="100%"
        p="1rem"
        borderRadius="-20px"

        //TODO:  make it darker if not openned
        bgColor="gray.100"
        shadow="md"
        fontSize="1.3rem"
        fontWeight="bold"
        color="#335344"
        minH="80px"
        borderLeft="10px solid #1e8244"
        textAlign="left"
        _hover={{
          bgColor: "gray.200",
        }}
        my="1rem"
        pos="relative"
        onClick={() => {
          // console.log(notifThreadId);
          // handleClick()
        }}
      >
        {val}
        {/* <Button bgColor="blue.300" pos="absolute" right="4px" top="2px" onClick={handleClick}>delete</Button> */}
      </Flex>
    </>
  );
};



interface NotificationsProps { }
export const Notifications: React.FC<NotificationsProps> = () => {

  const [getNotifsNum, getNotifsNumOptions] = useGetNotifsNumLazyQuery();
  const [range, setRange] = useState({
    offset: 0,
    limit: 20
  })
  const notifs = useGetNotification(range.offset, range.limit)
  const [allowMore, setAllowMore] = useState(false)

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
    }, 1500)
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
                handleClick={() => console.log("click event")} />
            ))}
          </InfiniteScroll>

        </Flex>
      </Flex>
    </>
  );
};
