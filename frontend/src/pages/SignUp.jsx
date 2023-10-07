import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyCard from "../components/MyCard";
import { userSignUp, setIsAdmin } from "../store/authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const [adminKey, setAdminKey] = useState("");
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminKeyError, setAdminKeyError] = useState(false); 
  const ADMIN_KEY = "WHOSYOURDADDY";

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

  // const handleIsAdminChange = (e) => {
  //   dispatch(setIsAdmin(e.target.checked));
  // };

  // const handleSignUp = async () => {
  //   try {
  //     await dispatch(userSignUp({ email, password, isAdmin })).unwrap();
  //     alert("Signed Up Successfully");
  //     navigate("/success");
  //   } catch (error) {
  //     console.error("Error signing up", error.message);
  //   }
  // };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSignUp();
    }
  };

  const handleIsAdminChange = (e) => {
    dispatch(setIsAdmin(e.target.checked));

    // 如果用户选择以管理员身份注册，显示管理员密码输入框
    if (e.target.checked) {
      setShowAdminInput(true);
    } else {
      // 如果用户取消管理员身份注册，隐藏管理员密码输入框
      setShowAdminInput(false);
      setAdminKey(""); // 清空管理员密码输入框的值
      setAdminKeyError(false); // 重置管理员密码错误状态
    }
  };

  const handleAdminKeyChange = (e) => {
    setAdminKey(e.target.value);
  };

  const handleSignUp = async () => {
    try {
      // 如果用户选择以管理员身份注册，检查管理员密码是否正确
      if (isAdmin && adminKey === ADMIN_KEY) {
        setAdminKeyError(false);
        alert('Admin authentication pass!')
      } else if (isAdmin) {
        setAdminKeyError(true);
        return; // 如果管理员密码不正确，不执行注册操作
      }

      // 其余的注册逻辑保持不变
      await dispatch(userSignUp({ email, password, isAdmin })).unwrap();
      alert("Signed Up Successfully");
      navigate("/success");
    } catch (error) {
      console.error("Error signing up", error.message);
    }
  };
  

  return (
    <Box display="flex" justifyContent="center" alignItems="center" h="100%">
      <MyCard title="Sign Up an Account">
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
        <Checkbox
          colorScheme="linkedin"
          textColor="black"
          onChange={handleIsAdminChange}
          isChecked={isAdmin}
        >
          Sign up as admin?
        </Checkbox>

        {/* 如果用户选择以管理员身份注册，显示管理员密码输入框 */}
        {showAdminInput && (
          <Box mb="5">
            <Text textColor="gray">Admin Password:</Text>
            <Input
              type="password"
              value={adminKey}
              onChange={handleAdminKeyChange}
              placeholder="Enter admin password"
              {...inputStyles}
              borderColor={adminKeyError ? "red.500" : "gray.300"}
            />
            {adminKeyError && (
              <Text color="red.500" fontSize="sm" float="right">
                Incorrect admin password
              </Text>
            )}
          </Box>
        )}


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
