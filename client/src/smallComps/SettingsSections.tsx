/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Flex, FormLabel, Input, FormControl, Button } from "@chakra-ui/react";

import { useMeLazyQuery, useUpdateUserMutation } from "../generated/graphql";

interface SettingsSectionProps {}

export const SettingsSection: React.FC<SettingsSectionProps> = () => {
  const [meQuery, { data }] = useMeLazyQuery({
    fetchPolicy: "cache-and-network",
  });
  useEffect(() => {
    let isMounted = true;
    isMounted && meQuery();
    return () => {
      isMounted = false;
    };
  }, []);

  type User = {
    username: string;
    email: string;
    spec: string | undefined;
  };
  const [userInfo, setUserInfo] = useState<User>({
    username: "",
    email: "",
    spec: undefined,
  });
  useEffect(() => {
    if (data?.me) {
      setUserInfo((prevData) => ({
        ...prevData,
        username: data?.me?.username!,
        email: data?.me?.email!,
      }));

      if (data?.me.isSpec === true) {
        setUserInfo((prevData) => ({
          ...prevData,
          spec: data?.me?.spec!,
        }));
      } else {
        setUserInfo((prevData) => ({
          ...prevData,
          spec: undefined,
        }));
      }
    }
  }, [data]);
  const [didInfoChange, setDidInfoChange] = useState(false);
  const [updateUserInfo] = useUpdateUserMutation();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDidInfoChange(true);
    setUserInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function submitNewInfo() {
    const { username, email, spec } = userInfo;
    console.log({ username, email, spec });

    try {
      let noEmptyVals = true;
      Object.values(userInfo).forEach((val) => {
        if (val === "") noEmptyVals = false;
      });

      noEmptyVals &&
        (await updateUserInfo({
          variables: {
            email,
            username,
            spec,
          },
        }));
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Flex direction="column">
      <FormControl id="username" color="#718096" my="5px">
        <FormLabel
          marginLeft="10px"
          fontSize="20px"
          color="#718096"
          fontWeight="bold"
        >
          username
        </FormLabel>
        <Input
          borderRadius="-10px"
          color="black"
          p="1.3rem"
          value={userInfo.username}
          name="username"
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="email" my="5px">
        <FormLabel
          marginLeft="10px"
          fontSize="20px"
          color="#718096"
          fontWeight="bold"
        >
          email
        </FormLabel>
        <Input
          borderRadius="-10px"
          type="email"
          color="black"
          p="1.3rem"
          name="email"
          value={userInfo.email}
          onChange={handleInputChange}
        />
      </FormControl>
      {userInfo.spec !== undefined && (
        <FormControl id="spec" color="green.400" fontWeight="bold" my="5px">
          <FormLabel
            marginLeft="10px"
            fontSize="20px"
            color="#718096"
            fontWeight="bold"
          >
            specialization
          </FormLabel>
          <Input
            borderRadius="-10px"
            type="email"
            color="black"
            p="1.3rem"
            name="spec"
            value={userInfo.spec}
            onChange={handleInputChange}
          />
        </FormControl>
      )}

      <Button
        onClick={() => submitNewInfo()}
        marginTop="1.6rem"
        borderRadius="-10px"
        p="10px"
        disabled={didInfoChange === false}
        type="submit"
        color="white"
        bg="green.300"
        _hover={{
          bg: "green.500",
        }}
      >
        update
      </Button>
    </Flex>
  );
};
