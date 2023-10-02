import React, { useState, useEffect } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'; // Import useParams

const ProductDetailPage = () => {
  const [productDetails, setProductDetails] = useState({});
  const { productId } = useParams(); // Use useParams to get the 'productId' parameter

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`/all-products/${productId}`);
        if (response.ok) {
          const productDetails = await response.json();
          setProductDetails(productDetails);
        } else {
          console.error('Failed to fetch product details');
        }
      } catch (error) {
        console.error('Error during product details fetch:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <Box p="4">
      <Heading as="h1" mb="4">
        Product Detail Page
      </Heading>
      <Text>
        <strong>Name:</strong> {productDetails.name}
      </Text>
      <Text>
        <strong>Price:</strong> ${productDetails.price}
      </Text>
      <Text>
        <strong>Description:</strong> {productDetails.description}
      </Text>
      <Text>
        <strong>Category:</strong> {productDetails.category}
      </Text>
      <Text>
        <strong>In Stock Quantity:</strong> {productDetails.inStockQuantity}
      </Text>
      <Text>
        <strong>Image URL:</strong> {productDetails.productImageUrl}
      </Text>
    </Box>
  );
};

export default ProductDetailPage;

