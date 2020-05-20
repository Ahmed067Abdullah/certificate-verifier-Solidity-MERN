import request from '../../shared/request';
import { logout } from './AuthModal.actions';

export const register = data => {
  return request('/user/register', 'post', false, data);
}

export const login = data => {
  return request('/user/login', 'post', false, data);
}

export const verifyMe = () => {
  const token = localStorage.getItem("certificate-verifier-token");
  if (token) {
    return request('/user/me', 'get', true);
  } else {
    return new Promise((resolve, reject) => { resolve() })
  }
}

export const callLogout = () => dispatch => {
  localStorage.removeItem("certificate-verifier-token");
  dispatch(logout());
}