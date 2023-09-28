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
import { useNavigate } from "react-router-dom";
import MyCard from "../components/MyCard";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const inputStyles = {
    mt: "2",
    variant: "outline",
    border: "1px solid",
    borderColor: "gray.300",
    textColor: "black",
    _hover: {
      borderColor: "blue.500",
      boxShadow: "0 0 0 1px #3182ce",
    },
  };

  const buttonStyles = {
    my: "2",
    bg: "#5048E5",
    w: "100%",
    textColor: "white",
    _hover: {
      bg: "rgba(80, 72, 229, 0.9)",
    },
  };

  const handleClick = () => setShow(!show);

  const onEmailBlur = () => {
    if (!email) {
      setEmailError("This field is required");
    }
  };

  const onPasswordBlur = () => {
    if (!password) {
      setPasswordError("This field is required");
    }
  };

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

  const handleLogin = async () => {
    if (!email) {
      setEmailError("This field is required");
      return;
    }
    if (!password) {
      setPasswordError("This field is required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/sign-in", {
        email: email,
        password: password,
      });
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Login Successful");
        navigate("/success");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error loggin in:", error.response.data);
        if (error.response.data.message === "User Not exist") {
          setEmailError("User Not Exists");
          console.error(
            "(If-Else)Error logging in:",
            error.response.data.message
          );
        } else if (error.response.data.message === "Incorrect Password") {
          setPasswordError("Incorrect Password");
          console.error(
            "(If-Else)Error logging in:",
            error.response.data.message
          );
        }
      } else {
        console.error("Error loggin in:", error);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
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
            onBlur={onEmailBlur}
            placeholder="Enter your email"
            {...inputStyles}
            borderColor={emailError ? "red.500" : "gray.300"}
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
              onBlur={onPasswordBlur}
              placeholder="Enter your password"
              {...inputStyles}
            />
            <InputRightElement mt="5px" mr="15px">
              <Button color="gray.500" onClick={handleClick}>
                <Text decoration="underline">{show ? "Hide" : "Show"}</Text>
              </Button>
            </InputRightElement>
          </InputGroup>
          {passwordError && (
            <Text color="red.500" fontSize="sm" mt="1" float="right">
              {passwordError}
            </Text>
          )}
        </Box>
        <Button {...buttonStyles} onClick={handleLogin}>
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
          <Text maxWidth="50%">
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
