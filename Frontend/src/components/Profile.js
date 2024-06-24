import React, { useEffect, useState } from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";
import { baseURL } from "../api";

const Profile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${baseURL}/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ maxWidth: "500px", margin: "auto", marginTop: "50px" }}
    >
      <Box
        bg="gray.900"
        p={4}
        boxShadow="lg"
        borderRadius="xl"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        overflow="hidden"
        textAlign="center"
        gap={100}
      >
        {/* Left side - Profile photo */}
        <Box flexShrink={0} mr={4}>
          {userData.photo && (
            <Image
              src={`http://localhost:8080${userData.photo}`}
              alt="Profile"
              boxSize="200px"
              objectFit="cover"
              objectPosition="center"
            />
          )}
        </Box>

        {/* Right side - User details */}
        <VStack align="flex-start" spacing={2} flex={1}>
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">
            {userData.name}
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="white">
            {userData.email}
          </Text>
          <Text fontSize="md" fontWeight="bold" color="white">
            {userData.phone}
          </Text>
          <Text fontSize="md" fontWeight="bold" color="white">
            Experience: {userData.experience}
          </Text>
          <Text fontSize="md" fontWeight="bold" color="white">
            Skills: {userData.skills}
          </Text>
          <Text fontSize="md" fontWeight="bold" color="white">
            Education: {userData.education}
          </Text>
        </VStack>
      </Box>
    </motion.div>
  );
};

export default Profile;
