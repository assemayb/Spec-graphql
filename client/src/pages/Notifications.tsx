/* eslint-disable react-hooks/exhaustive-deps */

import { Flex, Center, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { HeaderComp } from "../smallComps/HeaderComp";
import InfiniteScroll from "react-infinite-scroller";
import { FastBigSpinner } from "../smallComps/Spinners";

import {
  NotificationType,
  useGetNotifsNumLazyQuery,
  useListUserNotifsLazyQuery,
  useListUserNotifsQuery,
} from "../generated/graphql";

interface NotifItemProps {
  handleClick: () => void;
  val?: string;
}


export const NotifItem: React.FC<NotifItemProps> = ({ handleClick, val }) => {
  return (
    <>
      <Flex
        as="button"
        w="100%"
        p="1rem"
        borderRadius="-40px"
        // make it darker if not openned
        bgColor="gray.100"
        shadow="md"
        fontSize="1.3rem"
        fontWeight="bold"
        color="#335344"
        minH="80px"
        borderLeft="12px solid #518096"
        textAlign="left"
        _hover={{
          bgColor: "gray.200",
        }}
        my="0.7rem"
        pos="relative"
        onClick={handleClick}
      >
        {val}
        {/* <Button bgColor="blue.300" pos="absolute" right="4px" top="2px" onClick={handleClick}>delete</Button> */}
      </Flex>
    </>
  );
};
export const useGetNotification = (start: number, end: number) => {
  const [notifs, setNotifs] = useState<NotificationType[]>([])
  const { data } = useListUserNotifsQuery({
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      const chunk = data?.listUserNotifs!.slice(start, end)
      setNotifs(chunk!)
    }
  })

  useEffect(() => {
    const chunk = data?.listUserNotifs!.slice(start, end)
    setNotifs(chunk!)
  }, [start, end])

  return notifs
}


interface NotificationsProps { }
export const Notifications: React.FC<NotificationsProps> = () => {


  const [getNotifsNum, getNotifsNumOptions] = useGetNotifsNumLazyQuery();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getNotifsNum();
    }
    return () => {
      isMounted = false;
    };
  }, []);


  const [offset] = useState(0)
  const [limit, setLimit] = useState(15);
  const [allowMoreLoading, setAllowMoreLoading] = useState(true);
  const notifs = useGetNotification(offset, limit)


  const loadMoreNotifications = () => {
    console.log("load more function");
    setTimeout(() => {
      setLimit((prev) => prev + 15)
    }, 2000)
  }

  useEffect(() => {
    console.log(notifs);
    if (limit >= getNotifsNumOptions.data?.getNotifsCount!) {
      setAllowMoreLoading(false)
    }
  }, [limit])

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
            hasMore={allowMoreLoading}
            loadMore={() => loadMoreNotifications()}

            pageStart={0}
            useWindow={false}
            loader={
              <Center key={0}>
                <FastBigSpinner />
              </Center>
            }
          >
            {notifs &&
              notifs.map((val, index: number) => (
                <NotifItem
                  key={index}
                  val={val.text!}
                  // handleClick={() => {
                  //   let x = notifs.filter((_, idx) => index !== idx);
                  //   setNotifs(x);
                  // }}
                  handleClick={() => console.log("click event")}
                />
              ))}
          </InfiniteScroll>
        </Flex>
      </Flex>
    </>
  );
};
