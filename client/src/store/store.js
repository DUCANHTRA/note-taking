// In store.js - Add middleware to persist user/token to localStorage
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      logout: () => set({ user: null, notes: [] }),
      notes: [],
      setNotes: (notes) => set({ notes }),
      loading: false,
      setLoading: (val) => set({ loading: val }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialPersist: (state) => ({ user: state.user }), // Only persist user
    }
  )
);