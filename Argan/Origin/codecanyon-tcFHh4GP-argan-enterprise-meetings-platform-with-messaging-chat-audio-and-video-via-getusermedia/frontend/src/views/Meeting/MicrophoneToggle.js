import { useDispatch, useSelector } from 'react-redux';
import { Mic, MicOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Actions from '../../actions';

const AudioButton = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

function MicrophoneToggle() {
  const available = useSelector((state) => state.media.devices.audio);
  const active = useSelector((state) => !!state.media.local.audio);
  const dispatch = useDispatch();

  return (
    <AudioButton
      color={active ? 'primary' : 'secondary'}
      onClick={() => {
        if (active) {
          dispatch(Actions.Media.releaseLocalAudio());
        } else {
          dispatch(Actions.Media.getLocalAudio());
        }
      }}
      disabled={!available}
    >
      {active ? <Mic style={{ width: 48 }} /> : <MicOff style={{ width: 48 }} />}
    </AudioButton>
  );
}

export default MicrophoneToggle;
