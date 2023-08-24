import { combineReducers } from 'redux';
import auth from './auth';
import favorites from './favorites';
import form from './form';
import media from './media';
import rooms from './rooms';
import snack from './snack';
import room from './room';
import users from './users';
import vault from './vault';

export default combineReducers({
  auth,
  favorites,
  form,
  snack,
  media,
  room,
  rooms,
  users,
  vault,
});
