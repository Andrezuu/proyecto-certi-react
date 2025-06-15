// src/pages/LoginPage.tsx
import {
  Box,
  Button,
  CardContent,
  Container,
  InputAdornment,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { AccountCircle, Password } from "@mui/icons-material";
import * as yup from "yup";
import { useFormik } from "formik";
import { login } from "../services/authService";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Toast from "../components/toast";
import { useState } from "react";
import { getItem, setItem } from "../helpers/localStorage";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUserContext } from "../context/UserContext";

const loginSchema = yup.object({
  email: yup.string().email("Email inválido").required("Requerido"),
  password: yup.string().min(6).required("Requerido"),
});

export default function LoginPage() {
  const { setUser } = useUserContext();
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

      setItem("token", response.token);
      setItem("user", response);
      setUser(response); // <- actualiza el contexto

      navigate("/app/dashboard", { replace: true });
    },
  });

  return (
    <Container maxWidth="xs">
      <Toast
        open={loginError}
        message="Usuario o contraseña incorrectos"
        severity="error"
        onClose={() => setLoginError(false)}
      />
      <Box sx={{ marginTop: 8 }}>
        <CardContent sx={{ padding: 4, textAlign: "center", boxShadow: 3 }}>
          <Box sx={{ mb: 2 }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ width: "80%", height: "auto" }}
            />
          </Box>
          <Typography variant="h5" gutterBottom>
            Iniciar Sesión
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Ingresar
            </Button>
          </form>
          <Link
            component={RouterLink}
            to="/register"
            sx={{ mt: 2, display: "block" }}
          >
            ¿No tienes cuenta? Regístrate
          </Link>
        </CardContent>
      </Box>
    </Container>
  );
}
