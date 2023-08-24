import io from 'socket.io-client';
import Config from '../../config';
import store from '../../store';
import status from '../users/status';
import listRooms from '../rooms/listRooms';

const socketPromise = require('../../utils/socket.io-promise').promise;

let socket;

const initIO = (token) => (dispatch) => {
  if (socket) {
    socket.disconnect();
  }

  socket = io(Config.url || '', {
    query: { token },
    transports: ['websocket'],
  });

  socket.request = socketPromise(socket);

  window.socket = socket;

  socket.on('connect', async () => {
    dispatch(status());
    const response = await socket.request('session', { session: store.getState().auth.session });
    dispatch({ type: 'socket session', session: response.session, socket });

    socket.on('message', (data) => {
      const state = store.getState();
      console.log('data', data);
      if (data.message.author._id !== state.auth.user.id) {
        if (state.room.room) {
          if (data.room._id === state.room.room._id) {
            dispatch({ type: 'send-message', data });
          } else {
            const { rooms } = store.getState().rooms;
            const room = rooms.find((e) => e._id === data.room._id);
            if (!room) {
              dispatch(listRooms());
            }
          }
        }
      }
    });

    socket.on('online', (data) => {
      dispatch({
        type: 'online',
        id: data.id,
      });
    });

    socket.on('offline', (data) => {
      dispatch({
        type: 'offline',
        id: data.id,
      });
    });

    socket.on('producer', (data) => {
      console.log('producer', data);
      dispatch({
        type: 'producer',
        data,
        id: data.producerID,
      });
    });

    socket.on('producer-closed', (data) => {
      console.log('producer-closed', data);
      dispatch({
        type: 'producer-closed',
        data,
        id: data.producerID,
      });
    });
  });

  window.onbeforeunload = () => {
    socket.disconnect();
  };
};

export default initIO;
