import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedIn, userLoggedOut } from "../services/authSlice";
import { BsFillPersonFill } from "react-icons/bs";

const Profile = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(userLoggedIn());
    }
  }, [dispatch]);

  const handleUpdatePassword = async () => {
    try {
    } catch (error) {}
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userLoggedOut());
    setIsDrawerOpen(false);
    navigate("/");
  };
  const handleLogin = async () => {
    try {
    } catch (error) {}
  };
  const handleSignUp = async () => {
    try {
    } catch (error) {}
  };

  return (
    <>
      <Button
        onClick={() => setIsDrawerOpen(true)}
        leftIcon={<BsFillPersonFill />}
        variant="solid"
      >
        {isLoggedIn ? "Sign Out" : "Sign In"}
      </Button>
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {isLoggedIn ? "Welcome user!" : "Sign in to your account"}
          </DrawerHeader>
          <DrawerBody>
            {isLoggedIn ? (
              <>
                <Link to="/update-pwd">
                  <Button mt={4} onClick={() => setIsDrawerOpen(false)}>
                    Update Password
                  </Button>
                </Link>
                <Button mt={4} colorScheme="red" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/sign-in">
                  <Button onClick={() => setIsDrawerOpen(false)}>Login</Button>
                </Link>
                <Link to="/sign-up">
                  <Button onClick={() => setIsDrawerOpen(false)}>
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Profile;
