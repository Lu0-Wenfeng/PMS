import React from "react";
import axios from "axios";
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
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const handleClick = () => setShow(!show);
  const onEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value) {
      setEmailError("This field is required");
    } else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      setEmailError("Invalid Email format");
    } else {
      setEmailError("");
    }
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    if (!e.target.value) {
      setPasswordError("This field is required");
    } else {
      setPasswordError("");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" h="100%">
      <MyCard title="Sign In to your account">
        <Box mb="5">
          <Text textColor="gray">Email:</Text>
          <Input
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Enter your email"
            mt="2"
            variant="outline"
            border="1px solid"
            borderColor={emailError ? "red.500" : "gray.300"}
            textColor="black"
            autoFocus={true}
          />
          {emailError && (
            <Text color="red.500" fontSize="sm" float="right">
              {emailError}
            </Text>
          )}
        </Box>
        <Box mb="5">
          <Text textColor="gray">Password:</Text>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              value={password}
              onChange={onPasswordChange}
              placeholder="Enter your password"
              mt="2"
              variant="outline"
              border="1px solid"
              borderColor="gray.300"
              textColor="black"
            />
            <InputRightElement mt="5px" mr="15px">
              <Button color="gray.500" onClick={handleClick}>
                <Text decoration="underline">{show ? "Hide" : "Show"}</Text>
              </Button>
            </InputRightElement>
          </InputGroup>
          {passwordError && (
            <Text color="red.500" fontSize="sm" mt="1">
              {passwordError}
            </Text>
          )}
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
