/* eslint-disable react-hooks/exhaustive-deps */

import { Flex, Button, Tooltip } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

import {
  NotificationType,
  useGetThreadByReplyQuery,
} from "../generated/graphql";
import { useHistory } from "react-router";
import { BiTrash, BiArrowToRight } from "react-icons/bi";

interface NotifItemProps {
  val?: string;
  data?: NotificationType;
  deleteNotifMutation: any;
}

export const NotifItem: React.FC<NotifItemProps> = ({
  val,
  data,
  deleteNotifMutation,
}) => {

  const repID = data?.replyId;
  const repText = data?.text;

  const notificationInfo = useGetThreadByReplyQuery({
    variables: {
      replyId: data?.replyId as number,
    },
    fetchPolicy: "network-only",
  });

  const [showDelBtn, setShowDelBtn] = useState(false);
  const notifThreadId = notificationInfo.data?.getThreadByReplyId;

  const history = useHistory();
  function goToThread() {
    history.push(`/threads/${notifThreadId}`, {
      repID: repID,
      repText: repText,
    });
  }

  function deleteNotif() {
    deleteNotifMutation({
      variables: {
        id: data?.id!,
      },
    });
  }
  return (
    <>
      <Flex
        onMouseOver={() => setShowDelBtn(true)}
        onMouseLeave={() => setShowDelBtn(false)}
        p="1.2rem"
        borderRadius="-20px"
        justify="space-between"
        flexDirection="row"
        //TODO:  make it darker if not openned
        bgColor="gray.100"
        shadow="base"
        fontSize="1.3rem"
        fontWeight="bold"
        color="#335344"
        minH="80px"
        // borderLeft="7px solid #1e8244"
        textAlign="left"
        _hover={{
          bgColor: "gray.200",
        }}
        my="0.3rem"
        pos="relative"
        lineHeight="tall"

      >
        <div style={{ width: "80%", cursor: "pointer" }} onClick={goToThread}>
          {val}
        </div>
        {showDelBtn && (
          <div>
            <Tooltip label="visit this reply">
              <Button
                onClick={goToThread}
                bgColor="gray.300"
                borderRadius="-50px"
                fontSize="20px"
                marginRight="5px"
                _hover={{
                  bgColor: "blue.300",
                  color: "white",
                }}
              >
                <BiArrowToRight />
              </Button>
            </Tooltip>

            <Tooltip label="delete">
              <Button
                onClick={() => deleteNotif()}
                borderRadius="-50px"
                fontSize="20px"
                bgColor="gray.300"
                _hover={{
                  bgColor: "red.300",
                  color: "white",
                }}
              >
                <BiTrash />
              </Button>
            </Tooltip>
          </div>
        )}
      </Flex>
    </>
  );
};
