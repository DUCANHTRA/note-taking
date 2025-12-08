// backend/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan"; // <-- import morgan

import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/note.js";

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // <-- add morgan logging

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

export default app;
