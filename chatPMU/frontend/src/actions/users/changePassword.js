import axios from 'axios';
import Config from '../../config';

const changePassword = ({ password, repeatPassword, actions }) => async (dispatch) => {
  actions.setSubmitting(true);

  if (!password || password.length === 0) {
    dispatch({
      type: 'snack',
      content: 'password required',
      severity: 'error',
    });
    actions.setSubmitting(false);
    return;
  }

  if (password.length < 6) {
    dispatch({
      type: 'snack',
      content: 'password must be at least 6 characters',
      severity: 'error',
    });
    return;
  }

  if (password !== repeatPassword) {
    dispatch({
      type: 'snack',
      content: 'passwords not matching',
      severity: 'error',
    });
    actions.setSubmitting(false);
    return;
  }

  const onSuccess = (response) => {
    dispatch({ type: 'user', data: response.data });
    dispatch({
      type: 'snack',
      content: 'password changed',
      severity: 'success',
    });
    actions.setSubmitting(false);
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/users/change-password`, {
      password,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default changePassword;
