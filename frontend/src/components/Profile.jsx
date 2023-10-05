import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";

const Profile = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleUpdatePassword = async () => {
    try {
    } catch (error) {}
  };

  const handleLogout = async () => {
    try {
    } catch (error) {}
  };

  return (
    <>
      <Button
        onClick={() => setIsDrawerOpen(true)}
        leftIcon={<BsFillPersonFill />}
        variant="solid"
      >
        Sign In
      </Button>
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Welcome, user!</DrawerHeader>
          <DrawerBody>
            <Button mt={4} onClick={handleUpdatePassword}>
              Update Password
            </Button>
            <Button mt={4} colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Profile;
