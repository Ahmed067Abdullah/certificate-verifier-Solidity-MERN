const Joi = require('@hapi/joi');
const errorMessagesGenerator = require('../../shared/errorMessageGenerator');

const validateGetCertificates = (req, res, next) => {
  const schema = Joi.object({
    companyAddress: Joi.string()
      .length(42)
      .required()
      .error(e => errorMessagesGenerator(e, 'Company Address'))
  });
  const { companyAddress } = req.query;
  const { error } = schema.validate({ companyAddress });

  if (error) {
    res.status(403).send({
      success: false,
      error: error.details[0].message
    });
  }
  next();
};

const validateCreateCertificate = (req, res, next) => {
  const schema = Joi.object({
    uuid: Joi.string()
      .min(34)
      .max(38)
      .required()
      .error(e => errorMessagesGenerator(e, 'uuid')),
    companyAddress: Joi.string()
      .length(42)
      .required()
      .error(e => errorMessagesGenerator(e, 'Company Address')),
    candidateName: Joi.string()
      .min(3)
      .max(64)
      .required()
      .error(e => errorMessagesGenerator(e, 'Candidate Name'))
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(403).send({
      success: false,
      error: error.details[0].message
    });
  }
  next();
};

module.exports = {
  validateGetCertificates,
  validateCreateCertificate,
};


