import React, { useEffect, useState, useLayoutEffect } from "react";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
// import InfiniteScroll from 'react-infinite-scroller';

import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";
import {
  useGetUserThreadsNumberLazyQuery,
  useListUserThreadsLazyQuery,
} from "../generated/graphql";
import { ProfileModal } from "../components/ProfileModal";
import { HeaderComp } from "../smallComps/HeaderComp";
import { SettingsSection } from "../smallComps/SettingsSections";
import { getAccessToken } from "../accessToken";

interface SideBtnProps {
  text: string;
  onClick: () => any;
}
export const SideBtn: React.FC<SideBtnProps> = ({ onClick, text }) => {
  return (
    <Box
      as="button"
      boxShadow="inner"
      marginTop={text !== "New Thread" ? "0.5rem" : ""}
      p={["0.4rem", "0.5rem", "0.8rem", "1.2rem"]}
      onClick={() => onClick()}
      textAlign="center"
      bgColor="green.300"
      color="Window"
      fontSize={{
        base: text === "New Thread" ? "0.7rem" : "0.9rem",
        md: "1.4rem",
      }}
      borderRadius="-10px"
      fontWeight="bold"
      cursor="pointer"
      _hover={{
        bgColor: "green.500",
      }}
    >
      {text}
    </Box>
  );
};

const QuerySize = 3;

export const Profile = () => {
  const [displayedSection, setDisplpayedSection] = useState("Dashboard");
  useEffect(() => setSectionHeader(displayedSection), [displayedSection]);

  const [sectionHeader, setSectionHeader] = useState("Dashboard");
  const [showModal, setShowModal] = useState(false);
  const [showThreadOptions, setShowThreadOptions] = useState(false);
  const [hideLoadMoreBtn, setHideLoadMoreBtn] = useState(false);

  const [getUserThreadsNum, userThreadsNumOptions] =
    useGetUserThreadsNumberLazyQuery({
      fetchPolicy: "network-only",
    });
  const [listUserQuery, { data, loading, fetchMore, refetch }] =
    useListUserThreadsLazyQuery({
      fetchPolicy: "network-only",
      variables: {
        offset: 0,
        limit: QuerySize,
      },
    });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getUserThreadsNum();
      listUserQuery();
      
    }
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   let isMounted = true;
  //   if (isMounted) {
  //     listUserQuery();
  //   }
  //   return () => {
  //     isMounted = false;
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userThreadsNumOptions]);


  useEffect(() => {
    if (data) {
      const fetchedThreadsCount = data?.listUserThreads?.length;
      const userThreadsNum = userThreadsNumOptions.data?.getUserThreadsNumber;
      if (fetchedThreadsCount === userThreadsNum) setHideLoadMoreBtn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // if the "profile" path was typed in the address
  useLayoutEffect(() => {
    const token = getAccessToken();
    if (token === "") {
      document.location.assign("/");
    }
  }, []);

  // after creating a new thread
  const { onClose } = useDisclosure({ onClose: () => setShowModal(false) });

  function loadMore() {
    const fetchedThreadsCount = data?.listUserThreads?.length;
    console.log("fetchedThreadsCount", fetchedThreadsCount);

    fetchMore!({
      variables: {
        offset: fetchedThreadsCount,
        limit: QuerySize,
      },
    });
  }

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

        <Flex justify="center" p="1rem" marginTop="0.2rem">
          {hideLoadMoreBtn === false && (
            <Button
              onClick={() => loadMore()}
              p="1rem"
              fontWeight="semibold"
              bg="green.300"
              color="white"
              borderRadius="-20px"
            >
              load more
            </Button>
          )}
        </Flex>
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
      <HeaderComp header={sectionHeader!} />
      <Flex marginTop="1rem">
        {displayedSection === "Dashboard" ? (
          <Flex
            flexDirection="column"
            flex="5"
            minH="80vh"
            shadow="base"
            p={["0.2rem", "0.4rem", "1rem", "1rem"]}
          >
            {ThreadSection}
          </Flex>
        ) : (
          <Flex
            flexDirection="column"
            flex="5"
            minH="80vh"
            shadow="base"
            p={["0.2rem", "0.4rem", "1rem", "1rem"]}
          >
            <SettingsSection />
          </Flex>
        )}

        <Flex
          flex="1"
          flexDirection="column"
          p={{ base: "0.4rem", md: "2rem" }}
        >
          <SideBtn text="New Thread" onClick={() => setShowModal(true)} />
          <SideBtn
            text="Dashboard"
            onClick={() => setDisplpayedSection("Dashboard")}
          />
          <SideBtn
            text="settings"
            onClick={() => setDisplpayedSection("Settings")}
          />
        </Flex>
      </Flex>
    </>
  );
};
