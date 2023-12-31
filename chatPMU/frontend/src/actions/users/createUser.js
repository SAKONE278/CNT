import axios from 'axios';
import Config from '../../config';
import capitalizeFirstLetter from '../../utils/capitlizeFirstLetter';

const createUser = ({
  firstName, lastName, username, email, password, isAdmin, actions, setOpen,
}) => async (dispatch) => {
  actions.setSubmitting(true);

  const onSuccess = (response) => {
    const { user } = response.data;
    setOpen(false);
    actions.setFieldValue('firstName', '');
    actions.setFieldValue('lastName', '');
    actions.setFieldValue('username', '');
    actions.setFieldValue('email', '');
    actions.setFieldValue('password', '');
    actions.setFieldValue('isAdmin', false);
    dispatch({ type: 'users-created', user });
    dispatch({ type: 'snack', content: `user @${user.username} created`, severity: 'success' });
    return response;
  };

  const onError = (error) => {
    if (error.response) {
      const { data } = error.response;
      if (data.firstName) actions.setFieldError('firstName', capitalizeFirstLetter(data.firstName));
      if (data.lastName) actions.setFieldError('lastName', capitalizeFirstLetter(data.lastName));
      if (data.username) actions.setFieldError('username', capitalizeFirstLetter(data.username));
      if (data.email) actions.setFieldError('email', capitalizeFirstLetter(data.email));
      if (data.password) actions.setFieldError('password', capitalizeFirstLetter(data.password));
    } else {
      dispatch({ type: 'snack', content: 'error while creating user', severity: 'error' });
    }
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/users/create`, {
      firstName,
      lastName,
      username,
      email,
      password,
      roles: isAdmin ? ['admin'] : ['standard'],
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  actions.setSubmitting(false);
};

export default createUser;
