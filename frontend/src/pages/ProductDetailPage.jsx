import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  HStack,
  Heading,
  Text,
  Image,
  VStack,
  Button,
  ButtonGroup,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetails } from "../store/productSlice";
import {
  updateProductQuantity,
  addProductToCart,
  removeFromCart,
} from "../store/cartSlice";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const { id } = useParams();
  const currentProduct = useSelector((state) => state.products.currentProduct);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch]);

  const onDecrease = (productId) => {
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

  return (
    <Box p={{ base: 2, md: 4 }} textColor="black">
      <Heading as="h1" mb="4">
        Product Details
      </Heading>
      <Box>
        <VStack align="stretch" spacing={{ base: 4, md: 8 }}>
          <Image
            src={currentProduct?.productImageUrl || noImage}
            alt={currentProduct?.name}
            width="100%"
            maxH={{ base: "300px", md: "500px" }}
            objectFit="contain"
          />

          <VStack p={{ base: 4, md: 10 }} align="start">
            <Text fontWeight="thin" fontSize={{ base: "md", md: "lg" }}>
              {currentProduct?.category}
            </Text>

            <Text
              fontWeight="normal"
              fontSize={{ base: "2xl", md: "4xl" }}
              textColor={"gray"}
            >
              {currentProduct?.name}
            </Text>

            <HStack
              p={{ base: 2, md: 5 }}
              spacing={{ base: 2, md: 10 }}
              alignSelf="start"
            >
              <Text fontSize={{ base: "2xl", md: "4xl" }}>
                <strong>${currentProduct?.price}</strong>
              </Text>

              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={
                  currentProduct?.inStockQuantity > 0 ? "black" : "deepred"
                }
                border="1px solid #000"
                background={
                  currentProduct?.inStockQuantity > 0 ? "tomato" : "lightcoral"
                }
                borderRadius="8px"
                padding="5px"
              >
                {currentProduct?.inStockQuantity > 0
                  ? `In Stock: ${currentProduct?.inStockQuantity}`
                  : "Out Of Stock"}
              </Text>
            </HStack>

            <Text fontWeight="normal" fontSize={{ base: "sm", md: "md" }}>
              {currentProduct?.description}
            </Text>

            <HStack spacing={{ base: 2, md: 4 }}>
              {((cartItem) =>
                cartItem && cartItem.quantity > 0 ? (
                  <ButtonGroup colorScheme="orange" size="sm" isAttached>
                    <Button onClick={() => onDecrease(cartItem.productId)}>
                      -
                    </Button>
                    <Button
                      value={cartItem.productId}
                      onClick={() => {}}
                      _hover={{
                        transform: "none",
                        boxShadow: "none",
                      }}
                      _focus={{ boxShadow: "none" }}
                      _active={{ bg: "initial", transform: "none" }}
                    >
                      {cartItem.quantity}
                    </Button>
                    <Button
                      onClick={() =>
                        dispatch(
                          updateProductQuantity({
                            productId: cartItem.productId,
                            quantity: cartItem.quantity + 1,
                          })
                        )
                      }
                    >
                      +
                    </Button>
                  </ButtonGroup>
                ) : (
                  <Button
                    onClick={() =>
                      dispatch(
                        addProductToCart({
                          productId: id,
                          productPrice: currentProduct.price,
                          productName: currentProduct.name,
                          productImageUrl: currentProduct.productImageUrl,
                        })
                      )
                    }
                    colorScheme="orange"
                    size="sm"
                  >
                    Add to Cart
                  </Button>
                ))(cartItems.find((item) => item.productId === id))}

              {isAdmin && (
                <ChakraLink as={RouterLink} to={`/edit-product/${id}`}>
                  <Button
                    colorScheme={"purple"}
                    size={{ base: "sm", md: "md" }}
                  >
                    Edit
                  </Button>
                </ChakraLink>
              )}
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
