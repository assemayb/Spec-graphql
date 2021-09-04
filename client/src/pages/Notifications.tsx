/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMeLazyQuery } from "../generated/graphql";
import { HeaderComp } from "../smallComps/HeaderComp";

import InfiniteScroll from "react-infinite-scroller";

import { FastBigSpinner } from "../smallComps/Spinners";

export const NotifItem = () => {
  return (
    <Flex
      p="1.5rem"
      borderRadius="-20px"
      bgColor="gray.100"
      shadow="lg"
      fontSize="medium"
      fontWeight="bold"
      color="#335344"
      borderLeft="8px solid #718096"
      // borderLeft="8px solid red"
      borderLeftRadius="4px"
      _hover={{
        bgColor: "gray.200",
      }}
      my="0.4rem"
      pos="relative"
    >
      sasfasfkasmfklasmfklsmfklsmflasmf
    </Flex>
  );
};

const createDummieData = () => {
  const someWord = "sasfasfkasmfklasmfklsmfklsmflasmf";
  return Array.from({ length: 200 }, () => someWord);
};

interface NotificationsProps {}
type ParamsObject = { userId: string };
export const Notifications: React.FC<NotificationsProps> = ({}) => {
  const params: ParamsObject = useParams();
  const [userId, setUserId] = useState("");

  const [notifs, setNotifs] = useState<string[]>([]);

  const [offset, setOffset] = useState(0);
  const [end, setEnd] = useState(10);

  useEffect(() => {
    console.log(userId);
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
    }, 1500);
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
            loader={<div key="loading">Loading ...</div>}
          >
            {/* {Array.from({ length: 300 }, (v, k) => k).map((value, idx) => (
              <NotifItem key={idx} />
            ))} */}

            {notifs.map((_, idx) => (
              <NotifItem key={idx} />
            ))}
          </InfiniteScroll>
        </Flex>
      </Flex>
    </>
  );
};
