import { createContext, useContext, useEffect, useState } from "react";
import { storage, KEYS } from "../utils/storage";

// Admin-only authentication context (no student/teacher roles)
const AuthContext = createContext(null);

// Seed a default admin so login works out of the box
const DEFAULT_ADMIN = {
  name: "Admin User",
  email: "",
  password: "",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => storage.get(KEYS.AUTH, null));
  const [loading, setLoading] = useState(false);

  // Ensure at least the default admin exists
  useEffect(() => {
    const users = storage.get(KEYS.USERS, []);
    if (!users.length) storage.set(KEYS.USERS, [DEFAULT_ADMIN]);
  }, []);

  const login = ({ email, password }) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      // Simulate small network delay
      setTimeout(() => {
        const users = storage.get(KEYS.USERS, []);
        const found = users.find(
          (u) =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        );
        setLoading(false);
        if (found) {
          const session = { name: found.name, email: found.email };
          setUser(session);
          storage.set(KEYS.AUTH, session);
          resolve(session);
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 600);
    });

  const register = ({ name, email, password }) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        const users = storage.get(KEYS.USERS, []);
        if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
          setLoading(false);
          return reject(new Error("An account with this email already exists"));
        }
        const newUser = { name, email, password };
        const next = [...users, newUser];
        storage.set(KEYS.USERS, next);
        const session = { name, email };
        setUser(session);
        storage.set(KEYS.AUTH, session);
        setLoading(false);
        resolve(session);
      }, 600);
    });

  const logout = () => {
    setUser(null);
    storage.remove(KEYS.AUTH);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
