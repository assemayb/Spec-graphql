/* eslint-disable react-hooks/exhaustive-deps */

import { Flex, Center, Button } from "@chakra-ui/react";
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
        fontSize="1rem"
        fontWeight="bold"
        color="#335344"
        borderLeft="12px solid #518096"
        textAlign="left"
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

const limitSize = 15;
export const Notifications: React.FC<NotificationsProps> = () => {
  const [offset, setOffset] = useState(0);
  const [displayedSection, setDisplayedSection] = useState<any[]>([]);

  
  const [getNotifsNum, getNotifsNumOptions] = useGetNotifsNumLazyQuery({
    fetchPolicy: "network-only",
  });

  const [listNotifs, { data }] = useListUserNotifsLazyQuery({
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setDisplayedSection(data.listUserNotifs!.slice(offset, limitSize));
      setOffset((prevOffset) => prevOffset + limitSize);
    },
  });

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

  const loadMoreNotifs = () => {
    console.log("loadMore function");

    // setDisplayedSection(data!.listUserNotifs!.slice(offset, limitSize));
    // setOffset((prevOffset) => prevOffset + limitSize);
  };

  return (
    <>
      <HeaderComp header={"Notifications"} />
      <Flex marginTop="1rem">
        <Flex
          flexDirection="column"
          flex="5"
          minH="80vh"
          p={["0.2rem", "0.4rem", "0.8rem", "0.8rem"]}
        >
          <InfiniteScroll
            hasMore={
              displayedSection.length <=
              getNotifsNumOptions.data?.getNotifsCount!
            }
            loadMore={() => loadMoreNotifs()}
            pageStart={0}
            // useWindow={false}
            loader={
              <Center key={0}>
                <FastBigSpinner />
              </Center>
            }
          >
            {displayedSection.length > 0 ? (
              displayedSection.map((val, index: number) => (
                <NotifItem
                  key={index}
                  val={val.text!}
                  // handleClick={() => {
                  //   let x = notifs.filter((_, idx) => index !== idx);
                  //   setNotifs(x);
                  // }}
                  handleClick={() => console.log("click event")}
                />
              ))
            ) : (
              <div></div>
            )}
          </InfiniteScroll>
        </Flex>
      </Flex>
    </>
  );
};
