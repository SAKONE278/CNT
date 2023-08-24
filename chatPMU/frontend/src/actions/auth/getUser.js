import axios from 'axios';
import Config from '../../config';

const getUser = () => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'user', data: response.data });
    setTimeout(() => {
      dispatch(getUser());
    }, 10 * 3600 * 1000);
    return response;
  };

  const onError = (error) => {
    console.log(error);
    setTimeout(() => {
      dispatch(getUser());
    }, 10000);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/auth/user`);
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default getUser;
