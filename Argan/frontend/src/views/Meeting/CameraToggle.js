import { useDispatch, useSelector } from 'react-redux';
import { Videocam, VideocamOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Actions from '../../actions';

const VideoButton = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -25,
  left: 70,
  right: -70,
  margin: '0 auto',
});

function CameraToggle() {
  const available = useSelector((state) => state.media.devices.video);
  const active = useSelector((state) => !!state.media.local.video);
  const dispatch = useDispatch();

  return (
    <VideoButton
      color={active ? 'primary' : 'secondary'}
      size="medium"
      onClick={() => {
        if (active) {
          dispatch(Actions.Media.releaseLocalVideo());
        } else {
          dispatch(Actions.Media.getLocalVideo());
        }
      }}
      disabled={!available}
    >
      {active ? <Videocam style={{ width: 22 }} /> : <VideocamOff style={{ width: 20 }} />}
    </VideoButton>
  );
}

export default CameraToggle;
