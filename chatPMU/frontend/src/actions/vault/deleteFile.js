import axios from 'axios';
import Config from '../../config';

const deleteFile = ({
  shield, actions, permanent, setOpen,
}) => async (dispatch) => {
  actions.setSubmitting(true);

  const onSuccess = (response) => {
    dispatch({ type: 'vault-deleted', shield: response.data.shield });
    dispatch({
      type: 'snack',
      content: `file ${response.data.shield.name} ${permanent ? 'deleted' : 'sent to trash'}`,
      severity: 'success',
    });
    setOpen(false);
    return response;
  };

  const onError = (error) => {
    if (error.response) {
      console.log(error.response);
    }
    dispatch({ type: 'snack', content: 'error while deleting file', severity: 'error' });
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/vault/delete`, {
      shield,
      permanent,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  actions.setSubmitting(false);
};

export default deleteFile;
