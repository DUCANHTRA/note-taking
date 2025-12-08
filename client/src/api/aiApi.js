// frontend/src/api/aiApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getAISuggestions = async (token, noteData) => {
  const res = await axios.post(`${API_URL}/notes/suggest`, noteData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
