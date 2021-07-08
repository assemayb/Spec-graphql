import React from "react";
import { Container, Flex, Center, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom"

interface Header2 { }
interface NavLink {
    route: string
}

const LinkBox: React.FC<NavLink> = ({ route }) => {
    return (
        <Link to={route !== "/" ? route : "/"}>
            <Box
                _hover={{
                    bgColor: "green.400",
                    borderRadius: "5px"
                }}
                padding="1.2rem"
            >
                {route}
            </Box>
        </Link>
    )
}

export const Header2: React.FC<Header2> = ({ }) => {
    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            bgColor="green.200"
            fontSize="2xl"
            fontWeight="bold"
            color="white"
        >
            <Flex flex="9">
                <LinkBox route="home" />
                <LinkBox route="test" />
            </Flex>

            <Flex flex="3">
                <LinkBox route="profile" />
                <Box display="flex">
                    user state section
                </Box>
            </Flex>
        </Flex>
    );
};
