import React from "react";
import { useNavigate } from "react-router-dom";
import { VStack, Flex, Text, Button } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <VStack spacing="4">
        <WarningIcon w={58} h={58} color="blue.500" />
        <Text fontSize="xl" fontWeight="bold" color="gray.700">
          Oops! Something went wrong.
        </Text>
        <Button colorScheme="blue" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </VStack>
    </Flex>
  );
};

export default ErrorPage;
