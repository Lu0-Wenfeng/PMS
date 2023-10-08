import React from "react";
import { Button, Flex, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      padding={4}
    >
      <VStack spacing={4}>
        <Link to="/sign-in">
          <Button colorScheme="blue" width={{ base: "100%", md: "auto" }}>
            Login
          </Button>
        </Link>
        <Link to="/sign-up">
          <Button colorScheme="green" width={{ base: "100%", md: "auto" }}>
            SignUp
          </Button>
        </Link>
        <Link to="/update-pwd">
          <Button colorScheme="red" width={{ base: "100%", md: "auto" }}>
            Update Password
          </Button>
        </Link>
      </VStack>
    </Flex>
  );
};

export default Home;

