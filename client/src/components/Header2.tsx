import React, { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Button,
  useColorMode,
  useDisclosure,
  Center,
  Box,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import {
  IsUserLoggedInDocument,
  IsUserLoggedInQuery,
  useIsUserLoggedInQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";

import { setAccessToken } from "../accessToken";
import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { BiBookContent } from "react-icons/bi";

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
      setShowModal(true);
    }
  };
  return (
    <>
      <ModalComponent showModal={showModal} onClose={onClose} />
      <Button
        onClick={() => handleProfileClick()}
        height="50%"
        fontSize="medium"
        fontWeight="bold"
        bgColor="green.400"
        _hover={{
          bgColor: "green.500",
        }}
        mx="0.4rem"
      >
        <AiOutlineUser width="40px" />

        <span style={{ marginLeft: "4px" }}>profile</span>
      </Button>
    </>
  );
};

interface LogoutButtonProps extends ProfileButtonProps {}
const LogoutButton: React.FC<LogoutButtonProps> = ({ isUserLogged }) => {
  const [logoutUser, { client }] = useLogoutMutation();
  
  useEffect(() => {
    console.log(isUserLogged);
    
  }, [isUserLogged])

  const handleLogout = async () => {
    if (isUserLogged) {
      await logoutUser({
        update: async (cache, _) => {
          cache.writeQuery<IsUserLoggedInQuery>({
            query: IsUserLoggedInDocument,
            data: {
              isUserLoggedIn: false,
            },
          });
        },
      });
      setAccessToken("");
      // await client.resetStore();
    }
  };

  return (
    <Button
      onClick={() => handleLogout()}
      height="50%"
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
   
  useEffect(() => {
    console.log(data?.me);    
  })

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      bgColor="green.200"
      height="80px"
      fontSize="xl"
      fontWeight="bold"
      color="white"
      position="relative"
      width="100%"
    >
      <Flex ml="1rem" position="absolute" left="2px">
        <LinkBox route="Home" icon={<AiFillHome width="20px" />} />
        <LinkBox route="topics" icon={<BiBookContent width="20px" />} />
        <LinkBox route="test" />
      </Flex>

      <Flex
        marginRight="8px"
        height="100px"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        right="8px"
      >
        {/* <Button
          onClick={() => currentMode.toggleColorMode()}
          bgColor="green.400"
          _hover={{
            bgColorome: "green.500",
          }}
          height="50%"
        >
          {currentMode.colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button> */}

        {loginState && loginState.loading && (
          <Box marginLeft="5px">
            <SmallSpinner />
          </Box>
        )}
        {loginState && !loginState.data?.isUserLoggedIn ? (
          <ProfileButton isUserLogged={loginState.data?.isUserLoggedIn!} />
        ) : (
          <>
            <ProfileButton isUserLogged={loginState.data?.isUserLoggedIn!} />
            <LogoutButton isUserLogged={loginState.data?.isUserLoggedIn!} />
          </>
        )}
      </Flex>
    </Flex>
  );
};
