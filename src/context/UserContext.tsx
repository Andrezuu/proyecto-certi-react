// src/context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getItem, setItem, removeItem } from "../helpers/localStorage";

export interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  token: string;
  alertThreshold: number;
  alertEnabled: boolean;
  role: "admin" | "cliente" | string;
  currencyPreference?: string;
  expiresAt?: number; // Opcional para expiración
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAdmin: () => boolean;
  hasRole: (role: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = getItem("user");
    const storedToken = getItem("token");
    console.log("Restoring session - user:", storedUser, "token:", storedToken); // Depuración
    if (
      storedUser &&
      storedToken &&
      typeof storedUser === "object" &&
      "id" in storedUser &&
      "email" in storedUser &&
      "token" in storedUser
    ) {
      if (storedUser.expiresAt && storedUser.expiresAt < Date.now()) {
        logout(); // Forzar logout si expiró
      } else {
        setUserState({ ...storedUser, token: storedToken }); // Restaurar sesión
      }
    }
  }, []);

  const setUser = (user: User | null) => {
    if (user) {
      if (!user.id || !user.email || !user.token) {
        console.warn("Datos de usuario incompletos, no se guardará.");
        return;
      }
      setItem("user", user);
      setItem("token", user.token);
    } else {
      removeItem("user");
      removeItem("token");
    }
    setUserState(user);
  };

  const logout = () => {
    removeItem("user");
    removeItem("token");
    setUserState(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setItem("user", updatedUser);
      setUserState(updatedUser);
    }
  };

  const isAdmin = () => user?.role === "admin" || false;
  const hasRole = (role: string) => user?.role === role || false;

  return (
    <UserContext.Provider value={{ user, setUser, logout, updateUser, isAdmin, hasRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext debe usarse dentro de UserProvider");
  return context;
};