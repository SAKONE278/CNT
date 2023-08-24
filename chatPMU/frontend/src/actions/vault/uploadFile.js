import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config';
import changePicture from '../auth/changePicture';
import getFile from './getFile';

const uploadFile = (file, { action }) => async (dispatch) => {
  const id = uuidv4();

  dispatch({ type: 'upload-loading', loading: true, id });

  dispatch({
    type: 'snack',
    content: 'uploading file',
    severity: 'info',
  });

  const onSuccess = async (response) => {
    console.log(response.data);

    let file;

    switch (action) {
      case 'create-group-picture':
        file = await getFile(response.data.id);
        dispatch({ type: 'create-group-picture', url: file.data.littleThumbnailUrl, id: response.data.id });
        break;
      case 'change-picture':
        dispatch(changePicture({ id: response.data.id }));
        break;
      case 'attach-to-message':
      default:
        dispatch({
          type: 'snack',
          content: 'attachment added',
          severity: 'success',
        });
        dispatch({ type: 'attach-to-message', id: response.data.id });
        break;
    }

    return response;
  };

  const onError = (error) => {
    dispatch({ type: 'upload-error', id });
    console.log(error);
    return error;
  };

  try {
    const data = new FormData();

    data.append('file', file, file.name);

    const response = await axios.post(`${Config.url}/api/files/upload`, data);

    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  dispatch({ type: 'upload-loading', loading: false, id });
};

export default uploadFile;
