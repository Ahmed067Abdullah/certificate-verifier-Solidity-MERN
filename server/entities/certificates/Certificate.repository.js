const Certificate = require("./Certificate.model");

const getCertificates = async companyAddress => {
  let certificates = await Certificate.find({ companyAddress });
  if (!certificates) certificates = [];
  return certificates;
};

const createCertificate = async payload => {
  const certificate = new Certificate(payload);
  return await certificate.save();
};

module.exports = {
  getCertificates,
  createCertificate
};
