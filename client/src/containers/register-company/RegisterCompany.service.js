import contract from '../../shared/contract';

export const registerCompany = (values) => {
  const { company, website, logo, primaryColor, secondaryColor } = values;
  const { ethereum } = window;
  return contract.methods.registerCompany(
    company,
    logo,
    website,
    primaryColor ? primaryColor : '#24C4D4',
    secondaryColor ? secondaryColor : '#ffd700'
  )
    .send({ from: ethereum.selectedAddress }, (err, address) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Tx Address:', address);
    })
};