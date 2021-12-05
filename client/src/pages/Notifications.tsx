/* eslint-disable react-hooks/exhaustive-deps */

import { Flex, Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { HeaderComp } from "../smallComps/HeaderComp";
import InfiniteScroll from "react-infinite-scroller";
import { FastBigSpinner } from "../smallComps/Spinners";
import { useGetNotification } from "../hooks/useListNotifications";

import {
  useDeleteNotifMutation,
  useGetNotifsNumLazyQuery,
} from "../generated/graphql";

import { NotifItem } from "../smallComps/NotifItem";

interface NotificationsProps {}
export const Notifications: React.FC<NotificationsProps> = () => {
  const [range, setRange] = useState({
    offset: 0,
    limit: 10,
  });

  const [hasMore, setHasMore] = useState(true);
  const [reload, setReload] = useState(false);
  const notifs = useGetNotification({
    start: range.offset,
    end: range.limit,
    reload: reload,
  });

  const [getNotifsNum, getNotifsNumOptions] = useGetNotifsNumLazyQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    let mounted = true;
    mounted && getNotifsNum();
    return () => {
      mounted = false;
    };
  }, []);

  const [deleteNotifMutation] = useDeleteNotifMutation({
    onCompleted: () => {
      
    },
  });

  const laodMoreNotifs = () => {
    if (notifs) {
      if (getNotifsNumOptions.data?.getNotifsCount! < notifs.length) {
        return setHasMore(false);
      }
      const newLimit = range.limit + 10;
      setRange((value) => ({ ...value, limit: newLimit }));
    }
  };

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
            hasMore={hasMore}
            loadMore={laodMoreNotifs}
            loader={
              <Center key={0}>
                <FastBigSpinner />
              </Center>
            }
          >
            {notifs !== undefined &&
              notifs !== null &&
              notifs.map((val, index: number) => (
                <NotifItem
                  key={index.toString() + index.toString()}
                  val={val.text!}
                  data={val}
                  deleteNotifMutation={() =>
                    deleteNotifMutation({
                      variables: {
                        id: val.id,
                      },
                    })
                  }
                />
              ))}
          </InfiniteScroll>
        </Flex>
      </Flex>
    </>
  );
};
