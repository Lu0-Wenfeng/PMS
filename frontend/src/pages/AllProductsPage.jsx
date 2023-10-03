import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Flex, Image, Text, Button, Link, Select } from '@chakra-ui/react';

const ITEMS_PER_PAGE = 10;
// const PRODUCTS_PER_ROW = 5;

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('lastAdded');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/all-products');
        if (response.status === 200) {
          const productList = response.data;
          setProducts(productList);
        } else {
          console.error('Failed to fetch product list');
        }
      } catch (error) {
        console.error('Error during product list fetch:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // last added目前没有功能 因为我们需要在后端给商品增加added time这个属性
    if (sortOption === 'priceHighToLow') {
      setProducts([...products].sort((a, b) => b.price - a.price));
    } else if (sortOption === 'priceLowToHigh') {
      setProducts([...products].sort((a, b) => a.price - b.price));
    }
  }, [sortOption]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <Button
          key={i}
          variant={i === currentPage ? 'solid' : 'outline'}
          size="sm"
          onClick={() => handlePageChange(i)}
          ml="2"
        >
          {i}
        </Button>
      );
    }

    return pageButtons;
  };

  return (
    <Box p="4">
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <Heading as="h1">Products List Page</Heading>
        <Flex>
        <Select
            variant="outline"
            size="sm"
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortOption}
            mr="2"
          >
            <option value="lastAdded">Last Added</option>
            <option value="priceHighToLow">Price High to Low</option>
            <option value="priceLowToHigh">Price Low to High</option>
          </Select>
          <Link href="/create-product">
            <Button colorScheme="teal" size="sm">
              Add Product
            </Button>
          </Link>
        </Flex>
      </Flex>

      {currentProducts.length === 0 ? (
        <Text>No products available.</Text>
      ) : (
        <>
          <Flex flexWrap="wrap">
            {currentProducts.map((product) => (
              <Box key={product.id} width={{ base: '100%', md: '50%', lg: '20%' }} p="2">
                <Image
                  src={product.productImageUrl}
                  alt={product.name}
                  width="90%"
                  height="auto"
                  maxH="250px"
                />
                <Text mt="2" fontWeight="bold">
                  {product.name}
                </Text>
                <Text>${product.price}</Text>
              </Box>
            ))}
          </Flex>
          <Box mt="4" display="flex" justifyContent="center" alignItems="center">
            {/* <Text>
              Page {currentPage} of {totalPages}
            </Text> */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              ml="2"
            >
              «
            </Button>

            {renderPageButtons()}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              ml="2"
            >
              »
            </Button>
          </Box>
          <Box mt="4" display="flex" justifyContent="flex-end">
            
          </Box>
        </>
      )}
    </Box>
  );
};

export default AllProductsPage;

