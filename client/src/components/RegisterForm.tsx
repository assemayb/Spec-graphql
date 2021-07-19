import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Container,
  Button,
  Center,
  Switch,
} from "@chakra-ui/react";
import { useRegisterMutation } from "../generated/graphql";

interface RegisterFromProps {}

export const RegisterFrom: React.FC<RegisterFromProps> = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [specOptions, setSpecOptions] = useState({
    showField: false,
    fieldValue: "",
  });

  const [register] = useRegisterMutation();

  const submitRegisterForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !password) {
      return console.log("enter some data");
    }
    const isSpec = specOptions.showField;
    const spec = specOptions.fieldValue;
    register({
      variables: {
        username: username,
        email: email,
        password: password,
        isSpec: isSpec,
        spec: spec,
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
        {specOptions.showField === true && (
          <FormControl id="spec-value" isRequired my="5px">
            <FormLabel>specialization</FormLabel>
            <Input
              value={specOptions.fieldValue}
              onChange={(e) =>
                setSpecOptions((value) => {
                  return {
                    ...value,
                    fieldValue: e.target.value,
                  };
                })
              }
            />
          </FormControl>
        )}
        <FormControl display="flex" alignItems="center" my="5px">
          <FormLabel htmlFor="email-alerts" mb="0">
            Creating a specialist account?
          </FormLabel>
          <Switch
            onChange={(e) =>
              setSpecOptions((value) => {
                return { ...value, showField: !value.showField };
              })
            }
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
