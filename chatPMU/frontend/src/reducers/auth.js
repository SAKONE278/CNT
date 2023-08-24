import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

if (localStorage.getItem('app') !== 'Clover 4.x.x') {
  localStorage.clear();
  localStorage.setItem('app', 'Clover 4.x.x');
}

const token = localStorage.getItem('token');
if (token) setAuthToken(token);

const user = token ? jwtDecode(token) : null;

const initialState = {
  token,
  user: {
    ...user,
    name: user ? `${user.firstName} ${user.lastName}` : null,
  },
  loading: false,
  email: null,
  socket: null,
  session: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        loading: action.loading,
      };
    case 'login':
      return {
        ...state,
        token: action.token,
        user: {
          ...action.user,
          name: action.user ? `${action.user.firstName} ${action.user.lastName}` : null,
        },
      };
    case 'forgot-password-email':
      return {
        ...state,
        email: action.email,
      };
    case 'logout':
      return {
        ...state,
        token: null,
        user: null,
      };
    case 'user':
      return {
        ...state,
        user: { ...state.user, ...action.data.user },
      };
    case 'socket session':
      return {
        ...state,
        socket: action.socket,
        session: action.session,
      };
    default:
      return state;
  }
};

export default reducer;
