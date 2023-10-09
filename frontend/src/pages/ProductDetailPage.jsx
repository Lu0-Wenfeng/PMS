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
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetails } from "../store/productSlice";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const { id } = useParams();
  const currentProduct = useSelector((state) => state.products.currentProduct);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch]);

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
              <Button colorScheme={"blue"} size={{ base: "sm", md: "md" }}>
                Add to Cart
              </Button>

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
