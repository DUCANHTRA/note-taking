// backend/controllers/noteController.js
import Note from "../models/Note.js";
import { getAISuggestions } from "../services/geminiService.js";

// Get all notes (with tag filter)
export const getNotes = async (req, res) => {
  try {
    const { tags } = req.query;

    const query = { user: req.user._id };

    if (tags) {
      query.tags = { $in: tags.split(",") };
    }

    const notes = await Note.find(query).sort({ updatedAt: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create note
export const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      user: req.user._id,
    });

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update note
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete note
export const deleteNote = async (req, res) => {
  try {
    await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// AI Suggestions
export const suggestAI = async (req, res) => {
  try {
    const suggestions = await getAISuggestions(req.body);
    res.json({ suggestions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
