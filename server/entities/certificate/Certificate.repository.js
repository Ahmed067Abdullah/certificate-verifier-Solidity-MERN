const Certificate = require("./Certificate.model");

const getCertificateById = async _id => {
  return await Certificate.findById(_id);
};

const getCertificateByUuid = async uuid => {
  return await Certificate.findOne({ uuid });
};

const getCertificates = async companyAddress => {
  let certificates = await Certificate.find({ companyAddress });
  if (!certificates) certificates = [];
  return certificates;
};

const createCertificate = async payload => {
  const certificate = new Certificate(payload);
  return await certificate.save();
};

const updateCertificateStatus = async (_id, status) => {
  return await Certificate.updateOne({ _id }, { status });
};

module.exports = {
  getCertificateById,
  getCertificateByUuid,
  getCertificates,
  createCertificate,
  updateCertificateStatus
};
