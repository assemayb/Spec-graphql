/* eslint-disable react-hooks/exhaustive-deps */

import { Flex, Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { HeaderComp } from "../smallComps/HeaderComp";
import InfiniteScroll from "react-infinite-scroller";
import { FastBigSpinner } from "../smallComps/Spinners";
import { useGetNotification } from "../hooks/useListNotifications";
import { useDeleteNotifMutation } from "../generated/graphql";

import { NotifItem } from "../smallComps/NotifItem";

interface NotificationsProps {}
export const Notifications: React.FC<NotificationsProps> = () => {
  const [range, setRange] = useState({
    offset: 0,
    limit: 10,
  });
  const [reload, setReload] = useState<boolean>(false);

  // using the notification getter custom hook
  const notifs = useGetNotification({
    start: range.offset,
    end: range.limit,
    reload: reload,
  });

  function laodMoreNotifs() {
    setTimeout(() => {
      const prevLimit = range.limit;
      setRange((value) => ({ ...value, limit: prevLimit + 10 }));
    }, 1000);
  }

  const [deleteNotifMutation] = useDeleteNotifMutation({
    onCompleted: () => setReload((prev) => !prev),
  });

  return (
    <>
      <HeaderComp header={"Notifications"} />
      <Flex marginTop="1rem">
        <Flex
          flexDirection="column"
          flex="5"
          minH="80vh"
          shadow="md"
          p={["0.2rem", "0.4rem", "0.8rem", "1rem"]}
        >
          <InfiniteScroll
            // hasMore={getNotifsNumOptions.data?.getNotifsCount! >= notifs.length}
            hasMore={false}
            loadMore={laodMoreNotifs}
            pageStart={0}
            loader={
              <Center key={0}>
                <FastBigSpinner />
              </Center>
            }
          >
            {notifs &&
              notifs.map((val, index: number) => (
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
