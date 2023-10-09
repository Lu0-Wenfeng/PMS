import { Flex, HStack, Box, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import Title from "./Title";
import SearchBar from "../SearchBar";
import Profile from "../Profile";
import Cart from "../Cart";

const Header = (onSearch) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      px="25"
      pt="2"
      bg="black"
      height={isMobile ? "100px" : "70px"}  
    >
      <Flex
        align="center"
        justify="space-between"
        flexDirection={isMobile ? "column" : "row"}
      >
        {isMobile ? (
          <>
            <Flex>
              <Title mobile={isMobile} />
              <HStack spacing="24px">
                <Profile />
                <Cart />
              </HStack>
            </Flex>
            <Flex align="flex-end"
            justify="center"
              width="100%"
              mt="auto" 
            >
              <SearchBar onSearch={onSearch} />
            </Flex>
          </>
        ) : (
          <>
            <Title mobile={isMobile} />
            <Flex ml="4" justify="center" width="100%">
              <SearchBar onSearch={onSearch} />
            </Flex>
            <HStack spacing="24px">
              <Profile />
              <Cart />
            </HStack>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
