// frontend/src/api/authApi.js
import axiosInstance from "./axios";
import logger from "../utils/logger";

const TAG = "[AuthFeature]";

export const registerUser = async (data) => {
  try {
    logger.action(TAG, "Register user request", { email: data.email });
    const res = await axiosInstance.post("/auth/register", data);
    logger.success(TAG, "User registered successfully", { email: data.email });
    return res.data;
  } catch (error) {
    logger.error(TAG, "Registration failed", error);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    logger.action(TAG, "Login user request", { email: data.email });
    const res = await axiosInstance.post("/auth/login", data);
    logger.success(TAG, "User logged in successfully", { email: data.email });
    return res.data;
  } catch (error) {
    logger.error(TAG, "Login failed", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    logger.action(TAG, "Logout user request");
    const res = await axiosInstance.post("/auth/logout");
    logger.success(TAG, "User logged out successfully");
    return res.data;
  } catch (error) {
    logger.error(TAG, "Logout failed", error);
    throw error;
  }
};
