import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Select,
  Image,
  Textarea,
  useDisclosure,
  Modal,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  CloseButton,
} from "@chakra-ui/react";
import {
  fetchProductDetails,
  updateProduct,
  deleteProduct,
} from "../store/reducers/productSlice";
import Prompt from "../components/Prompt";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productInStockQuantity, setProductInStockQuantity] = useState(0);
  const [productImageUrl, setproductImageUrl] = useState("");
  const { id } = useParams();
  const currentProduct = useSelector((state) => state.products.currentProduct);
  const inputStyles = {
    mt: "2",
    variant: "outline",
    border: "1px solid",
    borderColor: "gray.300",
    textColor: "black",
    _hover: {
      borderColor: "blue.500",
      boxShadow: "0 0 0 1px #3182ce",
    },
    autoFocus: true,
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentProduct) {
      setProductName(currentProduct.name);
      setProductDescription(currentProduct.description);
      setProductPrice(currentProduct.price);
      setProductCategory(currentProduct.category);
      setproductImageUrl(currentProduct.productImageUrl);
      setProductInStockQuantity(currentProduct.inStockQuantity);
    }
  }, [currentProduct]);

  const handleUpdateProduct = async () => {
    // Validation logic here...
    const updatedProduct = {
      name: productName,
      description: productDescription,
      category: productCategory,
      price: productPrice,
      inStockQuantity: productInStockQuantity,
      productImageUrl,
    };
    try {
      await dispatch(updateProduct({ id, updatedProduct })).unwrap();
      alert("Product has been updated successfully.");
      navigate("/all-products");
    } catch (error) {
      console.error("Error when updating the product", error.message);
      navigate("/error");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
    } catch (error) {
      console.error("Error when deleting the product", error.message);
      navigate("/error");
    }
  };

  return (
    <>
      <Box p={{ base: 2, md: 4 }} maxW="600px" mx="auto" textColor="black">
        <Heading as="h1" mb="4">
          Edit Product
        </Heading>
        <Box
          position="relative"
          boxShadow="dark-lg"
          p="6"
          rounded="md"
          bg="white"
        >
          <CloseButton
            bgColor="gray.100"
            position="absolute"
            right="1rem"
            top="1rem"
            onClick={() => navigate(-1)}
          />
          <VStack spacing="4">
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                {...inputStyles}
                placeholder="Enter product name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Product Description</FormLabel>
              <Textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                {...inputStyles}
                placeholder="Enter product description"
              />
            </FormControl>

            <HStack spacing={{ base: 2, md: 20 }} justify="center" w="100%">
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  {...inputStyles}
                  placeholder="Enter price"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  placeholder="Select product category"
                  {...inputStyles}
                >
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  {/* Add more categories as needed */}
                </Select>
              </FormControl>
            </HStack>

            <HStack spacing={{ base: 2, md: 20 }} justify="center" w="100%">
              <FormControl>
                <FormLabel>In Stock Quantity</FormLabel>
                <Input
                  type="number"
                  value={productInStockQuantity}
                  onChange={(e) => setProductInStockQuantity(e.target.value)}
                  {...inputStyles}
                  placeholder="Enter in stock quantity"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Add Image Link</FormLabel>
                <Input
                  type="text"
                  value={productImageUrl}
                  onChange={(e) => setproductImageUrl(e.target.value)}
                  {...inputStyles}
                  placeholder="Enter product image URL"
                />
              </FormControl>
            </HStack>

            <Box p="4" border="2px" borderColor="gray.200" borderRadius="md">
              <Image
                src={productImageUrl || noImage}
                alt="Product Preview"
                height="100px"
                maxW="100%"
              />
            </Box>
            <HStack>
              <Button
                colorScheme="blue"
                type="button"
                onClick={handleUpdateProduct}
              >
                Update Product
              </Button>
              <Button colorScheme="red" type="button" onClick={onOpen}>
                Delete Product
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          navigate("/all-products");
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <Prompt
            status="error"
            title="Attention!"
            description="Are you sure you want to delete this product?"
          />
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                onClose();
                handleDeleteProduct();
                navigate(-1);
              }}
            >
              Yes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProduct;
