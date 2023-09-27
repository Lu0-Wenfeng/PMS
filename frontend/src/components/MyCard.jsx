import React from "react";
import { Box, Center, CloseButton } from "@chakra-ui/react";

const MyCard = ({ title, children }) => {
  return (
    <Box
      position="relative"
      bgColor="white"
      p="5"
      border="1px solid"
      borderColor="gray.300"
      boxShadow="md"
      borderRadius="md"
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
      />
      <Center fontSize="2xl" mt="2" mb="4" fontWeight="bold" color="black">
        {title}
      </Center>
      {children}
    </Box>
  );
};

export default MyCard;
