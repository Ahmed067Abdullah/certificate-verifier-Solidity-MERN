import contract from '../../shared/contract';

export const getCertificate = uuid => {
  const { ethereum } = window;
  return contract.methods.getCertificate(uuid)
    .call({ from: ethereum.selectedAddress });
};