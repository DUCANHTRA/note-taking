// frontend/src/components/notes/NotesPage.jsx
import React, { useEffect, useState } from "react";
import useNotes from "../../hooks/useNotes";
import NoteCard from "./NoteCard";
import NoteEditor from "./NoteEditor";

export default function NotesPage() {
  const { notes, fetchNotes } = useNotes();
  const [filterTags, setFilterTags] = useState("");

  useEffect(() => {
    fetchNotes(filterTags);
  }, [filterTags]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Notes</h1>

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
