// src/hooks/useAuth.ts
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/authService";
import { useUserStore } from "../store/userStore";

const loginSchema = yup.object({
  email: yup.string().email("Email inválido").required("Requerido"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
});

const registerSchema = yup.object({
  name: yup.string().required("Requerido"),
  lastName: yup.string().required("Requerido"),
  email: yup.string().email("Email inválido").required("Requerido"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Requerido"),
});

export const useAuth = () => {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const response = await login(values.email, values.password);
      if (!response) {
        setLoginError(true);
        formik.resetForm();
        return;
      }

      if (!response.id || !response.token || !response.email) {
        console.error("Respuesta de login inválida:", response);
        setLoginError(true);
        return;
      }

      setUser(response);
      navigate("/app/dashboard", { replace: true });
    },
  });

  return {
    formik,
    loginError,
    setLoginError,
    showPassword,
    setShowPassword,
  };
};

export const useRegister = () => {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
      isAdmin: false,
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const role = values.isAdmin ? "admin" : "client";
      const response = await register(
        values.email,
        values.password,
        values.name,
        values.lastName,
        role
      );

      if (!response) {
        setRegisterError(true);
        return;
      }

      const loginResponse = await login(values.email, values.password);
      if (loginResponse) {
        setUser(loginResponse);
        navigate("/app/dashboard", { replace: true });
      } else {
        setRegisterError(true);
      }
    },
  });

  return {
    formik,
    registerError,
    setRegisterError,
    showPassword,
    setShowPassword,
  };
};
