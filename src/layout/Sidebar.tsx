// src/components/Sidebar.tsx
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  IconButton,
  Toolbar,
} from "@mui/material";
import {
  Home as HomeIcon,
  Map as MapIcon,
  BarChart as ChartIcon,
  History as HistoryIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  Person as PersonIcon,
  CompareArrows as CompareArrowsIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { clearStorage } from "../helpers/localStorage";
import { useEffect } from "react";
import { useUserStore } from "../store/userStore";

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  isMobile: boolean;
}

export default function Sidebar({
  mobileOpen,
  handleDrawerToggle,
  isMobile,
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = useUserStore((state) => state.isAdmin);

  const menuItems = [
    { text: "Dashboard", path: "/app/dashboard", icon: <HomeIcon /> },
    { text: "Mapa", path: "/app/mapa", icon: <MapIcon /> },
    { text: "Cotizaciones", path: "/app/cotizaciones", icon: <ChartIcon /> },
    { text: "Historial", path: "/app/historial", icon: <HistoryIcon /> },
    ...(isAdmin() ? [{ text: "Casas Admin", path: "/app/admin/casas", icon: <AdminIcon /> }] : []),
    { text: "Perfil", path: "/app/profile", icon: <PersonIcon /> }, // Nuevo item Perfil
    { text: "Transacciones", path: "/app/transacciones", icon: <CompareArrowsIcon /> },
    { text: "Transacciones Dashboard", path: "/app/transacciones-dashboard", icon: <ChartIcon/> },
  ];

  useEffect(() => {
    if (isMobile && mobileOpen) {
      handleDrawerToggle();
    }
  }, [location.pathname, isMobile, mobileOpen, handleDrawerToggle]);

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {!isMobile && <Toolbar />}
      {isMobile && (
        <Box display="flex" justifyContent="flex-end" p={1}>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      )}

      <List>
        {menuItems.map(({ text, path, icon }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              selected={location.pathname === path}
              onClick={() => navigate(path)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={() => {
            clearStorage();
            navigate("/login");
          }}
        >
          Cerrar sesión
        </Button>
      </Box>
    </Drawer>
  );
}