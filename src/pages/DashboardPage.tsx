// src/pages/DashboardPage.tsx
import { Box, Typography, Button } from "@mui/material";
import { clearStorage } from "../helpers/localStorage";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  const logout = () => {
    clearStorage();
    navigate("/", { replace: true });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido al Dashboard
      </Typography>
      <Button variant="contained" onClick={logout}>
        Cerrar sesión
      </Button>
    </Box>
  );
}
