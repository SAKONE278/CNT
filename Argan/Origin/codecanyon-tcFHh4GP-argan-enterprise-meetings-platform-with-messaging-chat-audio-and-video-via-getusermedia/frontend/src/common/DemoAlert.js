import { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import config from '../config';

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

function DemoAlert() {
  const [open, setOpen] = useState(inIframe());

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Live Preview Warning
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This live preview is currently running inside
          the Envato frame (see the Envato bar at the top).
          In order to acquire video and audio, you need to be on the actual demo site.
          Do you want to be redirected?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Stay on Envato</Button>
        <Button
          onClick={() => {
            window.top.location.href = config.url;
          }}
          autoFocus
        >
          Go to demo
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DemoAlert;
