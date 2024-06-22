import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { login } from "../../api/userApi";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ phone, password });
      localStorage.setItem("userInfo", JSON.stringify(userData));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={4}>
      <Stack spacing={4}>
        <Input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={submitHandler}>Login</Button>
      </Stack>
    </Box>
  );
};

export default Login;
