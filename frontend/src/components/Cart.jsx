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
import { fetchCartItems } from "../store/cartSlice";

const Cart = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(userLoggedIn());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartItems());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <>
      <Button
        onClick={() => setIsDrawerOpen(true)}
        leftIcon={<BsCart3 />}
        variant="solid"
      >
        {"$ " +
          cartItems.reduce(
            (acc, item) => acc + item.productPrice * item.productQuantity,
            0
          )}
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
            {cartItems.length === 0
              ? "Your cart is empty"
              : cartItems.map((item) => (
                  <Box key={item.productId}>
                    <Image src={item.productImageUrl} alt={item.productName} />
                    <Text>{item.productName}</Text>
                    <Text>
                      Total: ${item.productPrice * item.productQuantity}
                    </Text>
                    <Button>-</Button>
                    <Input value={item.productQuantity} readOnly />
                    <Button>+</Button>
                    <Button>Remove</Button>
                  </Box>
                ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cart;
