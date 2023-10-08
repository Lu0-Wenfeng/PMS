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
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const [productDetails, setProductDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/all-products/${id}`
        );
        if (response.data) {
          const productDetails = response.data;
          setProductDetails(productDetails);
        } else {
          console.error("Failed to fetch product details");
          navigate("./error");
        }
      } catch (error) {
        console.error("Error during product details fetch:", error);
        navigate("./error");
      }
    };

    fetchProductDetails();
  }, [id, navigate]);

  return (
    <Box p={{ base: 2, md: 4 }} textColor="black">
      <Heading as="h1" mb="4">
        Product Details
      </Heading>
      <Box>
        <VStack align="stretch" spacing={{ base: 4, md: 8 }}>
          <Image
            src={productDetails.productImageUrl || noImage}
            alt={productDetails.name}
            width="100%"
            maxH={{ base: "300px", md: "500px" }}
            objectFit="cover"
          />

          <VStack p={{ base: 4, md: 10 }} align="start">
            <Text fontWeight="thin" fontSize={{ base: "md", md: "lg" }}>
              {productDetails.category}
            </Text>

            <Text
              fontWeight="normal"
              fontSize={{ base: "2xl", md: "4xl" }}
              textColor={"gray"}
            >
              {productDetails.name}
            </Text>

            <HStack
              p={{ base: 2, md: 5 }}
              spacing={{ base: 2, md: 10 }}
              alignSelf="start"
            >
              <Text fontSize={{ base: "2xl", md: "4xl" }}>
                <strong>${productDetails.price}</strong>
              </Text>

              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={productDetails.inStockQuantity > 0 ? "black" : "deepred"}
                border="1px solid #000"
                background={
                  productDetails.inStockQuantity > 0 ? "tomato" : "lightcoral"
                }
                borderRadius="8px"
                padding="5px"
              >
                {productDetails.inStockQuantity > 0
                  ? `In Stock: ${productDetails.inStockQuantity}`
                  : "Out Of Stock"}
              </Text>
            </HStack>

            <Text fontWeight="normal" fontSize={{ base: "sm", md: "md" }}>
              {productDetails.description}
            </Text>

            <HStack spacing={{ base: 2, md: 4 }}>
              <Button colorScheme={"blue"} size={{ base: "sm", md: "md" }}>
                Add to Cart
              </Button>

              {isAdmin && (
                <Button colorScheme={"purple"} size={{ base: "sm", md: "md" }}>
                  Edit
                </Button>
              )}
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
