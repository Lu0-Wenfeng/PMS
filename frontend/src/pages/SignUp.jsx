import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyCard from "../components/MyCard";
import {
  setEmail,
  setEmailError,
  setPassword,
  setPasswordError,
  userSignUp,
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

  const onEmailBlur = () => {
    if (!email) {
      dispatch(setEmailError("This field is required"));
    }
  };

  const onPasswordBlur = () => {
    if (!password) {
      dispatch(setPasswordError("This field is required"));
    }
  };

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
      await dispatch(userSignUp({ email, password })).unwrap();
      alert("Signed Up Successfully");
      navigate("/success");
    } catch (error) {
      console.error("Error signing up", error.message);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSignUp();
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
            onBlur={onEmailBlur}
            onKeyDown={handleKeyDown}
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
              onKeyDown={handleKeyDown}
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
