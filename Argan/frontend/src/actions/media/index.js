import getLocalAudio from './getLocalAudio';
import getLocalScreen from './getLocalScreen';
import getLocalVideo from './getLocalVideo';
import joinMeeting from './joinMeeting';
import leaveMeeting from './leaveMeeting';
import releaseLocalAudio from './releaseLocalAudio';
import releaseLocalVideo from './releaseLocalVideo';
import releaseLocalScreen from './releaseLocalScreen';
import setupMedia from './setupMedia';

const Media = {
  getLocalAudio,
  getLocalScreen,
  getLocalVideo,
  joinMeeting,
  leaveMeeting,
  releaseLocalAudio,
  releaseLocalVideo,
  releaseLocalScreen,
  setupMedia,
};

export default Media;
