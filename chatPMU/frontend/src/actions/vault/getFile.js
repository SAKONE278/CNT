import axios from 'axios';
import Config from '../../config';

const getFile = async (id) => {
  const onSuccess = (response) => {
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.get(`${Config.url}/api/files/info/${id}`);
    return onSuccess(response);
  } catch (error) {
    onError(error);
    return undefined;
  }
};

export default getFile;
