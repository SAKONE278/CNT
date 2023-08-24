import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import {
  Button,
  Divider,
  Drawer,
  Paper,
  Tabs,
  Typography,
  List,
  Tab,
  CircularProgress,
} from '@mui/material';
import { Star, Forum, Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import SearchBar from './SearchBar';
import NavItem from './NavItem';
import config from '../config';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: 360,
    background: theme.palette.background.paper,
    maxHeight: 'calc(100vh - 63px)',
  },
  container: {
    overflowY: 'hidden',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  listContainer: {
    flex: 1,
    overflowY: 'auto',
  },
  loadingContainer: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
}));

function RecentConversations() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { rooms, loading } = useSelector((state) => state.rooms);
  const user = useSelector((state) => state.auth.user);

  if (loading) {
    return (
      <Box p={4} className={classes.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={2} className={classes.listContainer}>
      <Typography color="textPrimary" variant="h5">
        {t('Récentes Conversations')}
      </Typography>
      <List>
        {rooms.map((room) => {
          const other = room.members.find((e) => e._id !== user.id) || {};

          let picture;

          if (room.isGroup) {
            if (room.picture) {
              picture = room.picture.littleThumbnailUrl;
            }
          } else if (other.picture) {
            picture = other.picture.littleThumbnailUrl;
          }

          const item = {
            id: room._id,
            firstName: other.firstName,
            lastName: other.lastName,
            otherId: other._id,
            isGroup: room.isGroup,
            title: room.title,
            message: room.lastMessage,
            lastUpdate: room.lastUpdate,
            picture,
          };

          return <NavItem item={item} key={item.id} />;
        })}
      </List>
      {rooms.length === 0 && (
        <Typography className={classes.name} color="textPrimary" variant="body2">
          {t('There are no rooms yet. Tap the + icon to add one!')}
        </Typography>
      )}
    </Box>
  );
}

function SearchResults() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { rooms, search, loading } = useSelector((state) => state.rooms);
  const user = useSelector((state) => state.auth.user);

  const items = rooms.filter((room) => {
    if (room.isGroup) {
      return room.title.toLowerCase().includes(search);
    }
    const other = room.members.find((e) => e._id !== user.id) || {};
    return `${other.firstName} ${other.lastName}`.toLowerCase().includes(search);
  });

  if (loading) {
    return (
      <Box p={4} className={classes.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={2} className={classes.listContainer}>
      <Typography color="textPrimary" variant="h5">
        {t('Résultats de Recherche')}
      </Typography>
      <List>
        {items.map((room) => {
          const other = room.members.find((e) => e._id !== user.id) || {};

          let picture;

          if (room.isGroup) {
            if (room.picture) {
              picture = room.picture.littleThumbnailUrl;
            }
          } else if (other.picture) {
            picture = other.picture.littleThumbnailUrl;
          }

          const item = {
            id: room._id,
            firstName: other.firstName,
            lastName: other.lastName,
            otherId: other._id,
            isGroup: room.isGroup,
            title: room.title,
            message: room.lastMessage,
            lastUpdate: room.lastUpdate,
            picture,
          };

          return <NavItem item={item} key={item.id} />;
        })}
      </List>
      {items.length === 0 && (
        <Typography className={classes.name} color="textPrimary" variant="body2">
          {t('No rooms available for the selected filters.')}
        </Typography>
      )}
    </Box>
  );
}

function Favorites() {
  const classes = useStyles();
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const { list, search, loading } = useSelector((state) => state.favorites);

  const items = list.filter((room) => {
    if (room.isGroup) {
      return room.title.toLowerCase().includes(search);
    }
    const other = room.members.find((e) => e._id !== user.id) || {};
    return `${other.firstName} ${other.lastName}`.toLowerCase().includes(search);
  });

  if (loading) {
    return (
      <Box p={4} className={classes.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={2} className={classes.listContainer}>
      <Typography color="textPrimary" variant="h5">
        {t('Favoris')}
      </Typography>
      <List>
        {items.map((room) => {
          const other = room.members.find((e) => e._id !== user.id) || {};

          let picture;

          if (room.isGroup) {
            if (room.picture) {
              picture = room.picture.littleThumbnailUrl;
            }
          } else if (other.picture) {
            picture = other.picture.littleThumbnailUrl;
          }

          const item = {
            id: room._id,
            firstName: other.firstName,
            lastName: other.lastName,
            otherId: other._id,
            isGroup: room.isGroup,
            title: room.title,
            message: room.lastMessage,
            lastUpdate: room.lastUpdate,
            picture,
          };

          return <NavItem item={item} key={item.id} />;
        })}
      </List>
      {list.length === 0 && (
        <Typography className={classes.name} color="textPrimary" variant="body2">
          {t('Pas de vaforis, cochez sur l\'étoile pour ajouter un favori')}
        </Typography>
      )}
      {items.length === 0 && list.length > 0 && (
        <Typography className={classes.name} color="textPrimary" variant="body2">
          {t('Pas de favaris')}
        </Typography>
      )}
    </Box>
  );
}

function Sidebar({ onMobileClose, openMobile, drawerOnly }) {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column" className={classes.container}>
      <Paper
        square
        sx={{
          background: '#1f1f1f',
        }}
      >
        <Tabs
          value={tab}
          onChange={(e, value) => {
            if (value === 0) {
              dispatch({
                type: 'search',
                search: '',
              });
            }
            setTab(value);
          }}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<Forum />} />
          <Tab icon={<Search />} />
          <Tab icon={<Star />} />
        </Tabs>
      </Paper>
      <SearchBar setTab={setTab} tab={tab} />
      {tab === 0 && <RecentConversations />}
      {tab === 1 && <SearchResults />}
      {tab === 2 && <Favorites />}
      <Divider />
      {config.demo && (
        <Box
          px={2}
          py={4}
          style={{
            backgroundColor: '#121212',
          }}
        >
          <Typography align="center" gutterBottom variant="h4" color="textPrimary">
            {t('Like what you see?')}
          </Typography>
          <Typography align="center" variant="body2" color="textPrimary">
            {t('Clover is available for sale on CodeCanyon, full source code included.')}
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              color="primary"
              component="a"
              href="https://codecanyon.net/item/clover-realtime-messaging-audio-video-conferencing-web-app-nodejs-react-webrtc-socketio/25737452"
              target="_blank"
              variant="contained"
            >
              {t('Purchase')}
            </Button>
          </Box>
        </Box>
      )}
      <Divider />
      <Box py={1} px={2} style={{ textAlign: 'center' }}>
        <Typography align="center" variant="caption" color="textPrimary">
          STRATEGIS - &copy;
          {' '}
          {moment().format('YYYY')}
          {' '}
          - v
          {config.version}
          &nbsp;(
          {config.build}
          )
        </Typography>
      </Box>
    </Box>
  );

  if (drawerOnly) {
    return (
      <Drawer anchor="left" onClose={onMobileClose} open={openMobile} variant="temporary" sx={{ maxWidth: 360 }}>
        {content}
      </Drawer>
    );
  }

  return (
    <>
      <Drawer
        anchor="left"
        onClose={onMobileClose}
        open={openMobile}
        variant="temporary"
        sx={{ display: { xs: 'flex', md: 'none' }, maxWidth: 360 }}
      >
        {content}
      </Drawer>
      <Box
        className={classes.sidebar}
        sx={{
          flexGrow: 1,
          display: { xs: 'none', md: 'flex' },
          maxWidth: { md: 280, lg: 360 },
          minWidth: { md: 280, lg: 360 },
        }}
      >
        {content}
      </Box>
    </>
  );
}
export default Sidebar;
