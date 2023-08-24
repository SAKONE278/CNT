import axios from 'axios';
import Config from '../../config';

const deleteFiles = ({
  shields, permanent, actions, setOpen,
}) => async (dispatch) => {
  actions.setSubmitting(true);

  const onSuccess = (response) => {
    const { result } = response.data;
    dispatch({ type: 'vault-deleted-many', files: result });
    dispatch({
      type: 'snack',
      content: `${result.length} files ${permanent ? 'deleted' : 'sent to trash'}`,
      severity: 'success',
    });
    setOpen(false);
    return response;
  };

  const onError = (error) => {
    if (error.response) {
      console.log(error.response);
    }
    dispatch({ type: 'snack', content: 'error while deleting files', severity: 'error' });
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/vault/delete-many`, {
      shields,
      permanent,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  actions.setSubmitting(false);
};

export default deleteFiles;
