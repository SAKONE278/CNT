import {
  Dialog as MaterialDialog,
} from '@mui/material';
import { useEffect } from 'react';
import Title from './Title';
import Content from './Content';
import Actions from './Actions';

function Dialog({
  open, setOpen, type, setType,
}) {
  useEffect(() => {
    if (!open) {
      setTimeout(() => setType(null), 500);
    }
  }, [open]);

  return (
    <MaterialDialog
      onClose={() => {}}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: '#000',
        },
      }}
    >
      <Title type={type} setType={setType} />
      <Content type={type} setType={setType} setOpen={setOpen} />
      <Actions type={type} setOpen={setOpen} setType={setType} />
    </MaterialDialog>
  );
}

export default Dialog;
