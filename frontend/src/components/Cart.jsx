import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  Box,
  Input,
  Image,
  HStack,
  Flex,
  VStack,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { BsCart3 } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedIn } from "../store/authSlice";
import {
  updateProductQuantity,
  addProductToCart,
  removeFromCart,
} from "../store/cartSlice";

const Cart = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tempQuantities, setTempQuantities] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.total);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleBlur = (productId) => {
    if (tempQuantities[productId] !== "") {
      dispatch(
        updateProductQuantity({
          productId,
          quantity: parseInt(tempQuantities[productId], 10),
        })
      );
    }
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
    const initialQuantities = cartItems.reduce((acc, item) => {
      acc[item.productId] = item.quantity;
      return acc;
    }, {});
    setTempQuantities(initialQuantities);
  };

  const onDecrease = (productId) => {
    const newTempQuantities = {
      ...tempQuantities,
      [productId]: tempQuantities[productId] - 1,
    };
    if (newTempQuantities[productId] === 0) delete newTempQuantities[productId];
    setTempQuantities({ ...newTempQuantities });

    const index = cartItems.findIndex((item) => item.productId === productId);
    if (cartItems[index].quantity === 1) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(
        updateProductQuantity({
          productId,
          quantity: cartItems[index].quantity - 1,
        })
      );
    }
  };

  const onIncrease = (productId) => {
    setTempQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] + 1,
    }));
    dispatch(
      updateProductQuantity({
        productId: productId,
        quantity: tempQuantities[productId] + 1,
      })
    );
  };

  return (
    <>
      <Button leftIcon={<BsCart3 />} variant="solid" onClick={handleDrawerOpen}>
        {`$ ${totalPrice.toFixed(2)}`}
      </Button>
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`Cart (${cartItems.length})`}</DrawerHeader>
          <DrawerBody>
            {cartItems.filter((item) => item.quantity > 0).length === 0 ? (
              <Flex w="100%" direction="column" justify="center" align="center">
                <Text fontSize="4xl" fontWeight="bold">
                  Your cart is empty
                </Text>
                <Image
                  src="https://static.thenounproject.com/png/149119-200.png"
                  alt="empty cart"
                  boxSize="200px"
                />
              </Flex>
            ) : (
              <VStack spacing={4} width="100%">
                {cartItems
                  .filter((item) => item.quantity > 0)
                  .map((item) => (
                    <Flex
                      align="center"
                      width="100%"
                      border="1px solid #e2e2e2"
                      p={4}
                      borderRadius="md"
                      key={item.productId}
                    >
                      <Box flex="1">
                        <Image
                          boxSize="120px"
                          objectFit="cover"
                          src={item.productImageUrl}
                          alt={item.productName}
                        />
                      </Box>
                      <VStack align="start" spacing={1} flex="2">
                        <Text fontWeight="bold">{item.productName}</Text>
                        <Text fontSize="xl" color="yellow.300">
                          $ {Math.round(item.subTotal * 100) / 100}
                        </Text>
                      </VStack>
                      <Box flex="1">
                        <ButtonGroup size="sm" isAttached>
                          <Button onClick={() => onDecrease(item.productId)}>
                            -
                          </Button>
                          <Input
                            value={tempQuantities[item.productId]}
                            onChange={(e) => {
                              setTempQuantities((prev) => ({
                                ...prev,
                                [item.productId]: e.target.value,
                              }));
                            }}
                            onBlur={() => handleBlur(item.productId)}
                            size="sm"
                            w="40px"
                            textAlign="center"
                          />
                          <Button onClick={() => onIncrease(item.productId)}>
                            +
                          </Button>
                        </ButtonGroup>
                      </Box>
                      <Button
                        onClick={() => dispatch(removeFromCart(item.productId))}
                        colorScheme="red"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </Flex>
                  ))}
              </VStack>
            )}
            <InputGroup mt="5" mb="10" size="md">
              <Input placeholder="Apply Discount Code" />
              <InputRightAddon children="Apply" />
            </InputGroup>

            <Box w="100%" h="0" border="1px solid #e2e2e2"></Box>

            <VStack align="start" spacing={2} fontSize="xl">
              <Flex justifyContent="space-between" w="100%">
                <Text>Subtotal</Text>
                <Text>$ {totalPrice}</Text>
              </Flex>
              <Flex justifyContent="space-between" w="100%">
                <Text>Tax(7%)</Text>
                <Text>$ {((totalPrice * 7) / 100).toFixed(2)}</Text>
              </Flex>
              <Flex justifyContent="space-between" w="100%">
                <Text>Discount</Text>
                <Text>-$0.00</Text>
              </Flex>
              <Flex justifyContent="space-between" w="100%">
                <Text fontSize="2xl" fontWeight="bold">
                  Estimated total
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  $ {(totalPrice + (totalPrice * 7) / 100).toFixed(2)}
                </Text>
              </Flex>
            </VStack>
            <Button w="100%" colorScheme="blue" mt={4}>
              Continue to checkout
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cart;
