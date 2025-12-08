// frontend/src/components/notes/AISuggestions.jsx
import React, { useEffect, useState } from "react";
import useAISuggestions from "../../hooks/useAISuggestions";

export default function AISuggestions({ note }) {
  const { fetchSuggestions } = useAISuggestions();
  const [suggestions, setSuggestions] = useState("Loading...");

  useEffect(() => {
    const getSuggestions = async () => {
      const result = await fetchSuggestions({
        title: note.title,
        content: note.content,
        tags: note.tags,
      });
      setSuggestions(result);
    };
    getSuggestions();
  }, [note]);

  return (
    <div className="mt-2 p-2 bg-purple-50 border-l-4 border-purple-600 rounded text-sm">
      <pre>{suggestions}</pre>
    </div>
  );
}
