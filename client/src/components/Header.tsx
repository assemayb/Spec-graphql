import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { useIsUserLoggedInQuery } from "../generated/graphql";

import { AiFillHome } from "react-icons/ai";
import { BiBookContent } from "react-icons/bi";

// smaller button/div elements of the header
import { LinkBox } from "../smallComps/LinkBox";
import { SmallSpinner } from "../smallComps/Spinners";
import { ProfileButton } from "../smallComps/ProfileBtn";
import { LogoutButton } from "../smallComps/LogoutBtn";
import { NotificationBtn } from "../smallComps/NotificationBtn";

interface HeaderProps {}
export const Header: React.FC<HeaderProps> = () => {
  const loginState = useIsUserLoggedInQuery({
    fetchPolicy: "network-only",
  });

  return (
    <Flex
      id="header-box"
      justifyContent="center"
      alignItems="center"
      bgColor="green.300"
      fontSize={["sm", "md", "large", "xl"]}
      fontWeight="bold"
      color="white"
      width="100%"
      height={["70px", "70px", "100px", "100px"]}
    >
      <Flex
        ml={{
          small: "0.1rem",
          base: "0.5rem",
        }}
        position="absolute"
        left={{ base: "1px", md: "1rem" }}
      >
        <LinkBox route="Home" icon={<AiFillHome width="20px" />} />
        <LinkBox route="topics" icon={<BiBookContent width="20px" />} />
      </Flex>

      <Flex
        position="absolute"
        alignItems="center"
        justifyContent="center"
        height="100px"
        right={{ base: "1px", md: "1rem" }}
      >
        {loginState && loginState.loading && (
          <Box marginLeft="5px">
            <SmallSpinner />
          </Box>
        )}
        {loginState && !loginState.data?.isUserLoggedIn ? (
          <ProfileButton isUserLogged={loginState.data?.isUserLoggedIn!} />
        ) : (
          <>
            <NotificationBtn />
            <ProfileButton isUserLogged={loginState.data?.isUserLoggedIn!} />
            <LogoutButton isUserLogged={loginState.data?.isUserLoggedIn!} />
          </>
        )}
      </Flex>
    </Flex>
  );
};
