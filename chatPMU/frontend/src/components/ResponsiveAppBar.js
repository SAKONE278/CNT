import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AddBox } from '@mui/icons-material';
import EmojiPeople from '@mui/icons-material/EmojiPeople';
import GroupAdd from '@mui/icons-material/GroupAdd';
import { useNavigate } from 'react-router-dom';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import logout from '../actions/auth/logout';
import Logo from './Logo';
import MainDialog from './MainDialog';

const authPages = [
  {
    name: 'SE CONNECTER',
    location: '/auth/login',
  },
  {
    name: 'S INSCRIRE',
    location: '/auth/sign-up',
  },
];

function CurrentUser({ handleOpenUserMenu }) {
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();

  if (!user || !user.firstName) {
    return <Typography variant="caption">{t('appBarGuestUser')}</Typography>;
  }

  return (
    <Tooltip title="Open settings">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.picture && user.picture.littleThumbnailUrl}>
          {user.firstName.charAt(0)}
        </Avatar>
      </IconButton>
    </Tooltip>
  );
}

function MeetingDrawerButton({ setDrawerOpen, drawerOpen }) {
  const user = useSelector((state) => state.auth.user);

  if (!user || !user.firstName) {
    return null;
  }

  return (
    <Box mr={2}>
      <IconButton size="large" aria-controls="menu-appbar" onClick={() => setDrawerOpen(!drawerOpen)} color="inherit">
        <MenuIcon />
      </IconButton>
    </Box>
  );
}

function ResponsiveAppBar({
  isDrawer, drawerOpen, setDrawerOpen, type,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const user = useSelector((state) => state.auth.user || {});
  const mainDialogType = useSelector((state) => state.form.type);
  const open = useSelector((state) => !!state.form.open);

  const setType = (value) => dispatch({ type: 'form-type', value });
  const setOpen = (value) => dispatch({ type: 'form-open', value });

  const defaultPages = [
    {
      name: 'Accueil',
      location: '/',
    },
    {
      name: 'Recherche',
      icon: true,
      value: <EmojiPeople />,
      onClick: () => {
        setType('people');
        setOpen(true);
      },
    },
    {
      name: 'Groupe',
      icon: true,
      value: <GroupAdd />,
      onClick: () => {
        setType('group');
        setOpen(true);
      },
    },
    {
      name: 'Plus',
      icon: true,
      value: <AddBox />,
      onClick: () => {
        setOpen(true);
      },
    },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {
      name: 'Administration',
      location: '/admin',
      isAdmin: true,
    },
    {
      name: 'Mon Compte',
      location: '/account',
    },
    {
      name: 'Déconnexion',
      onClick: () => {
        setLogoutOpen(true);
      },
    },
  ];

  let pages;

  switch (type) {
    case 'meeting':
      pages = [];
      break;
    case 'auth':
      pages = authPages;
      break;
    default:
      pages = defaultPages;
      break;
  }

  return (
    <AppBar elevation={0} position="static" color="success" enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {type === 'meeting' && <MeetingDrawerButton setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />}
          <Box mr={2} sx={{ width: 200, display: { xs: type === 'meeting' ? 'flex' : 'none', md: 'flex' } }}>
            <Box sx={{ display: type === 'auth' ? 'none' : 'flex', cursor: 'pointer' }} onClick={() => navigate('/')}>
              <Logo />
            </Box>
          </Box>

          <Box sx={{ width: 70, display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
            {isDrawer && (
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                onClick={() => setDrawerOpen(!drawerOpen)}
                color="inherit"
                sx={{ display: { xs: 'inline-flex', md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            {pages.map((page) => {
              if (page.icon) {
                return (
                  <IconButton
                    key={page.name}
                    color="inherit"
                    onClick={() => (page.onClick ? page.onClick() : navigate(page.location))}
                  >
                    {page.value}
                  </IconButton>
                );
              }
              return (
                <Button
                  key={page.name}
                  sx={{ color: 'white', display: 'block' }}
                  onClick={() => navigate(page.location)}
                >
                  {page.name}
                </Button>
              );
            })}
          </Box>

          <Box
            sx={{ width: { xs: type === 'meeting' ? 100 : 50, md: 200 }, display: 'flex', justifyContent: 'flex-end' }}
          >
            {type !== 'auth' && <CurrentUser handleOpenUserMenu={handleOpenUserMenu} />}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings
                .filter((e) => ((user.roles || []).includes('admin') ? e : !e.isAdmin))
                .map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => {
                      if (setting.onClick) {
                        setting.onClick();
                      } else {
                        navigate(setting.location);
                      }
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography variant="body2" textAlign="center" style={{ color: 'white' }}>
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
        </Toolbar>
        <MainDialog open={open} setOpen={setOpen} type={mainDialogType} setType={setType} />
        <Dialog
          open={logoutOpen}
          onClose={() => setLogoutOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{t('Confirmation')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t('Etes vous sur de vouloir quitter ?')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLogoutOpen(false)} color="primary">
              {t('Annuler')}
            </Button>
            <Button onClick={() => dispatch(logout({ navigate }))} color="primary">
              {t('Déconnexion')}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
