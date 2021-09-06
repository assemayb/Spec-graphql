/* eslint-disable react-hooks/exhaustive-deps */

import { Flex, Center, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderComp } from "../smallComps/HeaderComp";
import InfiniteScroll from "react-infinite-scroller";
import { FastBigSpinner } from "../smallComps/Spinners";

interface NotifItemProps {
  handleClick: () => any;
  val: string;
}
export const NotifItem: React.FC<NotifItemProps> = ({ handleClick, val }) => {
  return (
    <>
      <Flex
        p="1.5rem"
        borderRadius="-20px"
        bgColor="gray.100"
        shadow="lg"
        fontSize="medium"
        fontWeight="bold"
        color="#335344"
        borderLeft="12px solid #718096"
        borderLeftRadius="4px"
        _hover={{
          bgColor: "gray.200",
        }}
        my="0.4rem"
        pos="relative"
      >
        {val}
        <Button bgColor="blue.300" pos="absolute" right="4px" top="2px" onClick={handleClick}>delete</Button>
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
  const params: { userId: string } = useParams();
  const [userId, setUserId] = useState("");
  const [notifs, setNotifs] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);

  const [end, setEnd] = useState(15);
  useEffect(() => {
    setUserId(params.userId);
  }, [params.userId]);

  useEffect(() => {
    const dummieData = createDummieData();
    const slicedSection = dummieData.slice(offset, end);
    setNotifs(slicedSection);
  }, [end, offset]);

  const handleLoadMore = () => {
    console.log(offset, end);
    setTimeout(() => {
      offset > 0 && setOffset(end);
      end < 200 && setEnd((prevEnd) => prevEnd + 10);
    }, 1000);

    // const hiddenDiv = document.getElementById("hidden")
    // hiddenDiv!.scrollIntoView({
    //   behavior: "smooth"
    // });
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
            hasMore={notifs.length < 200}
            loadMore={handleLoadMore}
            pageStart={0}
            // useWindow={false}
            loader={
              <Center key={0}>
                <FastBigSpinner />
              </Center>
            }
          >
            {notifs.map((val, index: number) => (
              <NotifItem
                key={index}
                val={val}
                handleClick={() => {
                  console.log("current item index is: ", index);
                  let x = notifs.filter((_, idx) => index !== idx);
                  console.log(x.length);

                  setNotifs(x);
                }}
              />
            ))}
          </InfiniteScroll>
        </Flex>
      </Flex>
    </>
  );
};
