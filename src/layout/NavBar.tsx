import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface NavBarProps {
  onDrawerOpen: () => void;
  drawerOpen: boolean;
}

export default function NavBar({ onDrawerOpen, drawerOpen }: NavBarProps) {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {!drawerOpen && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerOpen}
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap>
          Casa de Cambios Bolivia
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
