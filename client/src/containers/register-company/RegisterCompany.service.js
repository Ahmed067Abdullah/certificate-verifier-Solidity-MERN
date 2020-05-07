import contract from '../../shared/contract';

export const registerCompany = (values) => {
  const { company, website, logo } = values;
  const { ethereum } = window;
  contract.methods.registerCompany(company, logo, website)
    .send({ from: ethereum.selectedAddress }, (err, address) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Tx Address:', address);
    })
};