import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import { BsCart3 } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedIn } from "../store/authSlice";

const Cart = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(userLoggedIn());
    }
  }, [dispatch]);

  return (
    <>
      <Button
        onClick={() => setIsDrawerOpen(true)}
        leftIcon={<BsCart3 />}
        variant="solid"
      >
        $ 0.00
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
            {isLoggedIn ? "Cart" : "You haven't signed in"}
          </DrawerHeader>
          <DrawerBody>
            {isLoggedIn ? (
              <>
                <Link to="/update-pwd">
                  <Button mt={4} onClick={() => setIsDrawerOpen(false)}>
                    Update Password
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

export default Cart;
