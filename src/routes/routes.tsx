import { BrowserRouter, Route, Routes } from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoutes from "../guards/ProtectedRoutes";
import MapaPage from "../pages/MapaPage";
import CotizacionesPage from "../pages/CotizacionesPage";
import AlertaPage from "../pages/AlertaPage";
import HistorialPage from "../pages/HistorialPage";
import CasasAdminPage from "../pages/CasasAdminPage";
import Layout from "../layout/Layout";


export const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/app"
          element={
            <ProtectedRoutes>
              <Layout/>
            </ProtectedRoutes>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="mapa" element={<MapaPage />} />
          <Route path="cotizaciones" element={<CotizacionesPage />} />
          <Route path="alerta" element={<AlertaPage />} />
          <Route path="historial" element={<HistorialPage />} />
          <Route path="admin/casas" element={<CasasAdminPage />} />
        </Route>
       <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          </Route>
      </Routes>
  );
};