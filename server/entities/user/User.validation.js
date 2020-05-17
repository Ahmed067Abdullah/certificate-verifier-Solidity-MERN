const Joi = require('@hapi/joi');
const errorMessagesGenerator = require('../../shared/errorMessageGenerator');

const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
      .error(e => errorMessagesGenerator(e, 'Name')),
    email: Joi.string()
      .required()
      .error(e => errorMessagesGenerator(e, 'Email')),
    password: Joi.string()
      .required()
      .error(e => errorMessagesGenerator(e, 'Password'))
  });
  const { name, email, password } = req.body;
  const { error } = schema.validate({ name, email, password });

  if (error) {
    return res.status(403).send({
      success: false,
      error: error.details[0].message
    });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .error(e => errorMessagesGenerator(e, 'Email')),
    password: Joi.string()
      .required()
      .error(e => errorMessagesGenerator(e, 'Password'))
  });
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });

  if (error) {
    return res.status(403).send({
      success: false,
      error: error.details[0].message
    });
  }
  next();
};

const validateMe = (req, res, next) => {
  const schema = Joi.object({
    token: Joi.string()
      .required()
      .error(e => errorMessagesGenerator(e, 'Token'))
  });

  const { authorization } = req.headers;
  const { error } = schema.validate({ token: authorization });

  if (error) {
    return res.status(403).send({
      success: false,
      error: error.details[0].message
    });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateMe
};


