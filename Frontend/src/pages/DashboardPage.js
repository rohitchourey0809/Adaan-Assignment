import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Profile from "../components/Dashboard/Profile";

const DashboardPage = () => {
  return (
    <Box p={4}>
      <Heading mb={4}>Dashboard</Heading>
      <Profile />
    </Box>
  );
};

export default DashboardPage;
