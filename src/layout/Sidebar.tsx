import {
  Box,
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
    </Drawer>
  );
}
