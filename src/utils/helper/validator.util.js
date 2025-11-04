const Joi = require('joi');

module.exports = {
  string(required) { return required ? Joi.string().required() : Joi.string() },
  number(required) { return required ? Joi.number().required() : Joi.number() },
  date(required) { return required ? Joi.date().timestamp('javascript').required() : Joi.date().timestamp('javascript') },
};
