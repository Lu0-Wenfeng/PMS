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
  Flex,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetails } from "../store/reducers/productSlice";
import {
  updateProductQuantity,
  addProductToCart,
  removeFromCart,
} from "../store/reducers/cartSlice";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
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
    <VStack
      spacing={4}
      w="100%"
      p={{ base: 2, md: 4 }}
      textColor="black"
      alignItems="flex-start"
    >
      <Flex w="100%" justify="flex-start">
        <ChakraLink onClick={() => navigate(-1)}>
          <Flex align="center">
            <ArrowBackIcon mr={1} />
            <Text decoration="underline">Back to all products</Text>
          </Flex>
        </ChakraLink>
      </Flex>

      <Heading as="h1" mb="4">
        Product Details
      </Heading>

      <Flex
        w="95%"
        backgroundColor="white"
        borderRadius="md"
        p={5}
        boxShadow="sm"
        direction={{ base: "column", md: "row" }}
        spacing={8}
        justify="space-evenly"
      >
        <Box 
          w={{ base: "300px", md: "600px" }}
          h={{ base: "300px", md: "600px" }}
          overflow="hidden"
          position="relative"
        >
          <Image
            src={currentProduct?.productImageUrl || noImage}
            alt={currentProduct?.name}
            width="100%"
            height="100%"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            objectFit="contain"
            borderRadius="md"
            boxShadow="sm"
          />
        </Box>

        <Box pt="10" maxW="500px">
          <Text fontSize="xl" color="gray.500" mb={1}>
            {currentProduct?.category}
          </Text>

          <Text fontSize="4xl" fontWeight="bold" mb={2}>
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
              color={currentProduct?.inStockQuantity > 0 ? "black" : "deepred"}
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

          <Box>
            <Text fontWeight={"bold"}>Product Description:</Text>
            <Text fontSize="md" mb={1} noOfLines={isExpanded ? undefined : 3}>
              {currentProduct?.description}
            </Text>
            <Button
              mb={5}
              textColor="gray.500"
              variant="link"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Less" : "Read more"}
            </Button>
          </Box>

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
                  mr={3}
                >
                  Add to Cart
                </Button>
              ))(cartItems.find((item) => item.productId === id))}

            {isAdmin && (
              <ChakraLink as={RouterLink} to={`/edit-product/${id}`}>
                <Button
                  variant="outline"
                  colorScheme={"purple"}
                  size={{ base: "sm", md: "md" }}
                >
                  Edit
                </Button>
              </ChakraLink>
            )}
          </HStack>
        </Box>
      </Flex>
    </VStack>
  );
};

export default ProductDetailPage;
