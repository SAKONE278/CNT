import { useDispatch, useSelector } from 'react-redux';
import Fab from '@mui/material/Fab';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';
import PropTypes from 'prop-types';

function CoverFab({ uuid, screen }) {
  const dispatch = useDispatch();
  const cover = useSelector((state) => state.media.settings.cover[uuid]);
  const hasVideo = useSelector((state) => state.media.settings.hasVideo[uuid]);
  return (
    <Fab
      color="secondary"
      size="small"
      onClick={() => {
        dispatch({ type: 'interface-cover', uuid, value: !cover });
      }}
      disabled={!hasVideo || screen}
      sx={{ marginTop: 3 }}
    >
      {cover ? <FullscreenExit style={{ width: 22 }} /> : <Fullscreen style={{ width: 20 }} />}
    </Fab>
  );
}

CoverFab.propTypes = {
  uuid: PropTypes.string,
  screen: PropTypes.bool,
};

export default CoverFab;
