// backend/models/Note.js
import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    favorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Note", NoteSchema);
