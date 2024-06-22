import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Register from "../components/Auth/Register";

const RegisterPage = () => {
  return (
    <Box p={4}>
      <Heading mb={4}>Register</Heading>
      <Register />
    </Box>
  );
};

export default RegisterPage;
