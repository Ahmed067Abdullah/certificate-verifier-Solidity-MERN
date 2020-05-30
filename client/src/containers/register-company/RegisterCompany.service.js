import contract from '../../shared/contract';

export const registerCompany = (values) => {
  const { company, website, logo, primaryColor, secondaryColor } = values;
  const { ethereum } = window;
  return new Promise(async (resolve, reject) => {
    try {
      await contract.methods.registerCompany(
        company,
        logo,
        website,
        primaryColor ? primaryColor : '#1890ff',
        secondaryColor ? secondaryColor : '#000000a6'
      )
        .send({ from: ethereum.selectedAddress }, (err, address) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('Tx Address:', address);
        })
      resolve();
    } catch (e) {
      reject(e);
    }
  })
};