import {
  Flex,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import Title from "./Title";
import SearchBar from "../SearchBar";
import Profile from "../Profile";
import Cart from "../Cart";

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
              <Cart />
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
            <Cart />
          </HStack>
        </>
      )}
    </Flex>
  );
};

export default Header;
