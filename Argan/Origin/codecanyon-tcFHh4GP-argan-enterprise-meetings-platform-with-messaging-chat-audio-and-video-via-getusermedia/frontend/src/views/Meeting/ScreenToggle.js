import { useDispatch, useSelector } from 'react-redux';
import { ScreenShare } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Actions from '../../actions';

const ScreenShareButton = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -25,
  left: -70,
  right: 70,
  margin: '0 auto',
});

function ScreenToggle() {
  const active = useSelector((state) => !!state.media.local.screen);
  const dispatch = useDispatch();

  return (
    <ScreenShareButton
      color={active ? 'primary' : 'secondary'}
      size="medium"
      onClick={() => {
        if (active) {
          dispatch(Actions.Media.releaseLocalScreen());
        } else {
          dispatch(Actions.Media.getLocalScreen());
        }
      }}
    >
      {active ? <ScreenShare style={{ width: 22 }} /> : <ScreenShare style={{ width: 20 }} />}
    </ScreenShareButton>
  );
}

export default ScreenToggle;
