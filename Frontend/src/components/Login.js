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

const Login = () => {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
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

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/send-otp`, {
        phone: formatPhoneNumber(formData.phone),
      });
      if (response.status === 200) {
        setOtpSent(true);
      } else {
        console.error("Failed to send OTP", response.data);
      }
    } catch (error) {
      console.error(
        "Error sending OTP",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (otpSent) {
        const response = await axios.post(`${baseURL}/api/verify-otp`, {
          phone: formatPhoneNumber(formData.phone),
          code: formData.otp,
        });
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
        } else {
          console.error("Invalid OTP", response.data);
        }
      } else {
        const response = await axios.post(`${baseURL}/api/login`, {
          phone: formatPhoneNumber(formData.phone),
          password: formData.password,
        });
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
        } else {
          console.error("Invalid credentials", response.data);
        }
      }
    } catch (error) {
      console.error(
        "Error during authentication",
        error.response ? error.response.data : error.message
      );
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
          {!otpSent && (
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                required
              />
            </FormControl>
          )}
          {otpSent && (
            <FormControl id="otp">
              <FormLabel>OTP</FormLabel>
              <Input type="text" name="otp" onChange={handleChange} required />
            </FormControl>
          )}
          {!otpSent ? (
            <Button colorScheme="blue" onClick={handleSendOtp}>
              Send OTP
            </Button>
          ) : (
            <Button type="submit" colorScheme="blue">
              Login
            </Button>
          )}
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
