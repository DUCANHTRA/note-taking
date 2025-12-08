// frontend/src/App.jsx
import React from "react";
import useAuth from "./hooks/useAuth";
import Login from "./components/auth/Login";
import NotesPage from "./components/notes/NotesPage";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {!user ? <Login /> : <NotesPage />}
    </div>
  );
}
