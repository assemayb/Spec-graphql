import React from "react";
import {
  Container,
  Flex,
  Center,
  Box,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import {
  useIsUserLoggedInQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import { useEffect } from "react";
import { setAccessToken } from "../accessToken";
import { LinkBox } from "../smallComps/LinkBox";



interface Header2 {}

export const Header2: React.FC<Header2> = ({}) => {
  const { data, loading, error } = useMeQuery();
  const [logoutUser, { client }] = useLogoutMutation();
  const loginState = useIsUserLoggedInQuery({
    fetchPolicy: "network-only",
  });

  const currentMode = useColorMode();
  useEffect(() => {
    console.log(loginState);
    console.log(loginState.data);
    console.log(currentMode.colorMode);
  }, []);

  const handleLogout = async () => {
    const isUserLogged = loginState.data;
    if (isUserLogged) {
      await logoutUser();
      setAccessToken("");
      await client.resetStore();
    } else {
      console.log("No logged in User");
    }
  };
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
        <LinkBox route="home" />
        <LinkBox route="test" />
      </Flex>

      <Flex flex="3" height="100px" alignItems="center" justifyContent="center">
        <Button
          onClick={() => currentMode.toggleColorMode()}
          bgColor="green.400"
          height="70%"
        >
          {currentMode.colorMode == "dark" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Button
          onClick={() => handleLogout()}
          height="70%"
          width="70%"
          fontSize="medium"
          fontWeight="bold"
          bgColor="green.400"
          mx="0.4rem"
        >
          profile
        </Button>
        <Button
          onClick={() => handleLogout()}
          height="70%"
          width="70%"
          fontSize="medium"
          fontWeight="bold"
          bgColor="green.400"
          mx="0.4rem"
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};
