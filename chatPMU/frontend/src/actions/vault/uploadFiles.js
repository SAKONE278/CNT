import axios from 'axios';
import Config from '../../config';

const uploadFiles = ({
  files,
  description,
  tags,
  isPrivate,
  actions,
  setOpen,
  // eslint-disable-next-line consistent-return
}) => async (dispatch) => {
  actions.setSubmitting(true);

  const onSuccess = (response) => {
    dispatch({ type: 'vault-uploaded', shield: response.data.shield });
    return response;
  };

  const onError = (error) => {
    if (error.response) {
      console.log(error.response);
    }
    dispatch({ type: 'snack', content: 'error while uploading file', severity: 'error' });
    return error;
  };

  // eslint-disable-next-line no-restricted-syntax
  for (let i = 0; i < files.length; i++) {
    const formData = new FormData();
    formData.append('file', files[i]);
    formData.append('tags', tags);
    formData.append('description', description);
    formData.append('auth', isPrivate);
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.post(`${Config.url}/api/vault/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const { total, loaded } = progressEvent;
          const percent = (loaded * 100) / total;
          dispatch({
            type: 'snack',
            content: `uploading: ${Math.floor((100 / files.length) * i + percent / files.length)}%`,
            severity: 'info',
          });
        },
      });
      onSuccess(response);
    } catch (error) {
      onError(error);
      return actions.setSubmitting(false);
    }
  }

  dispatch({ type: 'snack', content: 'upload complete', severity: 'success' });
  setOpen(false);

  actions.setSubmitting(false);

  actions.setFieldValue('tags', '');
  actions.setFieldValue('description', '');
  actions.setFieldValue('files', []);
  window.size = 0;
};

export default uploadFiles;
