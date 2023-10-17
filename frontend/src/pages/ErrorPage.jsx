import { WarningIcon } from "@chakra-ui/icons";
import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <VStack spacing="4">
        <WarningIcon w={58} h={58} color="blue.500" />
        <Text fontSize="xl" fontWeight="bold" color="gray.700">
          Oops! Something went wrong.
        </Text>
        <Button
          colorScheme="blue"
          onClick={() => {
            console.log("Oops! Something went wrong");
            navigate(-1);
          }}
        >
          Go Back
        </Button>
      </VStack>
    </Flex>
  );
};

export default ErrorPage;
