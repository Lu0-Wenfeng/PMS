import {
  Flex,
  Text,
  Center,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import Title from "./Title";
import SearchBar from "../SearchBar";
import { BsFillPersonFill, BsCart3 } from "react-icons/bs";
import Profile from "../Profile";

const Header = (onSearch) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      px="25"
      pt="2"
      align="center"
      justify="space-between"
      flexDirection={isMobile ? "column" : "row"}
    >
      {isMobile ? (
        <>
          <Flex justify="space-between" align="center">
            <Title mobile={isMobile} />
            <HStack spacing="24px">
              <Profile />
              <Center>
                <BsCart3 />
                <Text>$ 0.00</Text>
              </Center>
            </HStack>
          </Flex>
          <SearchBar onSearch={onSearch} />
        </>
      ) : (
        <>
          <Title mobile={isMobile} />
          <SearchBar onSearch={onSearch} />
          <HStack spacing="24px">
            <Profile />
            <Center>
              <BsCart3 />
              <Text>$ 0.00</Text>
            </Center>
          </HStack>
        </>
      )}
    </Flex>
  );
};

export default Header;
