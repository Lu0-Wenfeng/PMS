import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Box, HStack, Heading, Text, Image, VStack, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';


const ProductDetailPage = () => {
  const [productDetails, setProductDetails] = useState({}); 
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
    <Box p="4" textColor="black">
      <Heading as="h1" mb="4">
        Product Details
      </Heading>
    <Box>
    <HStack alignItems="flex-start">
      <Image src={productDetails.productImageUrl} alt={productDetails.name} width="600px" height="500px" />

      <VStack p='10' alignItems="flex-start">
        <Text fontWeight="thin" fontSize='lg' ml={0}>
          {productDetails.category}
        </Text>

        <Text fontWeight="normal" fontSize='4xl' textColor={'gray'}>
          {productDetails.name}
        </Text>

        <HStack p='5' spacing='10' alignSelf="flex-start">
          <Text fontSize='4xl'>
            <strong>${productDetails.price}</strong>
          </Text>

          <Text fontSize='sm'
            color={productDetails.inStockQuantity > 0 ? 'black' : 'deepred'}
            border="1px solid #000"
            background={'tomato'}
            borderRadius="8px"
            padding="5px">
            {productDetails.inStockQuantity > 0 ? `In Stock : ${productDetails.inStockQuantity}` : 'Out Of Stock'}
          </Text>
        </HStack>

        <Text fontWeight={"normal"}>
          {productDetails.description}
        </Text>

        <HStack>
          <Button colorScheme={'blue'}>
            Add to cart
          </Button>

          <Button colorScheme={'purple'}>
            Edit
          </Button>
        </HStack>
        
      </VStack>
    </HStack>
  </Box>
</Box>

  );
};

export default ProductDetailPage;