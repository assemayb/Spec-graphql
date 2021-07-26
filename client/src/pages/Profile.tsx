import React, { useState, useEffect } from "react";
import { Box, Divider, Flex, Skeleton, useDisclosure } from "@chakra-ui/react";

import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";
import { useListUserThreadsQuery } from "../generated/graphql";
import { ProfileModal } from "../components/ProfileModal";
import { HeaderComp } from "../smallComps/HeaderComp";

export const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showThreadOptions, setShowThreadOptions] = useState(false);
  const { onClose } = useDisclosure({
    onClose: () => {
      setShowModal(false);
    },
  });
  const { data, loading, refetch } = useListUserThreadsQuery({
    fetchPolicy: "network-only",
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
      <ProfileModal
        refetchProfileThreads={refetch}
        setShowModal={setShowModal}
        showModal={showModal}
        onClose={onClose}
      />
      <HeaderComp threadsHeader={"Threads you created"} />
      <Flex marginTop="1rem">
        <Flex
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          flex="4"
          shadow="base"
          p={["0.2rem", "0.4rem", "1rem", "1rem"]}
        >
          {ThreadSection}
        </Flex>

        <Flex
          flex="1"
          // p={["0.2rem", "0.4rem", "1rem", "1rem"]}
          flexDirection="column"
          maxH="auto"
          marginX="8px"
        >
      
          <Box shadow="base" p={["0.2rem", "0.9rem", "1.2rem", "1.2rem"]}>
            <Box
              as="button"
              width="100%"
              height={{
                base: "40px",
                md: "80px"
              }}
              onClick={() => createNewThread()}
              textAlign="center"
              bgColor="green.300"
              color="Window"
              fontSize={{ base: "0.7rem", md: "1.2rem" }}
              borderRadius="-10px"
              fontWeight="bold"
              cursor="pointer"
              _hover={{
                bgColor: "green.500",
              }}
            >
              create new post
            </Box>
          </Box>

          {/* <QuestionForm refetch={refetch} /> */}
        </Flex>
      </Flex>
    </>
  );
};
