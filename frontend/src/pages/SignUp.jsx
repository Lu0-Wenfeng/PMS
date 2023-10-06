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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyCard from "../components/MyCard";
import {
  setEmail,
  setEmailError,
  setPassword,
  setPasswordError,
} from "../store/authSlice";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.auth.email);
  const emailError = useSelector((state) => state.auth.emailError);
  const password = useSelector((state) => state.auth.password);
  const passwordError = useSelector((state) => state.auth.passwordError);

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
    autoFocus: true,
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
  const onEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
    if (!e.target.value) {
      dispatch(setEmailError("This field is required"));
    } else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      dispatch(setEmailError("Invalid Email format"));
    } else {
      dispatch(setEmailError(""));
    }
  };

  const onPasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
    if (!e.target.value) {
      dispatch(setPasswordError("This field is required"));
    } else {
      dispatch(setPasswordError(""));
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:3000/sign-up", {
        email: email,
        password: password,
      });
      if (response.data) {
        alert("Signed Up Successfully");
        navigate("/success");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error loggin in:", error.response.data.message);
        if (error.response.data.message === "Username already exists") {
          dispatch(setEmailError("Username already exists"));
        }
      } else {
        console.error("Error loggin in:", error);
      }
    }
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" h="100%">
      <MyCard title="Sign Up an account">
        <Box mb="5">
          <Text textColor="gray">Email:</Text>
          <Input
            type="email"
            value={email}
            onChange={onEmailChange}
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
        <Button {...buttonStyles} onClick={handleSignUp}>
          Sign Up
        </Button>

        <Text color="gray.500">
          Already have an account?
          <Link href="/sign-in" color="blue.500">
            {" "}
            Sign In
          </Link>
        </Text>
      </MyCard>
    </Box>
  );
};

export default SignUp;
