import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { fetchProductDetails, updateProduct } from "../store/productSlice";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productInStockQuantity, setProductInStockQuantity] = useState(0);
  const [productImageUrl, setproductImageUrl] = useState("");
  const { id } = useParams();
  const currentProduct = useSelector((state) => state.products.currentProduct);

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

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentProduct) {
      setProductName(currentProduct.name);
      setProductDescription(currentProduct.description);
      setProductPrice(currentProduct.price);
      setProductCategory(currentProduct.category);
      setproductImageUrl(currentProduct.productImageUrl);
      setProductInStockQuantity(currentProduct.productInStockQuantity);
    }
  }, [currentProduct]);

  const handleUpdateProduct = async () => {
    // Validation logic here...
    const updatedProduct = {
      name: productName,
      description: productDescription,
      category: productCategory,
      price: productPrice,
      inStockQuantity: productInStockQuantity,
      productImageUrl,
    };
    try {
      await dispatch(updateProduct({ id, updatedProduct })).unwrap();
      alert("Product has been updated successfully.");
      navigate("/all-products");
    } catch (error) {
      console.error("Error when updating the product", error.message);
      navigate("/error");
    }
  };

  return (
    <Box p={{ base: 2, md: 4 }} maxW="600px" mx="auto" textColor="black">
      <Heading as="h1" mb="4">
        Edit Product
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
                value={productImageUrl}
                onChange={(e) => setproductImageUrl(e.target.value)}
                {...inputStyles}
                placeholder="Enter product image URL"
              />
            </FormControl>
          </HStack>

          <Box p="4" border="2px" borderColor="gray.200" borderRadius="md">
            <Image
              src={productImageUrl || noImage}
              alt="Product Preview"
              height="100px"
              maxW="100%"
            />
          </Box>

          <Button
            colorScheme="blue"
            type="button"
            onClick={handleUpdateProduct}
          >
            Update Product
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default EditProduct;
