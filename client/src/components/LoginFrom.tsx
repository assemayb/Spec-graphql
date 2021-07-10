import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  Center,
  Heading,
} from "@chakra-ui/react";

export const LoginFrom = () => {
  const submitLoginForm = () => {
    console.log("submit form");
  };
  return (
    <VStack padding="0.4rem" color="green.400" shadow="base">
      <form onSubmit={() => submitLoginForm()}>
        <FormControl id="username" isRequired my="5px">
          <FormLabel>Username</FormLabel>
          <Input placeholder="username" />
        </FormControl>

        <FormControl id="password" isRequired my="5px">
          <FormLabel>Password</FormLabel>
          <Input placeholder="password" />
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
