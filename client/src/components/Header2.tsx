import React, { useState, useEffect } from "react";
import { Container, Flex, Button, useColorMode } from "@chakra-ui/react";
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

interface Header2 {}
export const Header2: React.FC<Header2> = ({}) => {
  const { data, loading, error } = useMeQuery();
  const [logoutUser, { client }] = useLogoutMutation();
  const loginState = useIsUserLoggedInQuery({
    fetchPolicy: "network-only",
  });
  const loginStateLoading = loginState.loading;
  const loginStateData = loginState.data;

  const router = useHistory();
  const currentMode = useColorMode();

  let UserSecion: any = null;

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

  const handleProfileClick = () => {
    // if (loginState.data == true) {
    //   router.push("/profile");
    // } else {
    //   console.log("user is not logged in");
    // }
  };

  useEffect(() => {
    const isLogged = loginState.data;
    const isLoading = loginState.loading;
    console.log(isLogged, isLoading);

    // if (isLoading) {
    //   UserSecion = <SmallSpinner />;
    // }
    // if (isLogged == true) {
    //   UserSecion = (
    //     <Button
    //       onClick={() => handleLogout()}
    //       height="70%"
    //       width="70%"
    //       fontSize="medium"
    //       fontWeight="bold"
    //       bgColor="green.400"
    //       _hover={{
    //         bgColor: "green.500",
    //       }}
    //       mx="0.4rem"
    //     >
    //       Logout
    //     </Button>
    //   );
    // }

    // if (isLogged == false) {
    //   UserSecion = (
    //     <Button
    //       onClick={() => handleProfileClick()}
    //       height="70%"
    //       width="70%"
    //       fontSize="medium"
    //       fontWeight="bold"
    //       bgColor="green.400"
    //       _hover={{
    //         bgColor: "green.500",
    //       }}
    //       mx="0.4rem"
    //     >
    //       profile
    //     </Button>
    //   );
    // }
  }, [loginStateData, loginStateLoading]);

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
          {currentMode.colorMode == "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        {UserSecion}
      </Flex>
    </Flex>
  );
};
