// frontend/src/components/notes/NoteCard.jsx
import React, { useState } from "react";
import useNotes from "../../hooks/useNotes";
import AISuggestions from "./AISuggestions";

export default function NoteCard({ note, fetchNotes }) {
  const { deleteNote } = useNotes();
  const [showAI, setShowAI] = useState(false);

  const handleDelete = () => {
    deleteNote(note._id);
  };

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition relative">
      <h2 className="font-bold text-lg">{note.title}</h2>
      <p className="text-gray-700 mt-2">{note.content}</p>
      <div className="flex flex-wrap mt-2">
        {note.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-1"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setShowAI(!showAI)}
          className="text-sm text-purple-600 hover:underline"
        >
          AI Suggestions
        </button>
        <button
          onClick={handleDelete}
          className="text-sm text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
      {showAI && <AISuggestions note={note} />}
    </div>
  );
}
