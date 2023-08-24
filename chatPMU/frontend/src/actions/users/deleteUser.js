import axios from 'axios';
import Config from '../../config';

const deleteUser = ({ id, actions, setOpen }) => async (dispatch) => {
  actions.setSubmitting(true);

  const onSuccess = (response) => {
    const { result } = response.data;
    dispatch({ type: 'users-deleted', user: result, id });
    dispatch({ type: 'snack', content: `user @${result.username} deleted`, severity: 'success' });
    setOpen(false);
    return response;
  };

  const onError = (error) => {
    if (error.response) {
      console.log(error.response);
    }
    dispatch({ type: 'snack', content: 'error while deleting user', severity: 'error' });
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/users/delete`, {
      id,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  actions.setSubmitting(false);
};

export default deleteUser;
