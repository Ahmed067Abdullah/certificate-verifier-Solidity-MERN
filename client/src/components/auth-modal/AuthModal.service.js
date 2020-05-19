import axios from 'axios';
import { logout } from './AuthModal.actions'; 

export const register = data => {
  return axios.post('http://localhost:5000/api/user/register', data);
}

export const login = data => {
  return axios.post('http://localhost:5000/api/user/login', data);
}

export const callLogout = () => dispatch =>  {
  localStorage.removeItem("certificate-verifier-token");
  dispatch(logout());
}