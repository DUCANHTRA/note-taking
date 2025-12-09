// backend/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan"; // <-- import morgan

import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/note.js";

const app = express();

// --- Middleware ---
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan("dev")); // <-- add morgan logging

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);


// --- Test Route ---
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});
export default app;
