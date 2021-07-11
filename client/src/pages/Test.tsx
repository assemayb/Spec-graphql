import React from "react";
import { getAccessToken } from "../accessToken";
import { useUsersListQuery } from "../generated/graphql";
import { Box, Container, Flex, VStack, Button } from "@chakra-ui/react";


interface TestProps {}

export const Test: React.FC<TestProps> = () => {
  const { data, error, loading } = useUsersListQuery({
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <div>loading......</div>;
  }

  return (
    <Container p="2rem" m="1rem">
      <h1>Current Users:</h1>
      <ul>
        {data?.getAllUsers?.map((user, idx) => (
          <li key={idx}>
            {user.email}, {user.username}
          </li>
        ))}
      </ul>
    </Container>
  );
};
