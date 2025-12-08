// frontend/src/components/notes/NoteEditor.jsx
import React, { useState } from "react";
import useNotes from "../../hooks/useNotes";

export default function NoteEditor({ fetchNotes }) {
  const { createNote } = useNotes();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNote({
      title,
      content,
      tags: tags.split(",").map((t) => t.trim()),
    });
    setTitle("");
    setContent("");
    setTags("");
    fetchNotes();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="font-bold mb-2">Add a New Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        rows={3}
        required
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Add Note
      </button>
    </form>
  );
}
