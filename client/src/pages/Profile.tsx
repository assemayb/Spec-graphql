import React, { useState, useEffect } from "react";
import {
  useIsUserLoggedInQuery,
  useListThreadsQuery,
} from "../generated/graphql";

import { Box, Divider, Flex, useDisclosure } from "@chakra-ui/react";

import { QuestionForm } from "../smallComps/QuestionForm";
import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";
import { useListUserThreadsQuery } from "../generated/graphql";
import { ProfileModal } from "../components/ProfileModal";

export const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showThreadOptions, setShowThreadOptions] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => setShowModal(false),
  });
  const { data, loading, refetch } = useListUserThreadsQuery({
    fetchPolicy: "cache-and-network",
  });
  const createNewThread = () => setShowModal(true);

  let ThreadSection: any = null;
  if (loading) {
    ThreadSection = <FastBigSpinner />;
  } else if (data) {
    ThreadSection = (
      <>
        {data.listUserThreads?.map((thread, idx) => {
          return (
            <QuestionBox
              key={idx}
              threadId={thread.id}
              question={thread.question}
              createdAt={thread.createdAt}
              specializtion={thread.specialization}
              showThreadOptions={showThreadOptions}
              setShowThreadOptions={setShowThreadOptions}
              refetchProfileThreads={refetch}
            />
          );
        })}
      </>
    );
  }
  return (
    <>
      <ProfileModal showModal={showModal} onClose={onClose} />
      <Box
        marginLeft="1rem"
        marginY="1rem"
        fontSize="30px"
        fontFamily="fantasy"
        fontWeight="bold"
        color="gray.500"
        textShadow="lg"
      >
        Threads created by you
        <Divider mt="0.5rem" w="350px" />
      </Box>
      <Flex marginRight="auto" marginLeft="auto" marginTop="2rem">
        <Flex
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          flex="4"
          shadow="base"
          p="1rem"
        >
          {ThreadSection}
        </Flex>

        <Flex
          flex="1"
          p="1rem"
          flexDirection="column"
          maxH="auto"
          marginX="8px"
        >
          <Box p="1rem" shadow="base" marginBottom="2rem">
            <Box
              as="button"
              width="100%"
              onClick={() => createNewThread()}
              textAlign="center"
              p="0.8rem"
              bgColor="green.300"
              color="Window"
              borderRadius="-10px"
              fontWeight="bold"
              cursor="pointer"
              _hover={{
                bgColor: "green.500",
              }}
              marginY="3px"
            >
              create a new thread
            </Box>
          </Box>

          {/* <QuestionForm refetch={refetch} /> */}
        </Flex>
      </Flex>
    </>
  );
};
