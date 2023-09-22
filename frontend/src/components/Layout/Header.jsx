import { Flex, Text, Center, HStack } from "@chakra-ui/react";
import React from "react";
import Title from "./Title";
import SearchBar from "../SearchBar";
import { BsFillPersonFill, BsCart3 } from "react-icons/bs";

const Header = (onSearch) => {
  return (
    <Flex px="68px" pt="5px" justify="space-between">
      <Title />
      <SearchBar onSearch={onSearch} />
      <HStack spacing='24px'>
        <Center>
          <BsFillPersonFill />
          <Text>Sign In</Text>
        </Center>
        <Center>
          <BsCart3 />
          <Text>$ 0.00</Text>
        </Center>
      </HStack>
    </Flex>
  );
};

export default Header;
