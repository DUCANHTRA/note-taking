// frontend/src/api/authApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}/auth/register`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}/auth/login`, data);
  return res.data;
};
