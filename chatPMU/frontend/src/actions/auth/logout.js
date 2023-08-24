import setAuthToken from '../../utils/setAuthToken';

const logout = ({ navigate }) => (dispatch) => {
  dispatch({ type: 'logout' });
  setAuthToken(null);
  localStorage.removeItem('token');
  navigate('/auth/login', { replace: true });
  window.open('https://www.journaldunet.fr/web-tech/dictionnaire-du-webmastering/1203375-intranet-definition/', '_blank');
};

export default logout;
