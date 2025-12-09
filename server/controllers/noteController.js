// backend/controllers/noteController.js
import Note from "../models/Note.js";
import { getAISuggestions } from "../services/geminiService.js";
import logger from "../utils/logger.js";
import connectDB from "../config/db.js";

const NOTE_TAG = "[NoteFeature]";
const AI_TAG = "[AIFeature]";

// Get all notes (with tag filter)
export const getNotes = async (req, res) => {
  try {
    await connectDB();
    const { tags } = req.query;
    const userId = req.user._id;

    logger.action(NOTE_TAG, "Fetch notes", userId, { tags });

    const query = { user: userId };

    if (tags) {
      query.tags = { $in: tags.split(",") };
      logger.debug(NOTE_TAG, "Filtering notes by tags", { tags: tags.split(",") });
    }

    const notes = await Note.find(query).sort({ updatedAt: -1 });

    logger.success(NOTE_TAG, "Notes fetched successfully", {
      userId,
      count: notes.length,
      filtered: !!tags,
    });

    res.json(notes);
  } catch (err) {
    logger.error(NOTE_TAG, "Failed to fetch notes", err);
    res.status(500).json({
      message: err.message || "Failed to fetch notes. Please try again.",
    });
  }
};

// Create note
export const createNote = async (req, res) => {
  try {
    await connectDB();
    const userId = req.user._id;
    const { title, content, tags } = req.body;

    logger.action(NOTE_TAG, "Create note", userId, { title, tags });

    // Validation
    if (!title || !content) {
      logger.warn(NOTE_TAG, "Create note failed - Missing required fields", {
        userId,
        hasTitle: !!title,
        hasContent: !!content,
      });
      return res.status(400).json({ message: "Title and content are required" });
    }

    const note = await Note.create({
      ...req.body,
      user: userId,
    });

    logger.success(NOTE_TAG, "Note created successfully", {
      userId,
      noteId: note._id,
      title: note.title,
    });

    res.json(note);
  } catch (err) {
    logger.error(NOTE_TAG, "Failed to create note", err);
    res.status(500).json({
      message: err.message || "Failed to create note. Please try again.",
    });
  }
};

// Update note
export const updateNote = async (req, res) => {
  try {
    await connectDB();
    const userId = req.user._id;
    const noteId = req.params.id;
    const { title, content } = req.body;

    logger.action(NOTE_TAG, "Update note", userId, { noteId, title });

    const note = await Note.findOneAndUpdate(
      { _id: noteId, user: userId },
      req.body,
      { new: true }
    );

    if (!note) {
      logger.warn(NOTE_TAG, "Update failed - Note not found or unauthorized", {
        userId,
        noteId,
      });
      return res.status(404).json({ message: "Note not found" });
    }

    logger.success(NOTE_TAG, "Note updated successfully", {
      userId,
      noteId: note._id,
      title: note.title,
    });

    res.json(note);
  } catch (err) {
    logger.error(NOTE_TAG, "Failed to update note", err);
    res.status(500).json({
      message: err.message || "Failed to update note. Please try again.",
    });
  }
};

// Delete note
export const deleteNote = async (req, res) => {
  try {
    await connectDB();
    const userId = req.user._id;
    const noteId = req.params.id;

    logger.action(NOTE_TAG, "Delete note", userId, { noteId });

    const result = await Note.findOneAndDelete({
      _id: noteId,
      user: userId,
    });

    if (!result) {
      logger.warn(NOTE_TAG, "Delete failed - Note not found or unauthorized", {
        userId,
        noteId,
      });
      return res.status(404).json({ message: "Note not found" });
    }

    logger.success(NOTE_TAG, "Note deleted successfully", {
      userId,
      noteId,
    });

    res.json({ success: true });
  } catch (err) {
    logger.error(NOTE_TAG, "Failed to delete note", err);
    res.status(500).json({
      message: err.message || "Failed to delete note. Please try again.",
    });
  }
};

// AI Suggestions
export const suggestAI = async (req, res) => {
  try {
    await connectDB();
    const userId = req.user._id;
    const { title, content } = req.body;

    logger.action(AI_TAG, "Request AI suggestions", userId, { title });

    if (!title && !content) {
      logger.warn(AI_TAG, "AI suggestion failed - No content provided", { userId });
      return res.status(400).json({ message: "Title or content is required" });
    }

    logger.info(AI_TAG, "Calling Gemini API", { userId });
    const suggestions = await getAISuggestions(req.body);

    logger.success(AI_TAG, "AI suggestions generated successfully", {
      userId,
      suggestionsCount: suggestions?.length || 0,
    });

    res.json({ suggestions });
  } catch (err) {
    logger.error(AI_TAG, "Failed to generate AI suggestions", err);
    res.status(500).json({
      message: err.message || "Failed to generate suggestions. Please try again.",
    });
  }
};

