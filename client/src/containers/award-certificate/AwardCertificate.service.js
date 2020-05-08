import contract from '../../shared/contract';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export const checkCompany = (setCompanyLoading, setComapnyNotRegistered, setCompany = () => { }) => {
  const { ethereum } = window;
  if (ethereum.selectedAddress) {
    contract.methods.getCompany(ethereum.selectedAddress)
      .call({ from: ethereum.selectedAddress })
      .then(res => {
        setCompany(res);
        setComapnyNotRegistered(res === '');
        console.log('Comapny:', res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setCompanyLoading(false);
      })
  }
}

export const awardCertificate = (values) => {
  const { candidateName, duration, position, presenter, presenterDesignation } = values;
  const { ethereum } = window;
  const uuid = uuidv4();
  const startDate = moment(duration[0]).unix().toString();
  const endDate = moment(duration[1]).unix().toString();

  return contract.methods.awardCertificate(
    uuid,
    candidateName,
    position,
    startDate,
    endDate,
    presenter,
    presenterDesignation
  )
    .send({ from: ethereum.selectedAddress }, (err, address) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Tx Address:', address);
    });
}