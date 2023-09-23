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

const Header = (onSearch) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      px={isMobile ? "4" : "68px"}
      pt="5px"
      justify="space-between"
      flexDirection={isMobile ? "column" : "row"}
    >
      {isMobile ? (
        <>
          <Flex justify="space-between">
            <Title mobile={isMobile} />
            <HStack spacing="24px">
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
          <SearchBar onSearch={onSearch} />
        </>
      ) : (
        <>
          <Title mobile={isMobile} />
          <SearchBar onSearch={onSearch} />
          <HStack spacing="24px">
            <Center>
              <BsFillPersonFill />
              <Text>Sign In</Text>
            </Center>
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
