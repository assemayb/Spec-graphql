import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Container,
} from "@chakra-ui/react";
import {
  IsUserLoggedInDocument,
  IsUserLoggedInQuery,
  useLoginMutation,
} from "../generated/graphql";
import { useHistory } from "react-router-dom";
import { setAccessToken } from "../accessToken";

export const LoginFrom = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState({
    show: false,
    value: "",
  });
  const history = useHistory();
  const [login] = useLoginMutation({
    onCompleted: () => {
      setUsername("");
      setPassword("");
      history.push("/");
    },
  });
  const submitLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({
        variables: {
          username,
          password,
        },
        update: (cache, { data }) => {
          if (!data) {
            return null;
          }
          cache.writeQuery<IsUserLoggedInQuery>({
            query: IsUserLoggedInDocument,
            data: {
              isUserLoggedIn: true,
            },
          });
        },
      });
      if (response && response.data) {
        setAccessToken(response.data.loginUser?.accessToken!);
      }
    } catch (error) {
      setShowMessage({ show: true, value: error.message });
      console.log(error);
    }
  };
  return (
    <Container padding="0.4rem" color="green.400">
      <form onSubmit={(e) => submitLoginForm(e)}>
        <FormControl id="username" isRequired my="5px">
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        <FormControl id="password" isRequired my="5px">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Center>
          <Button my="10px" p="10px" type="submit">
            login
          </Button>
        </Center>
      </form>
    </Container>
  );
};
