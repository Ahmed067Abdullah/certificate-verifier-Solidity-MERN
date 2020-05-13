const mongoose = require("mongoose");
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

const updateCertificateStatus = async (req, res) => {
  const { status } = req.body;
  const { _id } = req.params;
  if (mongoose.Types.ObjectId.isValid(_id)) {
    const certificate = await certificateRepository.getCertificateById(_id);
    if (certificate) {
      await certificateRepository.updateCertificateStatus(_id, status);
      return res.send({ success: false, message: "Certificate status updated successfully" });
    }
    return res.status(404).send({ success: false, message: "Certificate not found" });
  }
  return res.status(404).send({ success: false, message: "Invalid Id" });
};

module.exports = {
  getCertificates,
  createCertificate,
  updateCertificateStatus
};
