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

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    skills: "",
    education: "",
    photo: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${baseURL}/api/update-profile`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={5}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" onChange={handleChange} />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" onChange={handleChange} />
          </FormControl>
          <FormControl id="experience">
            <FormLabel>Experience</FormLabel>
            <Input type="text" name="experience" onChange={handleChange} />
          </FormControl>
          <FormControl id="skills">
            <FormLabel>Skills</FormLabel>
            <Input type="text" name="skills" onChange={handleChange} />
          </FormControl>
          <FormControl id="education">
            <FormLabel>Education</FormLabel>
            <Input type="text" name="education" onChange={handleChange} />
          </FormControl>
          <FormControl id="photo">
            <FormLabel>Photo</FormLabel>
            <Input type="file" name="photo" onChange={handleFileChange} />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Update Profile
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Dashboard;
