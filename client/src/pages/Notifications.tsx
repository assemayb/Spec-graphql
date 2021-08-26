/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMeLazyQuery } from "../generated/graphql";
import { HeaderComp } from "../smallComps/HeaderComp";

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

interface NotificationsProps {}
type ParamsObject = { userId: string };
export const Notifications: React.FC<NotificationsProps> = ({}) => {
  const params: ParamsObject = useParams();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(params.userId);
  }, [params.userId]);

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
          {Array.from({ length: 10 }, (v, k) => k).map((value, idx) => (
            <NotifItem key={idx} />
          ))}
        </Flex>
      </Flex>
    </>
  );
};