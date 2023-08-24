import { useDispatch, useSelector } from 'react-redux';
import {
  Box, FormControlLabel, FormGroup, FormHelperText, Switch, TextField,
} from '@mui/material';
import xss from 'xss';

function SettingsTab() {
  const preview = useSelector((state) => state.media.settings.preview);
  const more = useSelector((state) => state.media.settings.more);
  const dispatch = useDispatch();

  return (
    <Box py={3} px={5}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={preview} onChange={() => dispatch({ type: 'preview' })} />}
          label="Show local video preview"
        />
        <TextField
          label="Matrix UI"
          id="filled-start-adornment"
          sx={{ mt: 3, width: '100%' }}
          variant="filled"
          value={more.matrix}
          onChange={(e) => {
            dispatch({ type: 'ui-matrix-peers', value: xss(e.target.value) });
          }}
        />
        <FormHelperText id="filled-weight-helper-text">
          Must be an integer (2 or greater)
        </FormHelperText>
        <TextField
          label="Pinned UI (desktop)"
          id="filled-start-adornment"
          sx={{ mt: 3, width: '100%' }}
          variant="filled"
          value={more.pinned.desktop}
          onChange={(e) => {
            dispatch({ type: 'ui-pinned-desktop-peers', value: xss(e.target.value) });
          }}
        />
        <FormHelperText id="filled-weight-helper-text">
          Must be an integer (2 or greater)
        </FormHelperText>
        <TextField
          label="Pinned UI (mobile)"
          id="filled-start-adornment"
          sx={{ mt: 3, width: '100%' }}
          variant="filled"
          value={more.pinned.mobile}
          onChange={(e) => {
            dispatch({ type: 'ui-pinned-mobile-peers', value: xss(e.target.value) });
          }}
        />
        <FormHelperText id="filled-weight-helper-text">
          Must be an integer (2 or greater)
        </FormHelperText>
      </FormGroup>
    </Box>
  );
}
export default SettingsTab;
