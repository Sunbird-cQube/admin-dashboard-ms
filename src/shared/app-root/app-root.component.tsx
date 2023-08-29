import { ReactComponent as ReactLogo } from '../../logo.svg';
import React, { useContext } from 'react';
import { RoutePath } from '../../routes';
import { AppBar, Toolbar, Typography, Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppRootContainer } from './app-root.container';
import { AppHeaderContainer } from '../app-header/app-header.container';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Debugger', 'Schema Generator'];


export default function AppRoot(props: any) {
  const { logout, isLoggedIn, muid, userName, window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {isLoggedIn && (
          <AppHeaderContainer />
        )}
        <Box component="main" sx={{width: '100%'}}>
          <div style={{marginTop: isLoggedIn ? '64px' : '0', padding: '3rem 2rem'}}>
            <RoutePath />
          </div>
        </Box>
      </Box>
    </React.Fragment>
  );
}