import React, { useState, useEffect, useCallback  } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Flex,
  Image,
  Text,
  Button,
  Link as ChakraLink,
  Select,
  HStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const ITEMS_PER_PAGE = 10;
// const PRODUCTS_PER_ROW = 5;

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("lastAdded");

  const selectStyles = {
    
    variant: "outline",
    border: "1px solid",
    borderColor: "gray.300",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/all-products");
        if (response.status === 200) {
          const productList = response.data;
          setProducts(productList);
        } else {
          console.error("Failed to fetch product list");
        }
      } catch (error) {
        console.error("Error during product list fetch:", error);
      }
    };

    //确保组件未挂载时才调用 setProducts
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products]);

  useEffect(() => {
    const sortProducts = () => {
      if (sortOption === "priceHighToLow") {
        setProducts((prevProducts) => [...prevProducts].sort((a, b) => b.price - a.price));
      } else if (sortOption === "priceLowToHigh") {
        setProducts((prevProducts) => [...prevProducts].sort((a, b) => a.price - b.price));
      } else if (sortOption === "lastAdded") {
        setProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        );
      }
    };

    sortProducts();
  }, [sortOption]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  },[]);

  const handleSortChange = useCallback((option) => {
    setSortOption(option);
  },[]);

  const renderPageButtons = () => {
    const pageButtons = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <Button
          key={i}
          variant={i === currentPage ? "solid" : "outline"}
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
    <Box p="4" textColor="black">
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <Heading as="h1">Products List Page</Heading>
        <Flex>
          <Select
            variant="outline"
            size="sm"
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortOption}
            mr="2"
            {...selectStyles}
          >
            <option value="lastAdded">Last Added</option>
            <option value="priceHighToLow">Price High to Low</option>
            <option value="priceLowToHigh">Price Low to High</option>
          </Select>
          <ChakraLink href="/create-product">
            <Button colorScheme="teal" size="sm" bg={"purple"}>
              Add Product
            </Button>
          </ChakraLink>
        </Flex>
      </Flex>

      {currentProducts.length === 0 ? (
        <Text>No products available.</Text>
      ) : (
        <>
          <Flex flexWrap="wrap">
            {currentProducts.map((product) => (
              
              <Box
                key={product.id}
                width={{ base: "100%", md: "50%", lg: "20%" }}
                p="2"
              >
                <ChakraLink key={product._id} href={`./all-products/${product._id}`}>
                <Image
                  src={product.productImageUrl}
                  alt={product.name}
                  width="230px"
                  height="190px"
                />
                <Text mt="2" fontWeight="medium" color={"gray"}>
                  {product.name}
                </Text>
                <Text><strong>${product.price}</strong></Text>
                </ChakraLink>

                <HStack>
                  <Button bg={"purple"}>这里放数量</Button>
                  <Button>Edit</Button>

                </HStack>
              </Box>
            ))}
          </Flex>
          <Box
            mt="4"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
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
          <Box mt="4" display="flex" justifyContent="flex-end"></Box>
        </>
      )}
    </Box>
  );
};

export default AllProductsPage;
