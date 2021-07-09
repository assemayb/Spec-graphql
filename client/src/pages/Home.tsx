import React, { useState, useEffect } from "react";
import { useIsUserLoggedInQuery } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { Box, Container, Flex, VStack, Button } from "@chakra-ui/react";
import { LoginFrom } from "../components/LoginFrom";
import { RegisterFrom } from "../components/RegisterForm";

interface HomeProps {}

export const Home: React.FC<RouteComponentProps> = ({ history, location }) => {
  const [date, setDate] = useState("2018-07-22");
  return (
    <Container padding="2rem" margin="1rem">
      <div>home page stuff here comp.</div>
      <LoginFrom />
      <hr />
      <RegisterFrom />
    </Container>
  );
};
