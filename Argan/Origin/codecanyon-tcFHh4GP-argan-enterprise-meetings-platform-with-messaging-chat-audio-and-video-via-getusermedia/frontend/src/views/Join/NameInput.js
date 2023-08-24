import { Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import xss from 'xss';

function NameInput() {
  const name = useSelector((state) => state.user.name);
  const error = useSelector((state) => state.user.errors.name);
  const dispatch = useDispatch();
  return (
    <Box mt={2} width={240}>
      <TextField
        id="name"
        name="name"
        label="Name"
        variant="standard"
        size="small"
        onChange={(e) => {
          dispatch({ type: 'user-name', value: xss(e.target.value) });
        }}
        value={name}
        error={!!error}
        helperText={error || 'Your display name, to be seen by others'}
        fullWidth
        autoFocus
      />
    </Box>
  );
}

export default NameInput;
