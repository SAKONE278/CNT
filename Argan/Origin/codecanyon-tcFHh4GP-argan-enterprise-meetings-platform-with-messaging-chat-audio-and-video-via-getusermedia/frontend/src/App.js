import { ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getTheme from './theme';
import Common from './common';
import routes from './routes';
import Actions from './actions';
import config from './config';

const theme = getTheme();

function App() {
  const socketId = useSelector((state) => state.socket.id);
  const device = useSelector((state) => state.media.device);
  const routing = useRoutes(routes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socketId) {
      dispatch(Actions.IO.setupSocket());
    }
  }, [socketId]);

  useEffect(() => {
    if (socketId && !device) {
      dispatch(Actions.Media.setupMedia());
    }
  }, [socketId, device]);

  return (
    <ThemeProvider theme={theme}>
      <Common.GlobalStyles />
      {routing}
      <Common.Snack />
      {config.demo && <Common.DemoAlert />}
    </ThemeProvider>
  );
}

export default App;
