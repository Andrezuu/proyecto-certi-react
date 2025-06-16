// src/guards/ProtectedRoutes.tsx
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

interface ProtectedRoutesProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoutes = ({ children, allowedRoles }: ProtectedRoutesProps) => {
  const { user, isAdmin, hasRole } = useUserContext();
  const token = localStorage.getItem("token");
  const isAuthenticated = token !== null;

  console.log("ProtectedRoutes - user:", user, "token:", token, "allowedRoles:", allowedRoles); // Depuración

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && user) {
    const hasAccess = allowedRoles.some(
      (role) => hasRole(role) || (role === "admin" && isAdmin())
    );
    if (!hasAccess) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoutes;