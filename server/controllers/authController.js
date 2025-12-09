// backend/controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

const TAG = "[AuthFeature]";

const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    logger.action(TAG, "Registration attempt", null, { email });

    // Validation
    if (!email || !password) {
      logger.warn(TAG, "Registration failed - Missing required fields", {
        email: !!email,
        password: !!password,
      });
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user exists
    const exists = await User.findOne({ email });
    if (exists) {
      logger.warn(TAG, "Registration failed - Email already in use", { email });
      return res.status(400).json({ message: "Email in use" });
    }

    // Create user
    const user = await User.create({ email, password });
    logger.success(TAG, "User registered successfully", {
      userId: user._id,
      email: user.email,
    });

    const token = genToken(user._id);
    logger.info(TAG, "JWT token generated for new user", { userId: user._id });

    res.json({
      _id: user._id,
      email: user.email,
      token,
    });
  } catch (err) {
    logger.error(TAG, "Registration error", err);
    res.status(500).json({
      message: err.message || "Registration failed. Please try again.",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    logger.action(TAG, "Login attempt", null, { email });

    // Validation
    if (!email || !password) {
      logger.warn(TAG, "Login failed - Missing credentials", {
        email: !!email,
        password: !!password,
      });
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(TAG, "Login failed - User not found", { email });
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      logger.warn(TAG, "Login failed - Invalid password", {
        email,
        userId: user._id,
      });
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Success
    logger.success(TAG, "User logged in successfully", {
      userId: user._id,
      email: user.email,
    });

    const token = genToken(user._id);
    logger.info(TAG, "JWT token generated", { userId: user._id });

    res.json({
      _id: user._id,
      email: user.email,
      token,
    });
  } catch (err) {
    logger.error(TAG, "Login error", err);
    res.status(500).json({
      message: err.message || "Login failed. Please try again.",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const userId = req.user?._id;
    logger.action(TAG, "Logout", userId, { email: req.user?.email });

    logger.success(TAG, "User logged out successfully", { userId });
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    logger.error(TAG, "Logout error", err);
    res.status(500).json({ message: "Logout failed" });
  }
};
