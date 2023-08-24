import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import PhoneDisabled from '@mui/icons-material/PhoneDisabled';
import { Chat } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import MicrophoneToggle from './MicrophoneToggle';
import CameraToggle from './CameraToggle';
import MeetingDrawer from './MeetingDrawer';
import Actions from '../../actions';
import ScreenToggle from './ScreenToggle';

function MeetingBar() {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const meetingDrawerOpen = useSelector((state) => state.drawer.open);
  const dispatch = useDispatch();

  return (
    <AppBar position="fixed" color="secondary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <IconButton color="error" onClick={() => setConfirmationOpen(true)}>
          <PhoneDisabled />
        </IconButton>
        <ScreenToggle />
        <MicrophoneToggle />
        <CameraToggle />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="inherit"
          onClick={() => dispatch({ type: 'drawer', value: !meetingDrawerOpen })}
        >
          <Chat />
        </IconButton>
      </Toolbar>
      <Dialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Etes vous sur de quitter ce meeting ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)} color="primary">
            Annuler
          </Button>
          <Button
            onClick={() => {
              dispatch(Actions.Media.leaveMeeting());
              window.open('https://www.journaldunet.fr/web-tech/dictionnaire-du-webmastering/1203375-intranet-definition/', '_blank');
            }}
            color="primary"
          >
            Quiter
          </Button>
        </DialogActions>
      </Dialog>
      <MeetingDrawer />
    </AppBar>
  );
}

export default MeetingBar;
