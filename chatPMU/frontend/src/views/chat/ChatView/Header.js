import { useEffect, useState } from 'react';
import {
  Avatar, Grid, Box, Typography, IconButton, Badge, Popover, CircularProgress,
} from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import Call from '@mui/icons-material/Call';
import VideoCall from '@mui/icons-material/VideoCall';
import Info from '@mui/icons-material/Info';
import Star from '@mui/icons-material/Star';
import StarOutline from '@mui/icons-material/StarOutline';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import getLastOnline from '../../../actions/users/getLastOnline';
import toggleFavorite from '../../../actions/favorites/toggleFavorite';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.background.paper,
    height: 78,
    minHeight: 78,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    borderBottom: theme.dark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
  },
  user: {
    paddingLeft: 16,
  },
  popover: {
    padding: theme.spacing(2),
    background: theme.palette.background.deep,
  },
}));

const Status = ({
  user, lastOnline, online, busy, away, room,
}) => {
  if (room.isGroup) {
    return `${room.members.length} membres`;
  }

  const lastOnlineDate = (lastOnline.find((e) => e && user && e._id === user._id) || {}).lastOnline;

  if (online.includes(user._id)) {
    return 'En ligne';
  }

  if (busy.includes(user._id)) {
    return 'Ocuppé';
  }

  if (away.includes(user._id)) {
    return 'Loin';
  }

  return `En ligne: ${lastOnlineDate ? moment(lastOnlineDate).fromNow() : 'jamais'}`;
};

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}))(Badge);

function Favorite({ roomId }) {
  const { list, loading } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <IconButton color="inherit" onClick={() => {}}>
        <CircularProgress size={20} />
      </IconButton>
    );
  }

  return (
    <IconButton
      color="inherit"
      onClick={() => {
        dispatch(toggleFavorite({ roomId }));
      }}
    >
      {list.find((e) => e._id === roomId) ? <Star /> : <StarOutline />}
    </IconButton>
  );
}

function Header({ other, room }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { online, busy, away } = useSelector((state) => state.users);
  const lastOnline = useSelector((state) => state.users.lastOnline || []);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const title = room.isGroup ? room.title : `${other.firstName} ${other.lastName}`;

  let picture;

  if (room.isGroup) {
    if (room.picture) {
      picture = room.picture.littleThumbnailUrl;
    }
  } else if (other.picture) {
    picture = other.picture.littleThumbnailUrl;
  }

  useEffect(() => {
    if (!room.isGroup) {
      dispatch(getLastOnline({ user: other._id }));
    }
  }, [online, busy, away, other]);

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? 'simple-popover' : undefined;

  return (
    <Grid className={classes.header}>
      {!room.isGroup && online.includes(other._id) ? (
        <StyledBadge
          overlap="circular"
          variant="dot"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Avatar alt={title} src={picture}>
            {title.charAt(0)}
          </Avatar>
        </StyledBadge>
      ) : (
        <Avatar alt={title} src={picture}>
          {title.charAt(0)}
        </Avatar>
      )}
      <Box className={classes.info}>
        <Typography className={classes.user} variant="h4" component="h4">
          {title}
        </Typography>
        <Typography className={classes.user} variant="body2" component="p">
          <Status room={room} user={other} lastOnline={lastOnline} online={online} busy={busy} away={away} />
        </Typography>
      </Box>
      <Box flexGrow={1} />
      {false && (
        <IconButton
          color="inherit"
          onClick={() => {
            // dispatch(call({ room, video: true }));
          }}
        >
          <VideoCall />
        </IconButton>
      )}
      {false && (
        <IconButton
          color="inherit"
          onClick={() => {
            // dispatch(call({ room, video: false }));
          }}
        >
          <Call />
        </IconButton>
      )}
      <Favorite roomId={room._id} />
      <Popover
        id={id}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.popover}>
          {room.members.length}
          {' members: '}
          {room.members.map((e) => `${e.firstName} ${e.lastName}`).join(', ') || '-'}
        </Typography>
      </Popover>
      <IconButton color="inherit" aria-describedby={id} onClick={handleClick}>
        <Info />
      </IconButton>
    </Grid>
  );
}

export default Header;
