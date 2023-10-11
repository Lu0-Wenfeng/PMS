import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";

import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedIn, handleLogout } from "../store/authSlice";

const Profile = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const username = useSelector((state) => state.auth.email);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(userLoggedIn());
    }
  }, [dispatch]);

  const onLogout = async () => {
    try {
      await dispatch(handleLogout()).unwrap();
      setIsDrawerOpen(false);
    } catch (error) {}
  };

  return (
    <>
      <Button
        onClick={() => setIsDrawerOpen(true)}
        leftIcon={<BsFillPersonFill />}
        variant="solid"
      >
        {isMobile
          ? null
          : isLoggedIn
          ? isAdmin
            ? "Admin Sign Out"
            : "User Sign Out"
          : "Sign In"}
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
            {isLoggedIn
              ? `Welcome ${isAdmin ? "Admin" : "User"} ${username}!`
              : "Sign in to your account"}
          </DrawerHeader>
          <DrawerBody>
            {isLoggedIn ? (
              <>
                <Link to="/update-pwd">
                  <Button mt={4} onClick={() => setIsDrawerOpen(false)}>
                    Update Password
                  </Button>
                </Link>
                <Link to="/">
                  <Button mt={4} colorScheme="red" onClick={onLogout}>
                    Logout
                  </Button>
                </Link>
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
