import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import {
  createProduct,
} from "../store/productSlice";

const CreateProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productInStockQuantity, setProductInStockQuantity] = useState(0);
  const [productImageURL, setProductImageURL] = useState("");
  const [productCreated, setProductCreated] = useState(false);

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
    if (
      !productName ||
      !productPrice ||
      !productDescription ||
      !productCategory ||
      !productInStockQuantity
    ) {
      console.error("All fields are required");
    }

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
      setProductCreated(false);
    } catch (error) {
      console.error("Error when creating a product", error.message);
    }
  };

  // const handleDrop = (event) => {
  //   event.preventDefault();

  //   const file = event.dataTransfer.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const imageUrl = reader.result;
  //       setProductImageUrl(imageUrl);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleDragOver = (event) => {
  //   event.preventDefault();
  // };

  return (
    <Box p="4" mr="200" ml="200" maxW="600px" mx="auto" textColor="black">
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

          <HStack spacing="20" align="stretch" justify="center">
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

            <FormControl w="200%">
              <FormLabel>Category</FormLabel>
              <Select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                placeholder="Select product category"
              >
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                {/* Add more categories as needed */}
              </Select>
            </FormControl>
          </HStack>

          <HStack spacing="20" align="stretch" justify="center">
            <FormControl>
              <FormLabel>In Stock Quantity</FormLabel>
              <Input
                type="number"
                value={productInStockQuantity}
                onChange={(e) =>
                  setProductInStockQuantity(e.target.value)
                }
                {...inputStyles}
                placeholder="Enter in stock quantity"
              />
            </FormControl>

            <FormControl w="200%">
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

          {/* 这里或许可以添加一个Dropbox 直接拖动图片进去 但是我还没想好排版到哪里
         <FormControl>
        <Box
              p="4"
              border="2px"
              borderColor="gray.200"
              borderRadius="md"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
        >

          <Heading as="h3" size="sm" mb="2">
            Drag and drop an image here
          </Heading>
        </Box>
        </FormControl> */}

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
