import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Container,
  Flex,
  VStack,
  Button,
  Center,
} from "@chakra-ui/react";

interface RegisterFromProps { }

export const RegisterFrom: React.FC<RegisterFromProps> = () => {
  const submitRegisterForm = () => {
    console.log("sas");
  };
  return (
    <Container padding="0.4rem" shadow="base" color="green.600">
      <form onSubmit={() => submitRegisterForm()}>
        <FormControl id="username" isRequired my="5px" mx="2px">
          <FormLabel>username</FormLabel>
          <Input placeholder="username" />
        </FormControl>

        <FormControl id="email" isRequired my="5px">
          <FormLabel>email</FormLabel>
          <Input placeholder="email" />
        </FormControl>

        <FormControl id="password" isRequired my="5px">
          <FormLabel>password</FormLabel>
          <Input placeholder="password" />
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
