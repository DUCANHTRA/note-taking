// frontend/src/hooks/useAuth.js
import { useStore } from "../store/store";
import { registerUser, loginUser } from "../api/authApi";

export default function useAuth() {
  const { user, setUser, logout } = useStore();

  const register = async (data) => {
    const res = await registerUser(data);
    setUser(res);
    return res;
  };

  const login = async (data) => {
    const res = await loginUser(data);
    setUser(res);
    return res;
  };

  return { user, register, login, logout };
}
