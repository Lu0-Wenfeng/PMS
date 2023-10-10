import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import {
  Box,
  Heading,
  Flex,
  Image,
  Text,
  Input,
  Button,
  ButtonGroup,
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
import {
  updateProductQuantity,
  addProductToCart,
  removeFromCart,
} from "../store/cartSlice";

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const { productList, currentPage, totalPages } = useSelector(
    (state) => state.products
  );
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const sortOption = useSelector((state) => state.products.sortOption);
  const cartItems = useSelector((state) => state.cart.items);
  const [sortedProducts, setSortedProducts] = useState([]);

  const selectStyles = {
    variant: "outline",
    border: "1px solid",
    borderColor: "gray.300",
  };

  useEffect(() => {
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
          ml={{ base: 2, md: 2 }}
        >
          {i}
        </Button>
      );
    }

    return pageButtons;
  };

  const onDecrease = (productId) => {
    const index = cartItems.findIndex((item) => item.productId === productId);
    if (cartItems[index].quantity === 1) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(
        updateProductQuantity({
          productId,
          quantity: cartItems[index].quantity - 1,
        })
      );
    }
  };

  return (
    <Box p={{ base: 2, md: 4 }} textColor="black">
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        mb={{ base: 2, md: 4 }}
      >
        <Heading as="h1" mb={{ base: 2, md: 0 }}>
          Products List Page
        </Heading>
        <Flex>
          <Select
            variant="outline"
            size="sm"
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortOption}
            mr={{ base: 2, md: 2 }}
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
                p={{ base: 2, md: 2 }}
              >
                <ChakraLink
                  as={RouterLink}
                  key={product._id}
                  to={`./${product._id}`}
                >
                  <Image
                    src={product.productImageUrl || noImage}
                    alt={product.name}
                    width="200px"
                    height="150px"
                  />
                  <Text
                    mt="2"
                    fontWeight="medium"
                    color={"gray"}
                    style={{
                      maxHeight: "2em",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.name}
                  </Text>
                  <Text>
                    <strong>${product.price}</strong>
                  </Text>
                </ChakraLink>

                <HStack mt="2" spacing={{ base: 2, md: 5 }}>
                  {((cartItem) =>
                    cartItem && cartItem.quantity > 0 ? (
                      <ButtonGroup colorScheme="orange" size="sm" isAttached>
                        <Button onClick={() => onDecrease(cartItem.productId)}>
                          -
                        </Button>
                        <Button
                          value={cartItem.productId}
                          onClick={() => {}}
                          _hover={{
                            transform: "none",
                            boxShadow: "none",
                          }}
                          _focus={{ boxShadow: "none" }}
                          _active={{ bg: "initial", transform: "none" }}
                        >
                          {cartItem.quantity}
                        </Button>
                        <Button
                          onClick={() =>
                            dispatch(
                              updateProductQuantity({
                                productId: cartItem.productId,
                                quantity: cartItem.quantity + 1,
                              })
                            )
                          }
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    ) : (
                      <Button
                        onClick={() =>
                          dispatch(
                            addProductToCart({
                              productId: product._id,
                              productPrice: product.price,
                              productName: product.name,
                              productImageUrl: product.productImageUrl,
                            })
                          )
                        }
                        colorScheme="orange"
                        size="sm"
                      >
                        Add to Cart
                      </Button>
                    ))(
                    cartItems.find((item) => item.productId === product._id)
                  )}
                  {isAdmin && (
                    <ChakraLink
                      as={RouterLink}
                      to={`/edit-product/${product._id}`}
                    >
                      <Button colorScheme="orange" size="sm">
                        Edit
                      </Button>
                    </ChakraLink>
                  )}
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
            <Button
              colorScheme="blue.700"
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              ml={{ base: 2, md: 2 }}
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
              ml={{ base: 2, md: 2 }}
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
