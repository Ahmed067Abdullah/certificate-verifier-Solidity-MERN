import { combineReducers } from 'redux';
import userReducer from '../components/auth-modal/AuthModal.reducer';

export default combineReducers({
  user: userReducer
});