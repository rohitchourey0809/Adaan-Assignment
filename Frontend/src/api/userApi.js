import axios from "axios";
// export const API_URL = "http://localhost:8080/api/users";
export const API_URL = "https://backend-adaani-digital.vercel.app/api/users";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

const getProfile = async (token) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const updateProfile = async (userData, token) => {
  const response = await axios.put(`${API_URL}/profile`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export { register, login, getProfile, updateProfile };
