import axios from 'axios';
import Config from '../../config';

const deleteUsers = ({ ids, actions, setOpen }) => async (dispatch) => {
  actions.setSubmitting(true);

  const onSuccess = (response) => {
    const { result } = response.data;
    dispatch({ type: 'users-deleted-many', users: result, ids });
    dispatch({ type: 'snack', content: `${result.length} users deleted`, severity: 'success' });
    setOpen(false);
    return response;
  };

  const onError = (error) => {
    if (error.response) {
      console.log(error.response);
    }
    dispatch({ type: 'snack', content: 'error while deleting users', severity: 'error' });
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/users/delete-many`, {
      ids,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  actions.setSubmitting(false);
};

export default deleteUsers;
