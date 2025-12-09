// frontend/src/hooks/useAISuggestions.js
import { useStore } from "../store/store";
import { getAISuggestions } from "../api/aiApi";

export default function useAISuggestions() {
  const { user } = useStore();

  const fetchSuggestions = async (noteData) => {
    if (!user) return [];
    const res = await getAISuggestions(noteData);
    return res.suggestions || "";
  };

  return { fetchSuggestions };
}
