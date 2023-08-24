import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Snack() {
  const dispatch = useDispatch();
  const snack = useSelector((state) => state.snack);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: 'snack-out' });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={snack.open}
      autoHideDuration={snack.autoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={() => dispatch({ type: 'snack-out' })} severity={snack.severity}>
        {snack.content}
      </Alert>
    </Snackbar>
  );
}

export default Snack;
