/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  FormLabel,
  Input,
  useDisclosure,
  FormControl,
  Button,
} from "@chakra-ui/react";

import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";
import {
  useListUserThreadsLazyQuery,
  useMeLazyQuery,
} from "../generated/graphql";
import { ProfileModal } from "../components/ProfileModal";
import { HeaderComp } from "../smallComps/HeaderComp";

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

interface SettingsSectionProps {}
export const SettingsSection: React.FC<SettingsSectionProps> = () => {
  const [meQuery, { data }] = useMeLazyQuery({
    fetchPolicy: "cache-and-network",
  });
  type User =  {
    username: string;
    email: string;
    spec: string | undefined;
  }
  const [userInfo, setUserInfo] = useState<User>({
    username: "",
    email: "",
    spec: undefined,
  });

  useEffect(() => {
    if (data?.me) {
      setUserInfo((prevData) => ({
        ...prevData,
        username: data?.me?.username!,
        email: data?.me?.email!,
      }));

      if (data?.me.isSpec === true) {
        setUserInfo((prevData) => ({
          ...prevData,
          spec: data?.me?.spec!,
        }));
      } else {
        setUserInfo((prevData) => ({
          ...prevData,
          spec: undefined,
        }));
      }
    }
  }, [data]);

  useEffect(() => {
    let isMounted = true;
    isMounted && meQuery();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Flex direction="column">
      <FormControl id="username" color="#718096" my="5px">
        <FormLabel
          marginLeft="10px"
          fontSize="20px"
          color="#718096"
          fontWeight="bold"
        >
          username
        </FormLabel>
        <Input
          borderRadius="-10px"
          color="black"
          p="1.3rem"
          value={userInfo.username}
          onChange={(e) =>
            setUserInfo((prevData) => ({
              ...prevData,
              username: e.target.value,
            }))
          }
        />
      </FormControl>

      <FormControl id="email" my="5px">
        <FormLabel
          marginLeft="10px"
          fontSize="20px"
          color="#718096"
          fontWeight="bold"
        >
          email
        </FormLabel>
        <Input
          borderRadius="-10px"
          type="email"
          color="black"
          p="1.3rem"
          value={userInfo.email}
          onChange={(e) =>
            setUserInfo((prevData) => ({
              ...prevData,
              email: e.target.value,
            }))
          }
        />
      </FormControl>
      {userInfo.spec !== undefined && (
        <FormControl id="spec" color="green.400" fontWeight="bold" my="5px">
          <FormLabel
            marginLeft="10px"
            fontSize="20px"
            color="#718096"
            fontWeight="bold"
          >
            specialization
          </FormLabel>
          <Input
            borderRadius="-10px"
            type="email"
            color="black"
            p="1.3rem"
            value={userInfo.spec}
            onChange={(e) =>
              setUserInfo((prevData) => ({
                ...prevData,
                spec: e.target.value,
              }))
            }
          />
        </FormControl>
      )}

      <Button
        marginTop="1.6rem"
        borderRadius="-10px"
        p="10px"
        type="submit"
        color="white"
        bg="green.300"
        _hover={{
          bg: "green.500",
        }}
      >
        update
      </Button>
    </Flex>
  );
};
export const Profile = () => {
  const [displayedSection, setDisplpayedSection] =
    useState<string>("Dashboard");
  const [sectionHeader, setSectionHeader] = useState("Dashboard");

  useEffect(() => {
    setSectionHeader(displayedSection);
  }, [displayedSection]);

  const [showModal, setShowModal] = useState(false);
  const [showThreadOptions, setShowThreadOptions] = useState(false);
  const { onClose } = useDisclosure({
    onClose: () => {
      setShowModal(false);
    },
  });
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
