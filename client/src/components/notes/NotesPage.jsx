// frontend/src/components/notes/NotesPage.jsx
import React, { useEffect, useState } from "react";
import useNotes from "../../hooks/useNotes";
import useAuth from "../../hooks/useAuth";
import NoteCard from "./NoteCard";
import NoteEditor from "./NoteEditor";

export default function NotesPage() {
  const { notes, fetchNotes } = useNotes();
  const { user, logout } = useAuth();
  const [filterTags, setFilterTags] = useState("");

  useEffect(() => {
    fetchNotes(filterTags);
  }, [filterTags]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <div className="p-6">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {user?.email}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by tags (comma separated)"
          value={filterTags}
          onChange={(e) => setFilterTags(e.target.value)}
          className="p-2 border rounded w-full max-w-sm"
        />
      </div>

      <NoteEditor fetchNotes={fetchNotes} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} fetchNotes={fetchNotes} />
        ))}
      </div>
    </div>
  );
}
