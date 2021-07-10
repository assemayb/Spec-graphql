import React, { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Button,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import {
  IsUserLoggedInDocument,
  useIsUserLoggedInQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";

import { setAccessToken } from "../accessToken";
import { AiFillHome } from "react-icons/ai";

import { ModalComponent } from "../components/Modal";
import { LinkBox } from "../smallComps/LinkBox";
import { SmallSpinner } from "../smallComps/Spinners";

interface ProfileButtonProps {
  isUserLogged: boolean;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ isUserLogged }) => {
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => setShowModal(false),
    onOpen: () => console.log("Modal is Open"),
  });

  const router = useHistory();
  const handleProfileClick = () => {
    if (isUserLogged === true) {
      router.push("/profile");
    } else {
      console.log("user is not logged in");
      setShowModal(true);
    }
  };
  return (
    <>
      <ModalComponent showModal={showModal} onClose={onClose}/>
      <Button
        onClick={() => handleProfileClick()}
        height="70%"
        width="70%"
        fontSize="medium"
        fontWeight="bold"
        bgColor="green.400"
        _hover={{
          bgColor: "green.500",
        }}
        mx="0.4rem"
      >
        profile
      </Button>
    </>
  );
};

interface LogoutButtonProps extends ProfileButtonProps {}
const LogoutButton: React.FC<LogoutButtonProps> = ({ isUserLogged }) => {
  const [logoutUser, { client }] = useLogoutMutation();

  const handleLogout = async () => {
    if (isUserLogged) {
      await logoutUser();
      setAccessToken("");
      await client.resetStore();
    } else {
      console.log("No logged in User");
    }
  };
  return (
    <Button
      onClick={() => handleLogout()}
      height="70%"
      width="70%"
      fontSize="medium"
      fontWeight="bold"
      bgColor="green.400"
      _hover={{
        bgColor: "green.500",
      }}
      mx="0.4rem"
    >
      Logout
    </Button>
  );
};

interface Header2Props {}
export const Header2: React.FC<Header2Props> = ({}) => {
  const { data, loading, error } = useMeQuery();

  const currentMode = useColorMode();

  const loginState = useIsUserLoggedInQuery({
    fetchPolicy: "network-only",
  });

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      bgColor="green.300"
      fontSize="2xl"
      fontWeight="bold"
      color="white"
    >
      <Flex ml="1rem" flex="9">
        <LinkBox route="Home" icon={<AiFillHome width="20px" />} />
        <LinkBox route="test" />
      </Flex>

      <Flex flex="3" height="100px" alignItems="center" justifyContent="center">
        <Button
          onClick={() => currentMode.toggleColorMode()}
          bgColor="green.400"
          _hover={{
            bgColor: "green.500",
          }}
          height="70%"
        >
          {currentMode.colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        {loginState && loginState.loading && <SmallSpinner />}
        {loginState && !loginState.data?.isUserLoggedIn ? (
          <ProfileButton isUserLogged={loginState.data?.isUserLoggedIn!} />
        ) : (
          <LogoutButton isUserLogged={loginState.data?.isUserLoggedIn!} />
        )}
      </Flex>
    </Flex>
  );
};
