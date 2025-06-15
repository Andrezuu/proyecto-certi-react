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
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = getItem("user");
    if (storedUser) {
      setUserState(storedUser);
    }
  }, []);

  const setUser = (user: User | null) => {
    if (user) {
      setItem("user", user);
    } else {
      removeItem("user");
    }
    setUserState(user);
  };

  const logout = () => {
    removeItem("user");
    removeItem("token");
    setUserState(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext debe usarse dentro de UserProvider");
  return context;
};
