import React from "react";
import { HStack, Heading, Text } from "@chakra-ui/react";

const Title = ({ mobile }) => {
  return (
    <HStack textColor="white" spacing="1">
      <Heading as="h1">{mobile ? "M" : "Management"}</Heading>
      <Text fontSize={mobile ? "md" : "lg"} mt="4" fontWeight="bold">
        Chuwa
      </Text>
    </HStack>
  );
};

export default Title;
