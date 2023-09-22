import React from "react";
import { HStack, Heading, Text } from "@chakra-ui/react";

const Title = () => {
  return (
    <HStack textColor="white">
      <Heading as="h1">Management</Heading>
      <Text fontSize="lg" mt="4" fontWeight="bold">
        Chuwa
      </Text>
    </HStack>
  );
};

export default Title;
