// frontend/src/App.jsx
import React, { useState } from "react";
import useAuth from "./hooks/useAuth";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotesPage from "./components/notes/NotesPage";

export default function App() {
  const { user } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {!user ? (
        showRegister ? (
          <Register onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
          <Login onSwitchToRegister={() => setShowRegister(true)} />
        )
      ) : (
        <NotesPage />
      )}
    </div>
  );
}
