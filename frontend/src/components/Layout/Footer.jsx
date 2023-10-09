import React from "react";
import {
  Flex,
  Center,
  HStack,
  Text,
  Spacer,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { ImYoutube, ImTwitter, ImFacebook2 } from "react-icons/im";

const Footer = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <VStack spacing={2} h="100%" px="4" pb="8px" align="center">
        <HStack>
          <ImYoutube />
          <Spacer />
          <ImTwitter />
          <Spacer />
          <ImFacebook2 />
        </HStack>
        <HStack>
          <Text color={"white"}>Contact us</Text>
          <Spacer />
          <Text color={"white"}>Private Policy</Text>
        </HStack>
        <Text color={"white"}>©2023, All Rights Reserved</Text>
      </VStack>
    );
  } else {
    return (
      <Flex h="100%" px="64px" pb="8px" align="center" justify="space-between">
        <Center w="auto">
          <Text color={"white"}>©2023, All Rights Reserved</Text>
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
            <Text color={"white"}>Contact us</Text>
            <Spacer />
            <Text color={"white"}>Private Policy</Text>
            <Spacer />
            <Text color={"white"}>Help</Text>
          </HStack>
        </Center>
      </Flex>
    );
  }
};

export default Footer;
