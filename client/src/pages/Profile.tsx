/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";

import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";
import { useListUserThreadsLazyQuery } from "../generated/graphql";
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
  // const { data, loading, refetch } = useListUserThreadsQuery({
  //   fetchPolicy: "network-only",
  // });
  const [listUserQuery, { data, loading, refetch }] =
    useListUserThreadsLazyQuery({
      fetchPolicy: "network-only",
    });
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      listUserQuery();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log("the refetch function is called");
  }, [refetch]);
  
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
          // justifyContent="center"
          flexDirection="column"
          // alignItems="center"
          flex="4"
          minH="80vh"
          shadow="base"
          p={["0.2rem", "0.4rem", "1rem", "1rem"]}
        >
          {ThreadSection}
        </Flex>

        <Flex
          flex="1"
          flexDirection="column"
          p={{ base: "0.8rem", md: "2rem" }}
        >
          <Box
            as="button"
            boxShadow="lg"
            p={["0.4rem", "0.5rem", "0.8rem", "1.2rem"]}
            onClick={() => createNewThread()}
            textAlign="center"
            bgColor="green.300"
            color="Window"
            fontSize={{ base: "1rem", md: "1.4rem" }}
            borderRadius="-10px"
            fontWeight="bold"
            cursor="pointer"
            _hover={{
              bgColor: "green.500",
            }}
          >
            create new post
          </Box>

          {/* <QuestionForm refetch={refetch} /> */}
        </Flex>
      </Flex>
    </>
  );
};
