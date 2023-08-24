import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Utils from '../../utils';

function GoToButton() {
  const key = useSelector((state) => state.meeting.key);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box width="100%" display="flex" pt={3}>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => {
          dispatch({ type: 'meeting-errors-clear' });
          if (Utils.isEmpty(key)) {
            dispatch({ type: 'meeting-errors-key', error: 'Meeting key required' });
            return;
          }
          const regex = /^[a-zA-Z0-9-]+$/;
          if (key.search(regex) === -1) {
            dispatch({ type: 'meeting-errors-key', error: 'Only alphanumerical and dashes' });
            return;
          }
          if (key) {
            navigate(`/join/${key}`);
          }
        }}
      >
        Joindre la conférence
      </Button>
    </Box>
  );
}

export default GoToButton;
