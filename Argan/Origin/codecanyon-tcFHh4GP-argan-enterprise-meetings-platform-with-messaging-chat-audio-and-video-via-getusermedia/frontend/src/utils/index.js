import pino from 'pino';
import isEmpty from './isEmpty';
import useWindowDimensions from './useWindowDimensions';

const Utils = {
  socket: null,
  logger: pino(),
  isEmpty,
  useWindowDimensions,
};

export default Utils;
