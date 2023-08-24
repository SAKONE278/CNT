import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Config from '../../config';
import setAuthToken from '../../utils/setAuthToken';
import capitalizeFirstLetter from '../../utils/capitlizeFirstLetter';

const updateProfile = ({
  firstName, lastName, username, email, actions,
}) => async (dispatch) => {
  const onSuccess = (response) => {
    const { token } = response.data;
    const user = jwtDecode(token);
    dispatch({ type: 'login', token, user });
    actions.setFieldValue('firstName', user.firstName);
    actions.setFieldValue('lastName', user.lastName);
    actions.setFieldValue('username', user.username);
    actions.setFieldValue('email', user.email);
    setAuthToken(token);
    localStorage.setItem('token', token);
    dispatch({ type: 'snack', content: 'user profile updated', severity: 'success' });
    return response;
  };

  const onError = (error) => {
    if (error.response) {
      const { data } = error.response;
      if (data.firstName) actions.setFieldError('firstName', capitalizeFirstLetter(data.firstName));
      if (data.lastName) actions.setFieldError('lastName', capitalizeFirstLetter(data.lastName));
      if (data.username) actions.setFieldError('username', capitalizeFirstLetter(data.username));
      if (data.email) actions.setFieldError('email', capitalizeFirstLetter(data.email));
    }
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/auth/update-profile`, {
      firstName,
      lastName,
      username,
      email,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  actions.setSubmitting(false);
};

export default updateProfile;
