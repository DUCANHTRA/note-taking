// frontend/src/hooks/useNotes.js
import { useStore } from "../store/store";
import * as noteApi from "../api/noteApi";

export default function useNotes() {
  const { notes, setNotes, user } = useStore();

  const fetchNotes = async (tags = "") => {
    if (!user) return;
    const data = await noteApi.getNotes(user.token, tags);
    setNotes(data);
  };

  const createNote = async (note) => {
    if (!user) return;
    const data = await noteApi.createNote(user.token, note);
    setNotes([data, ...notes]);
    return data;
  };

  const updateNote = async (id, note) => {
    if (!user) return;
    const updated = await noteApi.updateNote(user.token, id, note);
    setNotes(notes.map((n) => (n._id === id ? updated : n)));
    return updated;
  };

  const deleteNote = async (id) => {
    if (!user) return;
    await noteApi.deleteNote(user.token, id);
    setNotes(notes.filter((n) => n._id !== id));
  };

  return { notes, fetchNotes, createNote, updateNote, deleteNote };
}
