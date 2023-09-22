import React from "react";
import { Flex, Center, HStack, Text, Spacer } from "@chakra-ui/react";
import { ImYoutube, ImTwitter, ImFacebook2 } from "react-icons/im";

const Footer = () => {
  return (
    <Flex h="100%" px="64px" pb="8px" align="center" justify="space-between">
      <Center w="auto">
        <Text>©2023, All Rights Reserved</Text>
      </Center>
      <Center w="auto">
        <HStack>
          <ImYoutube />
          <Spacer />
          <ImTwitter />
          <Spacer />
          <ImFacebook2 />
        </HStack>
      </Center>
      <Center w="auto">
        <HStack>
          <Text>Contact us</Text>
          <Spacer />
          <Text>Private Policy</Text>
          <Spacer />
          <Text>Help</Text>
        </HStack>
      </Center>
    </Flex>
  );
};

export default Footer;
