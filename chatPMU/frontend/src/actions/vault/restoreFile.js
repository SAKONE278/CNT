import axios from 'axios';
import Config from '../../config';

const restoreFile = ({ shield }) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'vault-deleted', shield: response.data.shield });
    dispatch({ type: 'snack', content: `file ${response.data.shield.name} restored`, severity: 'success' });
    return response;
  };

  const onError = (error) => {
    if (error.response) {
      console.log(error.response);
    }
    dispatch({ type: 'snack', content: 'error while restoring file', severity: 'error' });
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/vault/restore`, {
      shield,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default restoreFile;
