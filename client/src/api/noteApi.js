// frontend/src/api/noteApi.js
import axiosInstance from "./axios";
import logger from "../utils/logger";

const TAG = "[NoteFeature]";

export const getNotes = async (tags = "") => {
  try {
    logger.action(TAG, "Fetch notes request", { tags });
    const res = await axiosInstance.get(`/notes${tags ? `?tags=${tags}` : ""}`);
    logger.success(TAG, "Notes fetched successfully", { count: res.data.length });
    return res.data;
  } catch (error) {
    logger.error(TAG, "Failed to fetch notes", error);
    throw error;
  }
};

export const createNote = async (data) => {
  try {
    logger.action(TAG, "Create note request", { title: data.title });
    const res = await axiosInstance.post("/notes", data);
    logger.success(TAG, "Note created successfully", { noteId: res.data._id });
    return res.data;
  } catch (error) {
    logger.error(TAG, "Failed to create note", error);
    throw error;
  }
};

export const updateNote = async (id, data) => {
  try {
    logger.action(TAG, "Update note request", { noteId: id, title: data.title });
    const res = await axiosInstance.put(`/notes/${id}`, data);
    logger.success(TAG, "Note updated successfully", { noteId: id });
    return res.data;
  } catch (error) {
    logger.error(TAG, "Failed to update note", error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    logger.action(TAG, "Delete note request", { noteId: id });
    const res = await axiosInstance.delete(`/notes/${id}`);
    logger.success(TAG, "Note deleted successfully", { noteId: id });
    return res.data;
  } catch (error) {
    logger.error(TAG, "Failed to delete note", error);
    throw error;
  }
};

