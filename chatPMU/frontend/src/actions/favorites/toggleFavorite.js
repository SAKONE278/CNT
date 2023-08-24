import axios from 'axios';
import Config from '../../config';
import listFavorites from './listFavorites';

const toggleFavorite = ({ roomId }) => async (dispatch) => {
  dispatch({ type: 'favorites-loading', loading: true });

  const onSuccess = (response) => {
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/favorites/toggle`, {
      roomId,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  dispatch(listFavorites());
};

export default toggleFavorite;
