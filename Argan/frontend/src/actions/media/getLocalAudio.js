import store from '../../store';
import Utils from '../../utils';
import releaseLocalAudio from './releaseLocalAudio';

const getLocalAudio = () => async (dispatch) => {
  dispatch({ type: 'local-audio', data: {} });
  const { device, transports, live } = store.getState().media;

  if (!device.canProduce('audio')) {
    return dispatch({ type: 'snack', severity: 'error', content: 'microphone not found' });
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    if (!live) {
      return dispatch({ type: 'local-audio', data: { stream } });
    }

    const track = stream.getAudioTracks()[0];
    track.onended = () => {
      dispatch(releaseLocalAudio());
    };
    Utils.logger.info('audio track', track);
    const params = { track, appData: { kind: 'audio' } };

    const producer = await transports.producer.produce(params);
    return dispatch({ type: 'local-audio', data: { stream, producer } });
  } catch (err) {
    Utils.logger.info('audio produce error', err);
    dispatch(releaseLocalAudio());
    return dispatch({ type: 'snack', severity: 'error', content: 'microphone not available' });
  }
};

export default getLocalAudio;
