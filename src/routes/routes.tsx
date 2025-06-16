// src/routes/routes.tsx
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MapaPage from "../pages/MapaPage";
import CotizacionesPage from "../pages/CotizacionesPage";
import HistorialPage from "../pages/HistorialPage";
import Layout from "../layout/Layout";
import CasasAdminPage from "../pages/CasasAdminPage";
import ProfilePage from "../pages/ProfilePage";
import UnauthorizedPage from "../pages/UnauthorizedPage"; // Asegúrate de tener esta página

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/app"
        element={
          <Layout /> // Renderizamos Layout directamente, sin ProtectedRoutes anidado
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="mapa" element={<MapaPage />} />
        <Route path="cotizaciones" element={<CotizacionesPage />} />
        <Route path="historial" element={<HistorialPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="admin/casas" element={<CasasAdminPage />} /> {/* Sin ProtectedRoutes */}
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Routes>
  );
};