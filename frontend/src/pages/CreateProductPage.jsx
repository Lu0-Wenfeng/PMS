import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Select,
  Image,
  Textarea,
} from "@chakra-ui/react";
import { createProduct } from "../store/productSlice";

const CreateProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productInStockQuantity, setProductInStockQuantity] = useState(0);
  const [productImageURL, setProductImageURL] = useState("");

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
    autoFocus: true,
  };

  const handleCreateProduct = async () => {
    // Validation logic here...

    const newProduct = {
      name: productName,
      description: productDescription,
      category: productCategory,
      price: productPrice,
      inStockQuantity: productInStockQuantity,
      productImageURL: productImageURL,
    };

    try {
      await dispatch(createProduct(newProduct)).unwrap();
      alert("Product has been created successfully.");
      navigate("/all-products");
    } catch (error) {
      console.error("Error when creating a product", error.message);
      navigate('/error');
    }
  };

  return (
    <Box p={{ base: 2, md: 4 }} maxW="600px" mx="auto" textColor="black">
      <Heading as="h1" mb="4">
        Create Product
      </Heading>
      <Box boxShadow="dark-lg" p="6" rounded="md" bg="white">
        <VStack spacing="4">
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              {...inputStyles}
              placeholder="Enter product name"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Product Description</FormLabel>
            <Textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              {...inputStyles}
              placeholder="Enter product description"
            />
          </FormControl>

          <HStack spacing={{ base: 2, md: 20 }} justify="center" w="100%">
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                {...inputStyles}
                placeholder="Enter price"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                placeholder="Select product category"
                {...inputStyles}
              >
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                {/* Add more categories as needed */}
              </Select>
            </FormControl>
          </HStack>

          <HStack spacing={{ base: 2, md: 20 }} justify="center" w="100%">
            <FormControl>
              <FormLabel>In Stock Quantity</FormLabel>
              <Input
                type="number"
                value={productInStockQuantity}
                onChange={(e) => setProductInStockQuantity(e.target.value)}
                {...inputStyles}
                placeholder="Enter in stock quantity"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Add Image Link</FormLabel>
              <Input
                type="text"
                value={productImageURL}
                onChange={(e) => setProductImageURL(e.target.value)}
                {...inputStyles}
                placeholder="Enter product image URL"
              />
            </FormControl>
          </HStack>

          <Box p="4" border="2px" borderColor="gray.200" borderRadius="md">
            <Image
              src={productImageURL}
              alt="Product Preview"
              height="100px"
              maxW="100%"
            />
          </Box>

          <Button
            colorScheme="blue"
            type="button"
            onClick={handleCreateProduct}
          >
            Create Product
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default CreateProductPage;
