// frontend/src/api/noteApi.js
import axiosInstance from "./axios";

export const getNotes = async (tags = "") => {
  const res = await axiosInstance.get(`/notes${tags ? `?tags=${tags}` : ""}`);
  return res.data;
};

export const createNote = async (data) => {
  const res = await axiosInstance.post("/notes", data);
  return res.data;
};

export const updateNote = async (id, data) => {
  const res = await axiosInstance.put(`/notes/${id}`, data);
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await axiosInstance.delete(`/notes/${id}`);
  return res.data;
};
