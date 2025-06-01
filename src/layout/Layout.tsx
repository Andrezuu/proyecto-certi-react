import { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar onDrawerOpen={handleDrawerOpen} drawerOpen={open} />
      <Sidebar open={open} onClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ height: '64px' }} /> 
        <Outlet />
      </Box>
    </Box>
  );
}
