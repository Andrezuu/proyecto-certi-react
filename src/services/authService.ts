// src/services/authService.ts
import jsonServerInstance from "../api/jsonInstance";

export const login = async (email: string, password: string) => {
  const response = await jsonServerInstance.get("/users", {
    params: { email, password },
  });
  return response.data[0];
};

const generateToken = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const register = async (
  email: string,
  password: string,
  name: string,
  lastName: string
) => {
  try {
    const token = generateToken(); // sin uuid

    const newUser = {
      email,
      password,
      name,
      lastName,
      token,
      alertThreshold: 0,
    };

    const response = await jsonServerInstance.post(`/users`, newUser);

    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    return null;
  }
};

