import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      spacing={4}
    >
      <Link to="/sign-in">
        <Button colorScheme="blue" marginX={3}>
          Login
        </Button>
      </Link>
      <Link to="/sign-up">
        <Button colorScheme="green" marginX={3}>
          SignUp
        </Button>
      </Link>
      <Link to="/update-pwd">
        <Button colorScheme="red" marginX={3}>
          Update-password
        </Button>
      </Link>
    </Flex>
  );
};

export default Home;
