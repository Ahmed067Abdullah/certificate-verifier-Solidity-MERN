const certificateRepository = require("./Certificate.repository");

const getCertificates = async (req, res) => {
  let certificates = await certificateRepository.getCertificates(req.query.companyAddress);
  res.send(certificates);
};

const createCertificate = async (req, res) => {
  const { candidateName, uuid, companyAddress } = req.body;
  const savedCertificate = await certificateRepository.createCertificate({ candidateName, uuid, companyAddress });
  res.send(savedCertificate);
};

module.exports = {
  getCertificates,
  createCertificate,
};


