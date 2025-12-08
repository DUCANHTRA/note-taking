// backend/routes/note.js
import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  suggestAI,
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotes);
router.post("/", protect, createNote);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

// AI
router.post("/suggest", protect, suggestAI);

export default router;
