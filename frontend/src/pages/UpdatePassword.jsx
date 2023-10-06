import { Box, Button, Center, Input, Text } from "@chakra-ui/react";
import React from "react";
import MyCard from "../components/MyCard";

const UpdatePassword = () => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

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

  const onEmailBlur = () => {
    if (!email) {
      setEmailError("This field is required");
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      alert("Under development!");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" h="100%">
      <MyCard title="Update Password">
        <Center mb="2">
          <Text fontSize="sm" color="gray.500">
            Enter your email link, we will send you the recovery link
          </Text>
        </Center>
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

        <Button onClick={() => alert("Under development!")} {...buttonStyles}>
          Update Your Password
        </Button>
      </MyCard>
    </Box>
  );
};

export default UpdatePassword;
