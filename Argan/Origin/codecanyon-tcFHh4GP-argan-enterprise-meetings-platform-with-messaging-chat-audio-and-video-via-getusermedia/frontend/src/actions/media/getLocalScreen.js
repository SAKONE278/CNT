import store from '../../store';
import Utils from '../../utils';
import releaseLocalScreen from './releaseLocalScreen';

const getLocalScreen = () => async (dispatch) => {
  dispatch({ type: 'local-screen', data: {} });
  const { transports } = store.getState().media;

  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

    dispatch({ type: 'local-screen', data: { stream } });

    const track = stream.getVideoTracks()[0];
    track.onended = () => {
      dispatch(releaseLocalScreen());
    };
    Utils.logger.info('screen track', track);
    const params = { track, appData: { kind: 'screen' } };

    const producer = await transports.producer.produce(params);

    return dispatch({ type: 'local-screen', data: { stream, producer } });
  } catch (err) {
    dispatch(releaseLocalScreen());
    return dispatch({ type: 'snack', severity: 'error', content: 'screen not available' });
  }
};

export default getLocalScreen;
