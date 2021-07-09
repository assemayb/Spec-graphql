import React from "react";
import { Container, Flex, Center, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface NavLink {
  route: string;
}

export const LinkBox: React.FC<NavLink> = ({ route }) => {
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
