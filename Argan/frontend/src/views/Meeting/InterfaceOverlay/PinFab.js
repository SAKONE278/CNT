import { useDispatch, useSelector } from 'react-redux';
import Fab from '@mui/material/Fab';
import { PushPin } from '@mui/icons-material';
import PropTypes from 'prop-types';

function PinFab({ id }) {
  const dispatch = useDispatch();
  const pinned = useSelector((state) => state.media.settings.pinned);
  return (
    <Fab
      color={pinned === id ? 'primary' : 'secondary'}
      size="small"
      onClick={() => {
        if (pinned === id) {
          dispatch({ type: 'switch-ui', value: 'matrix', pin: null });
        } else {
          dispatch({ type: 'switch-ui', value: 'pinned', pin: id });
        }
      }}
      sx={{ marginRight: 1, marginTop: 3, marginLeft: 1 }}
    >
      <PushPin style={{ width: 20 }} />
    </Fab>
  );
}

PinFab.propTypes = {
  id: PropTypes.string,
};

export default PinFab;
