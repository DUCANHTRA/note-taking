// frontend/src/store/store.js
import { create } from "zustand";

export const useStore = create((set) => ({
  // Auth
  user: null,
  setUser: (userData) => set({ user: userData }),
  logout: () => set({ user: null, notes: [] }),

  // Notes
  notes: [],
  setNotes: (notes) => set({ notes }),

  // Optional: UI state (modals, loading)
  loading: false,
  setLoading: (val) => set({ loading: val }),
}));
