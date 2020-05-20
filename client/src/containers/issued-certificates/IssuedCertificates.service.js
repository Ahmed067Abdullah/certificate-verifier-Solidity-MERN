import request from '../../shared/request';

export const getIssuedCertificates = () => {
  const { ethereum } = window;
  return request(`/certificates?companyAddress=${ethereum.selectedAddress}`, 'get');
}