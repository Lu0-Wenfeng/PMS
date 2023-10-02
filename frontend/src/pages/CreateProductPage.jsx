import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Textarea, // Import Textarea for product description
} from '@chakra-ui/react';

const CreateProductPage = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productinStockQuantity, setProductinStockQuantity] = useState(0);
  const [productImageUrl, setProductImageUrl] = useState('');


  const handleCreateProduct = async () => {
    if (!productName || !productPrice || !productDescription || !productCategory || !productinStockQuantity) {
      console.error('All fields are required');
    }


    const newProduct = {
      name: productName,
      description: productDescription,
      category: productCategory,
      price: productPrice,
      inStockQuantity: productinStockQuantity,
      productImageUrl: productImageUrl,
    };

    try {
      const response = await fetch('/create-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        // Product creation successful, handle subsequent logic
        console.log('Product created successfully');
        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setProductCategory('');
        setProductinStockQuantity(0);
        setProductImageUrl('');
      } else {
        // Product creation failed, handle error message
        const errorMessage = await response.text();
        console.error('Product creation failed:', errorMessage);
      }
    } catch (error) {
      console.error('Error during product creation:', error);
    }
  };

  return (
    <Box p="4">
      <Heading as="h1" mb="4">
        Create Product Page
      </Heading>
      <VStack spacing="4">
        <FormControl>
          <FormLabel>Product Name</FormLabel>
          <Input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Product Price</FormLabel>
          <Input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Enter product price"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Product Description</FormLabel>
          <Textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter product description"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Product Category</FormLabel>
          <Input
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            placeholder="Enter product category"
          />
        </FormControl>

        <FormControl>
          <FormLabel>In Stock Quantity</FormLabel>
          <Input
            type="number"
            value={productinStockQuantity}
            onChange={(e) => setProductinStockQuantity(e.target.value)}
            placeholder="Enter in stock quantity"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Product Image URL</FormLabel>
          <Input
            type="text"
            value={productImageUrl}
            onChange={(e) => setProductImageUrl(e.target.value)}
            placeholder="Enter product image URL"
          />
        </FormControl>

        <Button colorScheme="blue" type="button" onClick={handleCreateProduct}>
          Create Product
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateProductPage;
