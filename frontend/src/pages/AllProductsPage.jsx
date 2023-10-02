import React, { useState, useEffect } from 'react';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/all-products');
        if (response.ok) {
          const productList = await response.json();
          setProducts(productList);
        } else {
          console.error('Failed to fetch product list');
        }
      } catch (error) {
        console.error('Error during product list fetch:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to fetch products only once when component mounts

  return (
    <Box p="4">
      <Heading as="h1" mb="4">
        Products List Page
      </Heading>
      {products.length === 0 ? (
        <Text>No products available.</Text>
      ) : (
        <List>
          {products.map((product) => (
            <ListItem key={product.id}>
              <strong>Name:</strong> {product.name} <br />
              {/* <strong>Description:</strong> {product.description} <br />
              <strong>Category:</strong> {product.category} <br /> */}
              <strong>Price:</strong> ${product.price} <br />
              {/* <strong>In Stock Quantity:</strong> {product.inStockQuantity} <br /> */}
              <strong>Image URL:</strong> {product.productImageUrl}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AllProductsPage;

