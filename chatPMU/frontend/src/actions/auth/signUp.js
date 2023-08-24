import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Config from '../../config';
import setAuthToken from '../../utils/setAuthToken';
import capitalizeFirstLetter from '../../utils/capitlizeFirstLetter';

const signUp = ({
  firstName, lastName, email, username, password, preference, navigate, actions,
}) => async (dispatch) => {
  const onSuccess = (response) => {
    const { token } = response.data;
    dispatch({ type: 'login', token, user: jwtDecode(token) });
    setAuthToken(token);
    localStorage.setItem('token', token);
    navigate('/', { replace: true });
    return response;
  };

  const onError = (error) => {
    if (error.response) {
      const { data } = error.response;
      if (data.firstName) actions.setFieldError('firstName', capitalizeFirstLetter(data.firstName));
      if (data.lastName) actions.setFieldError('lastName', capitalizeFirstLetter(data.lastName));
      if (data.email) actions.setFieldError('email', capitalizeFirstLetter(data.email));
      if (data.username) actions.setFieldError('username', capitalizeFirstLetter(data.username));
      if (data.password) actions.setFieldError('password', capitalizeFirstLetter(data.password));
      if (data.preference) actions.setFieldError('preference', capitalizeFirstLetter(data.preference));
    }
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/auth/sign-up`, {
      firstName,
      lastName,
      email,
      username,
      password,
      preference,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  actions.setSubmitting(false);
};

export default signUp;
