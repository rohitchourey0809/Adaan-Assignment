import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Login from "../components/Auth/Login";

const LoginPage = () => {
  return (
    <Box p={4}>
      <Heading mb={4}>Login</Heading>
      <Login />
    </Box>
  );
};

export default LoginPage;
