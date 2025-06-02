// src/pages/DashboardPage.tsx
import { Box, Typography } from "@mui/material";
/*import { clearStorage } from "../helpers/localStorage";*/
/*import { useNavigate } from "react-router-dom";*/
import Graphs from "../components/Graphs";

export default function DashboardPage() {
 /* const navigate = useNavigate();*/

 /* const logout = () => {
    clearStorage();
    navigate("/", { replace: true });
  };*/

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido al Dashboard
      </Typography>
      <Graphs/>
    </Box>
  );
}
