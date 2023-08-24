import store from '../../store';
import Utils from '../../utils';

const releaseLocalScreen = () => async (dispatch) => {
  const { uuid } = store.getState().media;
  const { key } = store.getState().meeting;
  const data = store.getState().media.local.screen;
  if (data) {
    if (data.stream) {
      data.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    Utils.logger.info('local screen released');
    if (data.producer) {
      try {
        data.producer.pause();
        Utils.logger.info('video producer paused');
      } catch (e) {
        Utils.logger.error('error while closing screen producer', e);
      }
      await Utils.socket.request('closeProducer', {
        uuid,
        kind: 'screen',
        id: data.producer.id,
        key,
      });
    }
  }
  dispatch({ type: 'local-screen', data: null });
};

export default releaseLocalScreen;
