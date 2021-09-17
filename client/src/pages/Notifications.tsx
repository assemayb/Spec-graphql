/* eslint-disable react-hooks/exhaustive-deps */

import { Flex, Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { HeaderComp } from "../smallComps/HeaderComp";
import InfiniteScroll from "react-infinite-scroller";
import { FastBigSpinner } from "../smallComps/Spinners";
import { useListUserNotifsLazyQuery } from "../generated/graphql";

interface NotifItemProps {
  handleClick: () => any;
  val: string;
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
        // borderLeftRadius="4px"
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

const createDummieData = () => {
  const someWord = (num: any) => `${num}+${num}+${num}+${num}+${num}`;
  return Array.from({ length: 200 }, (_, idx) => someWord(idx));
};

interface NotificationsProps {}

export const Notifications: React.FC<NotificationsProps> = () => {
  const [listNotifs, listNotifsOptions] = useListUserNotifsLazyQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    const { data } = listNotifsOptions;
    const notifs = data?.listUserNotifs;
    console.log(notifs);
  }, [listNotifs, listNotifsOptions.data]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      listNotifs();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const [offset, setOffset] = useState(0);

  const [end, setEnd] = useState(5);

  useEffect(() => {
    const dummieData = createDummieData();
    const slicedSection = dummieData.slice(offset, end);
  }, [end, offset]);

  const handleLoadMore = () => {
    setTimeout(() => {
      offset > 0 && setOffset(end);
      end < 200 && setEnd((prevEnd) => prevEnd + 10);
    }, 1000);
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
            hasMore={listNotifsOptions.data?.listUserNotifs.length! < 200}
            loadMore={handleLoadMore}
            pageStart={0}
            // useWindow={false}
            loader={
              <Center key={0}>
                <FastBigSpinner />
              </Center>
            }
          >
            {listNotifsOptions.data?.listUserNotifs.map(
              (val, index: number) => (
                <NotifItem
                  key={index}
                  val={val.text!}
                  // handleClick={() => {
                  //   let x = notifs.filter((_, idx) => index !== idx);
                  //   setNotifs(x);
                  // }}
                  handleClick={() => console.log("click event")}
                />
              )
            )}
          </InfiniteScroll>
        </Flex>
      </Flex>
    </>
  );
};
