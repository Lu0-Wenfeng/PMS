import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Text,
  useDisclosure,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { userSignIn } from "../store/reducers/authSlice";
import Prompt from "../components/Prompt";
import MyCard from "../components/MyCard";

const SignIn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleClick = () => setShowPassword(!showPassword);

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
      await dispatch(
        userSignIn({ email, password })
      ).unwrap();
      onOpen();
    } catch (error) {
      console.log("error:", error);
      if (error.message === "User Not exist") {
        setEmailError(error.message);
      } else if (error.message === "Incorrect Password") {
        setPasswordError(error.message);
      } else {
        console.error("Error logging in: ", error.message);
        navigate("/error");
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" h="100%">
        <MyCard title="Sign In to your account">
          <Box mb="5">
            <Text textColor="gray">Email:</Text>
            <Input
              type="email"
              value={email}
              onChange={onEmailChange}
              onKeyDown={handleKeyDown}
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={onPasswordChange}
                onKeyDown={handleKeyDown}
                onBlur={onPasswordBlur}
                placeholder="Enter your password"
                {...inputStyles}
              />
              <InputRightElement mt="5px" mr="15px">
                <Button color="gray.500" onClick={handleClick}>
                  <Text decoration="underline">
                    {showPassword ? "Hide" : "Show"}
                  </Text>
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
              <ChakraLink as={RouterLink} to="/sign-up" color="blue.500">
                {" "}
                Sign Up
              </ChakraLink>
            </Text>
            <Text>
              <ChakraLink as={RouterLink} to="/update-pwd" color="blue.500">
                Forgot your password?
              </ChakraLink>
            </Text>
          </Box>
        </MyCard>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          navigate("/all-products");
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <Prompt
            status="success"
            title="Login Success!"
            description="Redirecting to product list"
          />
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignIn;
