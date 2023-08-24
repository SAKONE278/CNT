import {
  Box, Card, IconButton, InputAdornment, TextField, Typography, useTheme,
} from '@mui/material';
import { Send, Spellcheck } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as generateUUID } from 'uuid';
import striptags from 'striptags';
import dayjs from 'dayjs';
import xss from 'xss';
import PropTypes from 'prop-types';
import Actions from '../../../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    minHeight: 'calc(100% - 48px)',
    height: 'calc(100% - 48px)',
    maxHeight: 'calc(100% - 48px)',
    flexDirection: 'column',
  },

  messages: {
    backgroundColor: theme.palette.background.deep,
    flex: 1,
    overflow: 'auto',
    padding: 16,
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    minHeight: 78,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderBottom: theme.dark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    maxHeight: 240,
  },
  formControl: {
    flexGrow: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  input: {
    backgroundColor: theme.palette.background.default,
  },

  message: {
    margin: 4,
    color: 'white',
    flexDirection: 'column',
    display: 'flex',
  },
  cardStart: {
    padding: '10px 16px',
    flexGrow: 0,
    minWidth: 0,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  cardEnd: {
    padding: '10px 16px',
    flexGrow: 0,
    minWidth: 0,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  systemMessageCard: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.deep,
    flexGrow: 0,
    minWidth: 0,
    maxWidth: '80%',
    alignSelf: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  authorTime: {
    color: theme.dark ? '#ffffff' : '#121212',
    width: '100%',
    marginBottom: 4,
  },
}));

function Content({ message }) {
  const classes = useStyles();
  const theme = useTheme();

  const convertUrls = (text) => {
    // eslint-disable-next-line
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    // eslint-disable-next-line
    return text.replace(urlRegex, (url) => {
      // eslint-disable-next-line
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
    });
  };
  return (
    <Card
      className={message.isMine ? classes.cardEnd : classes.cardStart}
      sx={{
        backgroundColor: message.isMine ? theme.palette.primary.main : theme.palette.secondary.main,
        color: message.isMine ? '#121212' : '#ffffff',
      }}
    >
      <Typography variant="body1" component="p" style={{ textAlign: 'left' }}>
        <div
          dangerouslySetInnerHTML={{
            __html: convertUrls(
              striptags((message.content || '').replaceAll('\n', '<br />'), [
                'a',
                'strong',
                'b',
                'i',
                'em',
                'u',
                'br',
              ]),
            ),
          }}
        />
      </Typography>
    </Card>
  );
}

Content.propTypes = {
  message: PropTypes.object,
};

function Message({ message, next }) {
  const classes = useStyles();

  const isNextFromDifferentAuthor = !next || message.uuid !== next.uuid;
  const isPreviousFarInTime = next && dayjs(next.date).subtract(4, 'minutes').isAfter(dayjs(message.date));

  return (
    <Box className={classes.message} textAlign={message.isMine ? 'right' : 'left'}>
      <Content message={message} />
      {(isNextFromDifferentAuthor || isPreviousFarInTime) && (
        <Box className={classes.authorTime}>
          <Typography
            variant="caption"
            component="div"
            className={classes.authorTime}
            textAlign={message.isMine ? 'right' : 'left'}
          >
            {!message.isMine && `${message.name} - `}
            {dayjs(message.date).format('MMM D, h:mm A')}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

Message.propTypes = {
  message: PropTypes.object,
  next: PropTypes.object,
};

function SettingsTab() {
  const classes = useStyles();
  const input = useRef({ scrollHeight: 56 });
  const [text, setText] = useState('');
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const uuid = useSelector((state) => state.media.uuid);

  const send = () => {
    if ((!text || text === '')) {
      return;
    }
    dispatch(Actions.IO.sendMessage({ content: xss(text) }));
    setText('');
    setTimeout(() => setReload(!reload), 1);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.messages}>
        {messages.length === 0 && (
          <Box className={classes.message} textAlign="center">
            <Card className={classes.systemMessageCard}>
              <Typography variant="caption" component="p">
                ROOM JOINED
              </Typography>
            </Card>
          </Box>
        )}
        {messages.map((message, index) => {
          message.isMine = uuid === message.uuid;
          return (
            <Message
              message={message}
              next={index < messages.length - 1 ? messages[index + 1] : null}
              key={generateUUID()}
            />
          );
        })}
      </Box>
      <Box className={classes.footer} style={{ minHeight: input.current.scrollHeight + 20 }}>
        <TextField
          id="outlined-adornment-password"
          type="text"
          value={text}
          label="Type a message"
          ref={input}
          sx={{
            background: '#000',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              send();
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            setText(e.target.value);
            setTimeout(() => setReload(!reload), 1);
          }}
          endAdornment={(
            <InputAdornment position="end">
              <Spellcheck />
            </InputAdornment>
          )}
          labelWidth={118}
          multiline
          className={classes.input}
          rowsMax={4}
          variant="filled"
          fullWidth
        />
        <Box ml={1}>
          <IconButton color="inherit" onClick={send}>
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
export default SettingsTab;
