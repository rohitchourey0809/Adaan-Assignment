import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../api";

const Register = () => {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    name: "",
    password: "",
    otp: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatPhoneNumber = (phone) => {
    return phone.startsWith("+91") ? phone : `+91${phone}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        phone: formatPhoneNumber(formData.phone),
      };
      await axios.post(`${baseURL}/api/register`, formattedData);
      navigate("/login");
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={5}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="phone">
            <FormLabel>Phone</FormLabel>
            <Input type="text" name="phone" onChange={handleChange} required />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" onChange={handleChange} required />
          </FormControl>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" onChange={handleChange} required />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Register
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
