import React, { useRef, useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Spinner,
  List,
  ListItem,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../store/reducers/productSlice";

const SearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allProducts = useSelector((state) => state.product?.productList);

  const handleSearch = async () => {
    if (ref.current) {
      const query = ref.current.value.toLowerCase();
      const regex = new RegExp(ref.current.value, "i");
      const matchedProducts = allProducts.filter((product) =>
        regex.test(product.name)
      );
      setResults(matchedProducts);
      setLoading(true);
      setError(null);

      try {
        await dispatch(searchProducts(query));
      } catch (error) {
        setError("Search failed. Please try again.");
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
      }}
    >
      <InputGroup
        maxW={{ base: "100%", sm: "400px", md: "600px", lg: "800px" }}
        width="100%"
        mx="auto"
        mt="5px"
      >
        <Input
          textColor="black"
          ref={ref}
          borderRadius={10}
          placeholder="Search"
          variant="outline"
          bg="white"
          _placeholder={{ opacity: 1, color: "gray.500" }}
        />
        <InputRightElement>
          <Button
            type="submit"
            colorScheme="blue"
            onClick={handleSearch}
            isDisabled={loading}
          >
            {loading ? (
              <Spinner size="sm" color="white" />
            ) : (
              <BsSearch color="white" />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>

      {results.length > 0 && (
        <Box
          position="absolute"
          mt="2"
          w="100%"
          bg="white"
          boxShadow="md"
          borderRadius="md"
          zIndex="10"
        >
          <List spacing={2}>
            {results.slice(0, 5).map(
              (
                product // 仅显示前5个搜索结果
              ) => (
                <ListItem key={product._id} cursor="pointer">
                  <ChakraLink as={RouterLink} to={"./product._id"}>
                    {product.name}
                  </ChakraLink>
                </ListItem>
              )
            )}
          </List>
        </Box>
      )}

      {error && (
        <div style={{ color: "red", marginTop: "5px" }}>Error: {error}</div>
      )}
    </form>
  );
};

export default SearchBar;
