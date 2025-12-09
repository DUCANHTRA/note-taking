// frontend/src/api/aiApi.js
import axiosInstance from "./axios";

export const getAISuggestions = async (noteData) => {
  const res = await axiosInstance.post("/notes/suggest", noteData);
  return res.data;
};
