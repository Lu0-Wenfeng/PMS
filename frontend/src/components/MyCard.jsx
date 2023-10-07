import React from "react";
import { Box, Center, CloseButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const MyCard = ({ title, children }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <Box
      position="relative"
      p="5"
      border="1px solid"
      borderColor="gray.300"
      boxShadow="md"
      borderRadius="md"
      textColor="black"
      w={["90%", "50%"]}
      m="auto"
      my={["20%", "10%"]}
    >
      <CloseButton
        position="absolute"
        top="15px"
        right="15px"
        color="black"
        size="xl"
        onClick={handleClick}
      />
      <Center fontSize="2xl" my="2" fontWeight="bold" >
        {title}
      </Center>
      {children}
    </Box>
  );
};

export default MyCard;
