import axios from 'axios';
import Config from '../../config';

const createUser = ({
  shield, description, tags, isPrivate, actions, setOpen,
}) => async (dispatch) => {
  actions.setSubmitting(true);

  const onSuccess = (response) => {
    const { result } = response.data;
    setOpen(false);
    dispatch({ type: 'vault-updated', shield: result });
    dispatch({ type: 'snack', content: `file ${result.name} updated`, severity: 'success' });
    return response;
  };

  const onError = (error) => {
    dispatch({ type: 'snack', content: 'error while updating file', severity: 'error' });
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/vault/update`, {
      shield,
      description,
      tags,
      auth: isPrivate,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  actions.setSubmitting(false);
};

export default createUser;
