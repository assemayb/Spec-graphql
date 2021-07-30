import React from "react";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface NavLink {
  route: string;
  icon?: ReactNode;
}

export const LinkBox: React.FC<NavLink> = ({ route, icon }) => {
  return (
    <Link to={route !== "Home" ? `/${route}` : "/"}>
      <Box
        as="button"
        fontWeight="bold"
        _hover={{
          bgColor: "green.400",
          borderRadius: "-10px"
        }}
        padding="1rem"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box marginRight="6px">{icon}</Box> {route}
        </Box>
      </Box>
    </Link>
  );
};
