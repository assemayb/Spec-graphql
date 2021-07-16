import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Container,
  Button,
  Center,
} from "@chakra-ui/react";
import { useRegisterMutation } from "../generated/graphql";

interface RegisterFromProps {}

export const RegisterFrom: React.FC<RegisterFromProps> = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register] = useRegisterMutation();

  const submitRegisterForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !password) {
      return console.log("enter some data");
    }
    register({
      variables: {
        username,
        email,
        password,
      },
    }).then((response) => {
      console.log(response);
    });
    setEmail("");
    setUsername("");
    setPassword("");
  };
  return (
    <Container padding="0.4rem" color="green.600">
      <form onSubmit={(e) => submitRegisterForm(e)}>
        <FormControl id="username" isRequired my="5px" mx="2px">
          <FormLabel>username</FormLabel>
          <Input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        <FormControl id="email" isRequired my="5px">
          <FormLabel>email</FormLabel>
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="password" isRequired my="5px">
          <FormLabel>password</FormLabel>
          <Input
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Center>
          <Button my="10px" p="10px" type="submit">
            register
          </Button>
        </Center>
      </form>
    </Container>
  );
};
