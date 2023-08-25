import { ReactComponent as ReactLogo } from '../../logo.svg';
import React, { useContext } from 'react';
import { RoutePath } from '../../routes';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';


export default function AppRoot(props: any) {
  const { logout, isLoggedIn, muid, userName } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    setAnchorEl(null);
    logout();
  };

  const [openList, setOpenList] = React.useState(false);

  const handleClickList = () => {
    setOpenList(!openList);
  };

  return (
    // <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <React.Fragment>
      <div>
        <RoutePath />
      </div>
    </React.Fragment>
    // </MuiPickersUtilsProvider>
  );
}