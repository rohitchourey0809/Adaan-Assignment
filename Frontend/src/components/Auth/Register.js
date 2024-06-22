import React, { useState } from "react";
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { register } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const userData = await register({ phone, email, name, password });
      console.log("userData", userData);
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
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button onClick={submitHandler}>Register</Button>
      </Stack>
    </Box>
  );
};

export default Register;
