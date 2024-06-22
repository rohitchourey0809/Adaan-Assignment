import React from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  return (
    <Flex bg="teal.500" color="white" p={4} justifyContent="space-between">
      <Heading size="md">
        <Link to="/">MyApp</Link>
      </Heading>
      <Box>
        {userInfo ? (
          <>
            <Button colorScheme="teal" variant="outline" mr={2}>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button colorScheme="teal" variant="outline" mr={2}>
              <Link to="/login">Login</Link>
            </Button>
            <Button colorScheme="teal" variant="outline">
              <Link to="/register">Register</Link>
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
