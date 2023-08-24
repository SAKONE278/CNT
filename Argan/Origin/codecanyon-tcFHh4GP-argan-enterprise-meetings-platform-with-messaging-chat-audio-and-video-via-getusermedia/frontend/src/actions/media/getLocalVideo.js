import store from '../../store';
import Utils from '../../utils';
import releaseLocalVideo from './releaseLocalVideo';

const getLocalVideo = () => async (dispatch) => {
  dispatch({ type: 'local-video', data: {} });
  const { device, transports, live } = store.getState().media;

  if (!device.canProduce('video')) {
    return dispatch({ type: 'snack', severity: 'error', content: 'camera not found' });
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    if (!live) {
      return dispatch({ type: 'local-video', data: { stream } });
    }

    const track = stream.getVideoTracks()[0];
    track.onended = () => {
      dispatch(releaseLocalVideo());
    };
    Utils.logger.info('video track', track);
    const params = { track, appData: { kind: 'video' } };

    const producer = await transports.producer.produce(params);
    return dispatch({ type: 'local-video', data: { stream, producer } });
  } catch (err) {
    Utils.logger.info('video produce error', err);
    dispatch(releaseLocalVideo());
    return dispatch({ type: 'snack', severity: 'error', content: 'camera not available' });
  }
};

export default getLocalVideo;
