import { useDispatch, useSelector } from 'react-redux';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Mic, MicOff } from '@mui/icons-material';
import Actions from '../../actions';

function MicrophoneToggle() {
  const available = useSelector((state) => state.media.devices.audio);
  const active = useSelector((state) => !!state.media.local.audio);
  const dispatch = useDispatch();

  return (
    <Box pr={1}>
      <ToggleButtonGroup
        value={active}
        exclusive
        onChange={() => {
          if (active) {
            dispatch(Actions.Media.releaseLocalAudio());
          } else {
            dispatch(Actions.Media.getLocalAudio());
          }
        }}
        disabled={!available}
      >
        <ToggleButton value={false}>
          <MicOff />
        </ToggleButton>
        <ToggleButton value>
          <Mic />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default MicrophoneToggle;
