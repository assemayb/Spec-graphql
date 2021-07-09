import React from "react";
import { Container, Flex, Center, Box, Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom";
import {
    useIsUserLoggedInQuery,
    useLogoutMutation,
    useMeQuery,
} from "../generated/graphql";
import { useEffect } from "react";
import { setAccessToken } from "../accessToken";

interface Header2 { }
interface NavLink {
    route: string;
}

const LinkBox: React.FC<NavLink> = ({ route }) => {
    return (
        <Link to={route !== "home" ? route : "/"}>
            <Box
                mx="0.4rem"
                _hover={{
                    bgColor: "green.400",
                    borderRadius: "5px",
                }}
                padding="1.2rem"
            >
                {route}
            </Box>
        </Link>
    );
};

export const Header2: React.FC<Header2> = ({ }) => {
    const { data, loading, error } = useMeQuery();
    const [logoutUser, { client }] = useLogoutMutation();
    const loginState = useIsUserLoggedInQuery({
        fetchPolicy: "network-only",
    });

    const currentMode = useColorMode()
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

            <Flex flex="3">
                <LinkBox route="profile" />
                <Box display="flex" alignItems="center">
                    {/* user state section */}
                    <Button onClick={() => currentMode.toggleColorMode()} bgColor="blue.400">
                        {currentMode.colorMode == "dark" ? (
                            <MoonIcon />
                        ) : (<SunIcon />)}
                    </Button>
                    <Button
                        onClick={() => handleLogout()}
                        height="70%"
                        width="70%"
                        fontSize="medium"
                        fontWeight="bold"
                        bgColor="yellow.300"
                        mx="0.4rem"
                    >
                        Logout
                    </Button>
                </Box>
            </Flex>
        </Flex>
    );
};
