import axios from 'axios';

export const verifyMe = token => {
  const config = {
    headers: {
      Authorization: token,
    }
  }
  return axios.get('http://localhost:5000/api/user/me', config);
}

export const getStarredCertificates = token => {
  const config = {
    headers: {
      Authorization: token,
    }
  }
  return axios.get('http://localhost:5000/api/user/favourites', config);
}

export const removeStarredCertificate = (token, certificateId) => {
  const config = {
    headers: {
      Authorization: token,
    }
  }
  return axios.put('http://localhost:5000/api/user/remove/from/favourites', { certificateId }, config);
}