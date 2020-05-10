const certificateRepository = require("./Certificate.repository");

const getCertificates = async (req, res) => {
  let certificates = await certificateRepository.getCertificates(req.query.companyAddress);
  res.send(certificates);
};

const createCertificate = async (req, res) => {
  console.log(req.body);
  const savedCertificate = await certificateRepository.createCertificate(req.body);
  res.send(savedCertificate);
};

module.exports = {
  getCertificates,
  createCertificate,
};


