import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Map as MapIcon,
  BarChart as ChartIcon,
  Notifications as AlertIcon,
  History as HistoryIcon,
  AdminPanelSettings as AdminIcon,
  Home as DashboardIcon,
  ChevronLeft,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { clearStorage } from "../helpers/localStorage";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", path: "/app/dashboard", icon: <DashboardIcon /> },
  { text: "Mapa", path: "/app/mapa", icon: <MapIcon /> },
  { text: "Cotizaciones", path: "/app/cotizaciones", icon: <ChartIcon /> },
  { text: "Alerta", path: "/app/alerta", icon: <AlertIcon /> },
  { text: "Historial", path: "/app/historial", icon: <HistoryIcon /> },
  { text: "Casas Admin", path: "/app/admin/casas", icon: <AdminIcon /> },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={onClose}>
          <ChevronLeft />
        </IconButton>
      </Box>
      <Divider />
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

      {/* Empuja el botón hacia abajo */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Botón de Cerrar Sesión */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={() => {
            clearStorage(); // limpia el storage
            navigate("/login");
          }}
        >
          Cerrar sesión
        </Button>
      </Box>
    </Drawer>
  );
}
