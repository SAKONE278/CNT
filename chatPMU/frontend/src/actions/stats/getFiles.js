import axios from 'axios';
import Config from '../../config';

const getFiles = () => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'stats-files', data: response.data });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    dispatch({ type: 'stats-files', data: null });
    const response = await axios.post(`${Config.url}/api/stats/files`);
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default getFiles;
