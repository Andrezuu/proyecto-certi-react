import {
  Box,
  Button,
  CardContent,
  Container,
  InputAdornment,
  TextField,
  Typography,
  Link,
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  AccountCircle,
  Password,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { Link as RouterLink } from "react-router-dom";
import Toast from "../components/toast";
import { useRegister } from "../hooks/useAuth";

export default function RegisterPage() {
  const {
    formik,
    registerError,
    setRegisterError,
    showPassword,
    setShowPassword,
  } = useRegister();

  return (
    <Container maxWidth="xs">
      <Toast
        open={registerError}
        message="Error al registrar usuario"
        severity="error"
        onClose={() => setRegisterError(false)}
      />
      <Box sx={{}}>
        <CardContent sx={{ padding: 4, textAlign: "center", boxShadow: 3 }}>
          <Box sx={{ mb: 2 }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ width: "80%", height: "auto" }}
            />
          </Box>
          <Typography variant="h5" gutterBottom>
            Registro de Usuario
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Nombre"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              variant="standard"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Apellido"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              variant="standard"
            />
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
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Repetir Contraseña"
              type={showPassword ? "text" : "password"}
              name="repeatPassword"
              value={formik.values.repeatPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.repeatPassword &&
                Boolean(formik.errors.repeatPassword)
              }
              helperText={
                formik.touched.repeatPassword && formik.errors.repeatPassword
              }
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.isAdmin}
                  onChange={(e) =>
                    formik.setFieldValue("isAdmin", e.target.checked)
                  }
                  name="isAdmin"
                />
              }
              label="Registrarme como administrador"
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Registrarme
            </Button>
          </form>
          <Link component={RouterLink} to="/" sx={{ mt: 2, display: "block" }}>
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </CardContent>
      </Box>
    </Container>
  );
}
