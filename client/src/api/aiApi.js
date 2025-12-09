// frontend/src/api/aiApi.js
import axiosInstance from "./axios";
import logger from "../utils/logger";

const TAG = "[AIFeature]";

export const getAISuggestions = async (noteData) => {
  try {
    logger.action(TAG, "Request AI suggestions", { title: noteData.title });
    const res = await axiosInstance.post("/notes/suggest", noteData);
    logger.success(TAG, "AI suggestions received", {
      suggestionsCount: res.data.suggestions?.length || 0
    });
    return res.data;
  } catch (error) {
    logger.error(TAG, "Failed to get AI suggestions", error);
    throw error;
  }
};

