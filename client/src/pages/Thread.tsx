import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
interface ThreadProps {}

export const Thread: React.FC<ThreadProps> = ({}) => {
  const params = useParams();
  useEffect(() => {
    console.log(params);
  }, [params]);

  return <Flex p="1rem">
      <h1>the thread</h1>
  </Flex>;
};
