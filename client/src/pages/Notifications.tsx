/* eslint-disable react-hooks/exhaustive-deps */

import { Flex, Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { HeaderComp } from "../smallComps/HeaderComp";
import InfiniteScroll from "react-infinite-scroller";
import { FastBigSpinner } from "../smallComps/Spinners";
import {
  useGetNotifsNumLazyQuery,
  useListUserNotifsLazyQuery,
} from "../generated/graphql";

interface NotifItemProps {
  handleClick: () => any;
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
        bgColor="gray.100"
        shadow="lg"
        fontSize="20px"
        fontWeight="bold"
        color="#335344"
        borderLeft="12px solid #518096"
        _hover={{
          bgColor: "gray.200",
        }}
        my="0.7rem"
        pos="relative"
      >
        {val}
        {/* <Button bgColor="blue.300" pos="absolute" right="4px" top="2px" onClick={handleClick}>delete</Button> */}
      </Flex>
    </>
  );
};

interface NotificationsProps {}

export const Notifications: React.FC<NotificationsProps> = () => {
  const [offset, setOffset] = useState(0);
  const [end, setEnd] = useState(10);

  const [listNotifs, { data, fetchMore }] = useListUserNotifsLazyQuery({
    fetchPolicy: "network-only",
    variables: {
      offset,
      limit: end,
    },
  });
  useEffect(() => {
    console.log("length", data?.listUserNotifs.length);
  }, [data?.listUserNotifs]);

  const [getNotifsNum, getNotifsNumOptions] = useGetNotifsNumLazyQuery({
    fetchPolicy: "network-only",
  });
  const notifsCount = getNotifsNumOptions.data?.getNotifsCount!;

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getNotifsNum();
      listNotifs();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    fetchMore &&
      fetchMore({
        variables: {
          offset: offset,
        },
      });
  }, [end, setEnd]);

  const handleLoadMore = () => {
    setTimeout(() => {
      offset > 0 && setOffset(end);
      end < notifsCount && setEnd((prevEnd) => prevEnd + 10);
    }, 600);
  };

  return (
    <>
      <HeaderComp header={"Notifications"} />
      <Flex marginTop="1.5rem">
        <Flex
          flexDirection="column"
          flex="5"
          minH="80vh"
          p={["0.2rem", "0.4rem", "1rem", "1rem"]}
        >
          <InfiniteScroll
            hasMore={data?.listUserNotifs.length! < notifsCount}
            loadMore={handleLoadMore}
            pageStart={0}
            // useWindow={false}
            loader={
              <Center key={0}>
                <FastBigSpinner />
              </Center>
            }
          >
            {data?.listUserNotifs.map((val, index: number) => (
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
