import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  Center,
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState({
    show: false,
    value: "",
  });
  const [login, { data, client }] = useLoginMutation();

  const history = useHistory();
  const submitLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit form");
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
          // cache.writeQuery<MeQuery>({
          //     query: MeDocument,
          //     data: {
          //         me: data.loginUser?.user
          //     }
          // })
          cache.writeQuery<IsUserLoggedInQuery>({
            query: IsUserLoggedInDocument,
            data: {
              isUserLoggedIn: true,
            },
          });
        },
      });
      if (response && response.data) {
        console.log(response.data);
        
        setAccessToken(response.data.loginUser?.accessToken!);
        history.push("/");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      setShowMessage({ show: true, value: error.message });
      console.log(error);
    }
  };
  return (
    <VStack padding="0.4rem" color="green.400" shadow="xl">
      <form onSubmit={(e) => submitLoginForm(e)}>
        <FormControl id="username" isRequired my="5px">
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        <FormControl id="password" isRequired my="5px">
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
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
    </VStack>
  );
};
