const Certificate = require("./Certificate.model");

const getCertificates = async companyAddress => {
  console.log(companyAddress);
  let certificates = await Certificate.find({ companyAddress });
  if (!certificates) certificates = [];
  return certificates;
};

const createCertificate = async payload => {
  const certificate = new Certificate(payload);
  return await certificate.save();
};

const editTodo = async payload => {
  const { _id, text } = payload;
  await Certificate.update({ _id }, { text });
};

module.exports = {
  getCertificates,
  createCertificate,
  editTodo
};
