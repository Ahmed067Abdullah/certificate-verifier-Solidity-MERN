import axios from 'axios';

const API_ENDPOINT = 'http://localhost:5000/api';

const fetchToken = () => {
  const token = localStorage.getItem("certificate-verifier-token");
  return token;
};

export default (url, type, headers, data, params) => {
  let token = '';
  if (headers) {
    token = fetchToken();
  }
  const request = {
    'headers': {},
    'method': type,
    'url': API_ENDPOINT + url
  };
  if (type !== 'get') {
    request.data = data;
  }
  if (headers) {
    request.headers = {
      ...request.headers,
      Authorization: token
    };
  }
  if (params) {
    request.params = params;
  }
  return axios(request)
};