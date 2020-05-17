import contract from '../../shared/contract';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import axios from 'axios';
import showNotification from '../../shared/showNotification';

export const getCompany = (companyAddress, ownAddress) => {
  return contract.methods.getCompany(companyAddress)
    .call({ from: ownAddress })
}

export const checkCompany = (setCompanyLoading, setComapnyNotRegistered, setCompany = () => { }) => {
  const { ethereum } = window;
  if (ethereum.selectedAddress) {
    getCompany(ethereum.selectedAddress, ethereum.selectedAddress)
      .then(res => {
        setCompany(res);
        setComapnyNotRegistered(res['0'] === '');
        console.log('Comapny:', res)
      })
      .catch(err => {
        console.log(err);
        showNotification('Error', 'Error occurred while checking address');
      })
      .finally(() => {
        setCompanyLoading(false);
      })
  }
}

export const saveCertificate = payload => {
  return axios.post('http://localhost:5000/api/certificates', payload);
};

export const updatedCertificateStatus = (_id, status) => {
  return axios.put(`http://localhost:5000/api/certificates/${_id}`, { status });
};


export const awardCertificate = values => {
  return new Promise(async (resolve, reject) => {
    const { candidateName, duration, position, presenter, presenterDesignation } = values;
    const { ethereum: { selectedAddress } } = window;
    const uuid = uuidv4();
    const startDate = moment(duration[0]).unix().toString();
    const endDate = moment(duration[1]).unix().toString();

    let certificate = null;
    try {
      await contract.methods.awardCertificate(
        uuid,
        candidateName,
        position,
        startDate,
        endDate,
        presenter,
        presenterDesignation
      )
        .send({ from: selectedAddress }, async (err, address) => {
          if (err) {
            console.log(err);
            return;
          }
          certificate = (await saveCertificate({
            uuid,
            companyAddress: selectedAddress,
            candidateName
          })).data;
          console.log('Tx Address:', address);
        });
      await updatedCertificateStatus(certificate._id, 1);
      resolve();
    } catch (e) {
      if (certificate) {
        await updatedCertificateStatus(certificate._id, 2)
      }
      if (e.response) {
        showNotification('Error', e, true);
      } else {
        showNotification('Error', 'Error occurred while creating certificate');
      }
      console.log(e);
      reject(e);
    }
  })
}