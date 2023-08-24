import { useDispatch, useSelector } from 'react-redux';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Videocam, VideocamOff } from '@mui/icons-material';
import Actions from '../../actions';

function CameraToggle() {
  const available = useSelector((state) => state.media.devices.video);
  const active = useSelector((state) => !!state.media.local.video);
  const dispatch = useDispatch();

  return (
    <Box pl={1}>
      <ToggleButtonGroup
        value={active}
        exclusive
        onChange={() => {
          if (active) {
            dispatch(Actions.Media.releaseLocalVideo());
          } else {
            dispatch(Actions.Media.getLocalVideo());
          }
        }}
        disabled={!available}
      >
        <ToggleButton value={false}>
          <VideocamOff />
        </ToggleButton>
        <ToggleButton value>
          <Videocam />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default CameraToggle;
