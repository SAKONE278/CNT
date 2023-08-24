import { useDispatch, useSelector } from 'react-redux';
import Fab from '@mui/material/Fab';
import { Visibility } from '@mui/icons-material';
import PropTypes from 'prop-types';

function HideFab({ id }) {
  const dispatch = useDispatch();
  const hidden = useSelector((state) => state.media.settings.hidden);
  return (
    <Fab
      color="secondary"
      size="small"
      onClick={() => {
        if (hidden.set.has(id)) {
          dispatch({ type: 'interface-show', value: id });
        } else {
          dispatch({ type: 'interface-hide', value: id });
        }
      }}
      sx={{ marginRight: 1, marginTop: 3, marginLeft: 1 }}
    >
      <Visibility style={{ width: 20 }} />
    </Fab>
  );
}

HideFab.propTypes = {
  id: PropTypes.string,
};

export default HideFab;
