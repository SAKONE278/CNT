import axios from 'axios';
import Config from '../../config';

const changePicture = ({ id }) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'user', data: response.data });
    dispatch({
      type: 'snack',
      content: 'profile picture changed',
      severity: 'success',
    });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/auth/change-picture`, {
      id,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default changePicture;
