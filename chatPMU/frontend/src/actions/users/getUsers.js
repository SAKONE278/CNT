import axios from 'axios';
import Config from '../../config';
import store from '../../store';

const getUsers = ({ text = '' }) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({
      type: 'users',
      data: (response.data.users || []).filter((e) => e.id !== store.getState().auth.user.id),
    });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/users/search`, {
      text,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default getUsers;
