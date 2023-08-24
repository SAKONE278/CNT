import { ThemeProvider } from '@mui/material';
import { useNavigate, useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import getTheme from './theme';
import GlobalStyles from './components/GlobalStyles';
import Snack from './components/Snack';
import routes from './routes';
import initIO from './actions/auth/initIO';
import getUser from './actions/auth/getUser';
import listRooms from './actions/rooms/listRooms';
import listFavorites from './actions/favorites/listFavorites';

const theme = getTheme();

function App() {
  const token = useSelector((state) => state.auth.token);
  const routing = useRoutes(routes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(initIO(token, navigate));
      dispatch(getUser());
      dispatch(listRooms());
      dispatch(listFavorites());
    }
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
      <Snack />
    </ThemeProvider>
  );
}

export default App;
