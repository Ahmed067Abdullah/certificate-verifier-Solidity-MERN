import axios from 'axios';

export const register = data => {
  return axios.post('http://localhost:5000/api/user/register', data);
}

export const login = data => {
  return axios.post('http://localhost:5000/api/user/login', data);
}