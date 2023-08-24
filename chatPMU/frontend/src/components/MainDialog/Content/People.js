import {
  Box,
  DialogContent,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import Search from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import getUsers from '../../../actions/users/getUsers';
import getConversation from '../../../actions/rooms/getConversation';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.deep,
    color: theme.palette.primary.deep,
  },
  avatar: {
    width: 42,
    height: 42,
  },
  spacer: {
    width: 24,
    height: 42,
  },
  buttons: {
    display: 'flex',
    minWidth: 300,
  },
  button: {
    margin: 8,
  },
  popover: {
    padding: theme.spacing(2),
  },
  loader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
}));

function People({ setOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(getUsers({ text: '' }));
  }, []);

  const selectUser = (user) => {
    dispatch(getConversation({ user: user.id, navigate }));
    setOpen(false);
  };

  return (
    <DialogContent dividers>
      <Box className={classes.buttons} flex={1} flexDirection="column" justifyContent="center">
        <TextField
          variant="filled"
          className={classes.margin}
          label={t('Rechercher par nom d\'utilisateur,email ou autre')}
          onChange={(e) => dispatch(getUsers({ text: e.target.value }))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{
            background: '#000',
          }}
        />
        {loading && (
          <Box className={classes.loader}>
            <CircularProgress />
          </Box>
        )}
        <List>
          {users.map((user) => {
            const labelId = `checkbox-list-secondary-label-${user.id}`;
            return (
              <ListItem key={user.id} onClick={() => selectUser(user)} button>
                <ListItemAvatar>
                  <Avatar alt={user.firstName} src={user.picture && user.picture.littleThumbnailUrl} />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={`${user.firstName} ${user.lastName}`}
                  secondary={`@${user.username}`}
                />
              </ListItem>
            );
          })}
        </List>
        {users.length === 0 && !loading && (
          <Typography variant="body2" component="span">
            {t('No user matches the current filter.')}
          </Typography>
        )}
      </Box>
    </DialogContent>
  );
}

export default People;
