const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CertificatesSchema = new Schema({
  uuid: {
    required: true,
    type: String
  },
  companyAddress: {
    required: true,
    type: String
  },
  candidateName: {
    required: true,
    type: String
  }
});

module.exports = mongoose.model('certificates', CertificatesSchema);
