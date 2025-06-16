// src/pages/ProfilePage.tsx
import { useUserStore } from "../store/userStore";
import { Card, CardContent, Typography, Box } from "@mui/material";
import AlertSettings from "../components/AlertComponent";
import { updateUser } from "../services/authService"; // Importa el nuevo servicio

const ProfilePage = () => {
  const { user, updateUser: updateStoreUser } = useUserStore();

  if (!user) return <Typography variant="h6">Debes iniciar sesión para ver tu perfil.</Typography>;

  const handleUpdate = async (updates: { alertThreshold: number; alertEnabled: boolean; currencyPreference: string }) => {
    try {
      if (user.id) {
        await updateUser(user.id, updates); // Actualiza en el backend
        updateStoreUser(updates); // Actualiza el store local
      }
    } catch (error) {
      console.error("Error updating user in backend:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "0 auto", marginTop: 4, padding: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Perfil de Usuario
        </Typography>
        <Typography variant="subtitle1">
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Nombre:</strong> {user.name}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Apellido:</strong> {user.lastName}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Rol:</strong> {user.role}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Moneda Preferida:</strong> {user.currencyPreference || "No definida"}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Umbral de Alerta:</strong> {user.alertThreshold}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Alertas Habilitadas:</strong> {user.alertEnabled ? "Sí" : "No"}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <AlertSettings onUpdate={handleUpdate} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;