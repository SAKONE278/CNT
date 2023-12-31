import { useEffect, useRef, useState } from 'react';
import {
  IconButton, Popover, Badge, TextField, Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import InsertEmoticon from '@mui/icons-material/InsertEmoticon';
import AttachFile from '@mui/icons-material/AttachFile';
import Send from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import Spellcheck from '@mui/icons-material/Spellcheck';
import { Picker } from 'emoji-mart';
import { useDispatch, useSelector } from 'react-redux';
import data from '@emoji-mart/data';
import './fix.css';
import sendMessage from '../../../actions/rooms/sendMessage';
import uploadFile from '../../../actions/vault/uploadFile';

const useStyles = makeStyles((theme) => ({
  header: {
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
  user: {
    paddingLeft: 16,
  },
  formControl: {
    flexGrow: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  input: {
    backgroundColor: theme.palette.background.default,
  },
}));

function EmojiPicker(props) {
  const ref = useRef();

  useEffect(() => {
    new Picker({ ...props, data, ref });
  }, []);

  return <div ref={ref} />;
}

function Footer() {
  const fileInput = useRef();
  const classes = useStyles();
  const input = useRef({ scrollHeight: 56 });
  const [text, setText] = useState('');
  const [reload, setReload] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const room = useSelector((state) => state.room.room);
  const pictures = useSelector((state) => state.room.pictures || []);
  const loading = useSelector((state) => state.vault.loading);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const send = () => {
    if ((!text || text === '') && pictures.length === 0) {
      return;
    }
    dispatch(
      sendMessage({
        content: text,
        room: room._id,
        file: null,
      }),
    );
    setText('');
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? 'simple-popover' : undefined;

  return (
    <div className={classes.header} style={{ minHeight: input.current.scrollHeight + 20 }}>
      <Popover
        id={id}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <EmojiPicker
          native
          onEmojiSelect={(e) => {
            setText(text + e.native);
            setAnchorEl(null);
          }}
          theme="dark"
        />
      </Popover>
      <IconButton color="inherit" onClick={handleClick}>
        <InsertEmoticon />
      </IconButton>
      <Box mr={1}>
        <IconButton
          color="inherit"
          onClick={() => {
            if (pictures.length > 0) {
              dispatch({ type: 'remove-attachments' });
            } else if (fileInput && fileInput.current) {
              fileInput.current.click();
            }
          }}
        >
          <Badge color="primary" badgeContent={pictures.length} variant={loading ? 'dot' : 'standard'}>
            <AttachFile />
          </Badge>
        </IconButton>
      </Box>
      <TextField
        id="outlined-adornment-password"
        type="text"
        value={text}
        label="Ecrire un message"
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
      <input
        style={{
          visibility: 'hidden',
          width: 0,
          height: 0,
          padding: 0,
          margin: 0,
        }}
        type="file"
        ref={fileInput}
        accept="image/*"
        onChange={(e) => dispatch(uploadFile(e.target.files[0], { action: 'attach-to-message' }))}
      />
    </div>
  );
}

export default Footer;
