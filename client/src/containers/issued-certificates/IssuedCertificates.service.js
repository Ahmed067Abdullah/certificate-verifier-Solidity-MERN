import axios from 'axios';

export const getIssuedCertificates = () => {
  const { ethereum } = window;
  return axios.get(`http://localhost:5000/api/certificates?companyAddress=${ethereum.selectedAddress}`);
}