import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Validator from 'validator';
import Utils from '../../utils';

function JoinButton() {
  const [loading] = useState();
  const socketId = useSelector((state) => state.socket.id);
  const name = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.email);
  const key = useSelector((state) => state.meeting.key);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box width="100%" display="flex" pt={3}>
      <Button
        disabled={loading || !socketId}
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => {
          dispatch({ type: 'user-errors-clear' });
          if (Utils.isEmpty(name)) {
            dispatch({ type: 'user-errors-name', error: 'Name required' });
          }
          if (Utils.isEmpty(email)) {
            dispatch({ type: 'user-errors-email', error: 'Email required' });
          }
          const isValidEmail = Validator.isEmail(email);
          if (!isValidEmail) {
            dispatch({ type: 'user-errors-email', error: 'Invalid email' });
          }
          if (name && isValidEmail) {
            dispatch({ type: 'join', name, email });
            navigate(`/meeting/${key}`);
          }
        }}
      >
        Join the Meeting
      </Button>
    </Box>
  );
}

export default JoinButton;
