// frontend/src/api/noteApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getNotes = async (token, tags = "") => {
  const res = await axios.get(`${API_URL}/notes${tags ? `?tags=${tags}` : ""}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createNote = async (token, data) => {
  const res = await axios.post(`${API_URL}/notes`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateNote = async (token, id, data) => {
  const res = await axios.put(`${API_URL}/notes/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteNote = async (token, id) => {
  const res = await axios.delete(`${API_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
