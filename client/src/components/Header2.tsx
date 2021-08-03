import React, { useState } from "react";
import {
  Flex,
  Button,
  useDisclosure,
  Box,
  Tooltip,
  Center,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import {
  IsUserLoggedInDocument,
  IsUserLoggedInQuery,
  useIsUserLoggedInQuery,
  useLogoutMutation,
} from "../generated/graphql";

import { setAccessToken } from "../accessToken";
import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { BiBookContent, BiNotification } from "react-icons/bi";

import { ModalComponent } from "../components/Modal";
import { LinkBox } from "../smallComps/LinkBox";
import { SmallSpinner } from "../smallComps/Spinners";

interface ProfileButtonProps {
  isUserLogged: boolean;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ isUserLogged }) => {
  const [showModal, setShowModal] = useState(false);
  const { onClose } = useDisclosure({
    onClose: () => setShowModal(false),
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
        id="profile-btn"
        onClick={() => handleProfileClick()}
        height={["30%", "30%", "50%", "50%"]}
        fontSize={["sm", "sm", "medium", "medium"]}
        fontWeight="bold"
        bgColor="green.400"
        borderRadius="-10px"
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
  const [logoutUser] = useLogoutMutation();
  const history = useHistory();

  const handleLogout = async () => {
    if (isUserLogged) {
      setAccessToken("");
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
      // await client.resetStore()
      history.push("/");
    }
  };

  return (
    <Button
      onClick={() => handleLogout()}
      height={["30%", "30%", "50%", "50%"]}
      fontSize={["sm", "sm", "medium", "medium"]}
      fontWeight="bold"
      bgColor="green.400"
      borderRadius="-10px"
      _hover={{
        bgColor: "green.500",
      }}
      mx="0.4rem"
    >
      Logout
    </Button>
  );
};

const NotificationBtn = () => {
  return (
    <>
      <Tooltip label="show notifications">
        <Center>
          <Box
            onClick={() => console.log("notifyyyyyyy")}
            height={["30%", "30%", "50%", "50%"]}
            fontSize={["sm", "sm", "medium", "medium"]}
            fontWeight="bold"
            bgColor="green.300"
            mx="0.4rem"
          >
            <BiNotification size="40px" />
          </Box>
        </Center>
      </Tooltip>
    </>
  );
};
interface Header2Props {}
export const Header2: React.FC<Header2Props> = () => {
  // const { data, loading, error } = useMeQuery();
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
