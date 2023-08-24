import { Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import xss from 'xss';

function EmailInput() {
  const email = useSelector((state) => state.user.email);
  const error = useSelector((state) => state.user.errors.email);
  const dispatch = useDispatch();
  return (
    <Box mt={2} width={240}>
      <TextField
        id="email"
        email="email"
        label="Email"
        variant="standard"
        size="small"
        onChange={(e) => {
          dispatch({ type: 'user-email', value: xss(e.target.value) });
        }}
        value={email}
        error={!!error}
        helperText={error || "Your Gravatar email, others won't see it"}
        fullWidth
      />
    </Box>
  );
}

export default EmailInput;
