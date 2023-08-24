import { useEffect, useRef } from 'react';
import {
  Box, List, Typography, useTheme, Container, CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ChatItem from './ChatItem';
import getRoom from '../../../actions/rooms/getRoom';
import Page from '../../../components/Page';
import config from '../../../config';
import listFavorites from '../../../actions/favorites/listFavorites';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    height: '100%',
    maxHeight: '100%',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  messageBox: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    overflowY: 'auto',
    justifyContent: 'center',
  },
  messageList: {
    paddingLeft: 16,
    paddingRight: 16,
    width: '90%',
    maxWidth: 800,
    margin: 'auto',
  },
  loadingContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.deep,
  },
}));

function Chat() {
  const theme = useTheme();
  const classes = useStyles();
  const scrollRef = useRef();
  const params = useParams();
  const dispatch = useDispatch();
  const room = useSelector((state) => state.room.room);
  const messages = useSelector((state) => state.room.messages || []);
  const loading = useSelector((state) => state.room.loading);
  const user = useSelector((state) => state.auth.user);
  const lastMessageID = useSelector((state) => {
    let e = state.room.messages || [{ _id: 1 }];
    if (e.length === 0) {
      e = [{ _id: 1 }];
    }
    return e[e.length - 1]._id;
  });

  useEffect(() => {
    if (!room && !loading) {
      dispatch(getRoom({ room: params.id }));
      dispatch(listFavorites());
    }
  }, [params.id]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lastMessageID]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [scrollRef.current]);

  if (!room) {
    return (
      <Page
        className={classes.root}
        title={`Loading | ${config.appTitle}`}
        style={{ maxHeight: 'calc(100vh - 64px)', width: '100%' }}
      >
        <Container maxWidth="lg" style={{ overflowY: 'auto', minHeight: '100%', maxHeight: '100%' }} disableGutters>
          <Box className={classes.loadingContainer}>
            <CircularProgress />
            <Typography variant="body1" component="p" style={{ marginTop: 12, color: theme.palette.text.primary }}>
              Chargement...
            </Typography>
          </Box>
        </Container>
      </Page>
    );
  }

  const other = room.members.find((e) => e._id !== user.id);
  const title = room.isGroup ? room.title : `${other.firstName} ${other.lastName}`;

  return (
    <Page
      className={classes.root}
      title={`${title} | ${config.appTitle}`}
      style={{ maxHeight: 'calc(100vh - 63px)', width: '100%' }}
    >
      <Container maxWidth="lg" style={{ overflowY: 'auto', minHeight: '100%', maxHeight: '100%' }} disableGutters>
        <Box className={classes.container}>
          <Header room={room} other={other} />
          <Box className={classes.messageBox} ref={scrollRef}>
            <List className={classes.messageList}>
              {messages.map((item, index) => {
                item.isMine = user.id === item.author._id || user.id === item.author.id;
                return (
                  <ChatItem
                    item={item}
                    prev={index > 0 ? messages[index - 1] : null}
                    next={index < messages.length - 1 ? messages[index + 1] : null}
                    isGroup={room.isGroup}
                    key={item.id}
                  />
                );
              })}
            </List>
          </Box>
          <Footer room={room} other={other} />
        </Box>
      </Container>
    </Page>
  );
}

export default Chat;
