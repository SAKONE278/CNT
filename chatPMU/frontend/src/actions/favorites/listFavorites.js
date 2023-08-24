import axios from 'axios';
import Config from '../../config';

const listFavorites = () => async (dispatch) => {
  dispatch({ type: 'favorites-loading', loading: true });

  const onSuccess = (response) => {
    dispatch({ type: 'favorites-list', list: response.data.list });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/favorites/list`);
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  dispatch({ type: 'favorites-loading', loading: false });
};

export default listFavorites;
