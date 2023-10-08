import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import {
  ITEMS_PER_PAGE,
  fetchAllProducts,
  setCurrentPage,
  setSortOption,
} from "../store/productSlice";
// const PRODUCTS_PER_ROW = 5;

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const {
    productList,
    currentPage,
    totalPages,
  } = useSelector((state) => state.products);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const sortOption = useSelector((state) => state.products.sortOption);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [userType, setUserType] = useState("regular");

  const selectStyles = {
    variant: "outline",
    border: "1px solid",
    borderColor: "gray.300",
  };

  useEffect(() => {
    //确保组件未挂载时才调用 setProducts
    if (productList.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [productList, dispatch]);

  useEffect(() => {
    const sortProducts = () => {
      let sorted = [...productList];
      if (sortOption === "priceHighToLow") {
        sorted.sort((a, b) => b.price - a.price);
      } else if (sortOption === "priceLowToHigh") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortOption === "lastAdded") {
        sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      }
      setSortedProducts(sorted);
    };

    sortProducts();
  }, [productList, sortOption]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(setCurrentPage(newPage));
    },
    [dispatch]
  );

  const handleSortChange = useCallback(
    (option) => {
      dispatch(setSortOption(option));
    },
    [dispatch]
  );

  const renderPageButtons = () => {
    const pageButtons = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <Button
          colorScheme="orange"
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

          {isAdmin && (
            <ChakraLink as={RouterLink} to="/create-product">
              <Button colorScheme="teal" size="sm" bg={"purple"}>
                Add Product
              </Button>
            </ChakraLink>
          )}
        </Flex>
      </Flex>

      {currentProducts.length === 0 ? (
        <Text>No products available.</Text>
      ) : (
        <>
          <Flex flexWrap="wrap">
            {currentProducts.map((product) => (
              <Box
                key={product._id}
                width={{ base: "100%", md: "50%", lg: "20%" }}
                p="2"
              >
                <ChakraLink
                  as={RouterLink}
                  key={product._id}
                  to={`./${product._id}`}
                >
                  <Image
                    src={product.productImageUrl}
                    alt={product.name}
                    width="230px"
                    height="190px"
                  />
                  <Text mt="2" fontWeight="medium" color={"gray"}>
                    {product.name}
                  </Text>
                  <Text>
                    <strong>${product.price}</strong>
                  </Text>
                </ChakraLink>

                <HStack>
                  <Button bg={"purple"}>这里放数量</Button>
                  <ChakraLink
                    as={RouterLink}
                    to={`/edit-product/${product._id}`}
                  >
                    <Button colorScheme="orange">Edit</Button>
                  </ChakraLink>
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
              colorScheme="blue.700"
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
              colorScheme="blue.700"
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
