import axios from 'axios';
import Config from '../../config';
import capitalizeFirstLetter from '../../utils/capitlizeFirstLetter';

const changePassword = ({ password, actions, message }) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'snack', content: message, severity: 'success' });
    return response;
  };

  const onError = (error) => {
    if (error.response) {
      const { data } = error.response;
      if (data.password) actions.setFieldError('password', capitalizeFirstLetter(data.password));
    }
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/auth/change-password`, {
      password,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  actions.setSubmitting(false);
};

export default changePassword;
