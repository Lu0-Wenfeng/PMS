import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Box, HStack, Heading, Text, Image, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const [productDetails, setProductDetails] = useState({inStockQuantity: 0 }); 
  // const params = useParams();
  const {id} = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/all-products/${id}`);
        if (response.data) {
          const productDetails = response.data;
          console.log(productDetails);
          setProductDetails(productDetails);
        } else {
          console.error('Failed to fetch product details');
          // Optionally: Set an error state or redirect to an error page
        }
      } catch (error) {
        console.error('Error during product details fetch:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <Box p="4">
      <Heading as="h1" mb="4">
        Product Detail Page
      </Heading>
      <Box>
        <HStack>
          <Image src={productDetails.productImageUrl} alt={productDetails.name} width="400px" height="300px" />

          <VStack>
            <Text fontWeight="thin">
              Category: {productDetails.category}
            </Text>

            <Text fontWeight="bold">
              Name: {productDetails.name}
            </Text>

            <HStack>
              <Text>
                <strong>Price:</strong> ${productDetails.price}
              </Text>

              <Text style={{ color: productDetails.inStockQuantity > 0 ? 'black' : 'red' }}>
                <strong>{productDetails.inStockQuantity > 0 ? `In Stock Quantity: ${productDetails.inStockQuantity}` : 'Out Of Stock'}</strong>
              </Text>
            </HStack>

            <Text fontWeight={"normal"}>
              Description: {productDetails.description}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;


