import React from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import MyCard from "../components/MyCard";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" h="100%">
      <MyCard title="Sign In to your account">
        <Box mb="4">
          <Text mb="2" textColor="gray">
            Email:
          </Text>
          <Input
            placeholder="Enter your email"
            variant="outline"
            my="4"
            border="1px solid"
            borderColor="gray.300"
          />
        </Box>
        <Box mb="4">
          <Text mb="2" textColor="gray">
            Password:
          </Text>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              variant="outline"
              my="4"
              border="1px solid"
              borderColor="gray.300"
            />
            <InputRightElement>
              <Button onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Button mb="2" bg="#5048E5" w="100%" textColor="white">
          Sign In
        </Button>
        <Box
          display="flex"
          justifyContent="space-between"
          textColor="gray.500"
          fontSize="sm"
          mt="4"
          w="100%"
        >
          <Text maxWidth="40%">
            Don't have an account?
            <Link href="/sign-up" color="blue.500">
              {" "}
              Sign Up
            </Link>
          </Text>
          <Text>
            <Link href="update-password" color="blue.500">
              Forgot your password?
            </Link>
          </Text>
        </Box>
      </MyCard>
    </Box>
  );
};

export default SignIn;
