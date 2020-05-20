import request from '../../shared/request';

export const getStarredCertificates = () => {
  return request('/user/favourites', 'get', true);
}

export const addStarredCertificate = certificateId => {
  return request('/user/add/to/favourites', 'put', true, { certificateId });
}

export const removeStarredCertificate = certificateId => {
  return request('/user/remove/from/favourites', 'put', true, { certificateId });
}