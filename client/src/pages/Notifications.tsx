/* eslint-disable react-hooks/exhaustive-deps */

import { Flex, Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { HeaderComp } from "../smallComps/HeaderComp";
import InfiniteScroll from "react-infinite-scroller";
import { FastBigSpinner } from "../smallComps/Spinners";

import {
  NotificationType,
  useGetNotifsNumLazyQuery,
  useListUserNotifsLazyQuery,
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
        bgColor="gray.50"
        shadow="md"
        fontSize="1rem"
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

interface NotificationsProps {}

export const Notifications: React.FC<NotificationsProps> = () => {
  const [getNotifsNum, getNotifsNumOptions] = useGetNotifsNumLazyQuery();
  const [limitSize, setLimitSize] = useState(15);

  const [displayedSection, setDisplayedSection] = useState<NotificationType[]>(
    []
  );

  const [listNotifs, { data }] = useListUserNotifsLazyQuery({
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setDisplayedSection(data.listUserNotifs.slice(0, limitSize));
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

  useEffect(() => {
    console.log("<==============> <Effect>  <==============>");
    
    if (data !== undefined && displayedSection.length <= 15) {
      const queriedNotifs = data!.listUserNotifs.length;
      const notifsNum =
        getNotifsNumOptions.data! && getNotifsNumOptions.data?.getNotifsCount!;
      const notExceeded = queriedNotifs < notifsNum;

      setTimeout(() => {
        if (notExceeded) {
          setDisplayedSection(data!.listUserNotifs!.slice(0, limitSize + 15));
          // setLimitSize((prevSize) => {
          //   console.log("prev size", prevSize);
          //   return prevSize + 15;
          // });
        }
      }, 400);
    }
  }, [setLimitSize, setLimitSize]);

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
            hasMore={
              displayedSection.length <=
              getNotifsNumOptions.data?.getNotifsCount!
            }
            loadMore={() => setLimitSize((prevSize) => prevSize + 15)}

            pageStart={0}
            // useWindow={false}
            loader={
              <Center key={0}>
                <FastBigSpinner />
              </Center>
            }
          >
            {displayedSection &&
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
              ))}
          </InfiniteScroll>
        </Flex>
      </Flex>
    </>
  );
};
