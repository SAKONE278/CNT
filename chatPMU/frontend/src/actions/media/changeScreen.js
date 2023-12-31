import store from '../../store';
import stopProducer from './stopProducer';

const changeScreen = (value) => async (dispatch) => {
  if (value) {
    let stream;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      dispatch({ type: 'media-change-screen', active: true, video: { stream } });
    } catch (e) {
      console.log(e);
      dispatch({ type: 'snack', content: 'cannot get camera stream', severity: 'error' });
    }
  } else {
    const { cameraProducer } = store.getState().media;
    const sessionId = (store.getState().auth.session || {})._id;
    const routerId = (store.getState().media.router || {})._id;
    const meetingId = store.getState().media.meetingID;
    try {
      const tracks = store.getState().media.sharing.stream.getVideoTracks();
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].stop();
      }
    } catch (e) {
      console.log(e);
      console.log('error while stopping video');
    }
    if (cameraProducer) {
      dispatch(
        stopProducer({
          sessionId,
          meetingId,
          routerId,
          producerId: cameraProducer._id,
        }),
      );
    }
    dispatch({ type: 'media-change-screen', active: false, video: null });
  }
};

export default changeScreen;
