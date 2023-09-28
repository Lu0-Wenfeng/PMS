import React from "react";
import { Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <VStack
      display="flex"
      direction="column"
      justify="center"
      h="100%"
      spacing="20px"
    >
      <Text color="black">Login/Sign Up Successful</Text>
      <Button colorScheme="red" onClick={handleLogout}>
        Logout
      </Button>
    </VStack>
  );
};

export default LoginSuccess;
