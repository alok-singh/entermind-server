const { categories } = require('@config/vars');
const Joi = require('joi');

module.exports = {
  name: 'createCost',
  description: 'create cost information',
  path: '/v1/createCost',
  type: 'post',
  joiSchema: {
    body: Joi.object().keys({
      client: Joi.string().required(),
      data: Joi.array().items(Joi.object().keys({
        date: Joi.date().timestamp('javascript').required(),
        vendor: Joi.string().required(),
        category: Joi.string().valid(...categories).required(),
        subcategory: Joi.string().required(),
        amount: Joi.number().required(),
        units: Joi.string().required(),
        project: Joi.string().required(),
        tags: Joi.string().required(),
        notes: Joi.string().required(),
      })).required(),
    }).options({ allowUnknown: true }),
    response: {
      200: {
        description: 'OK',
        body: {
          responseCode: 200,
          responseMessage: Joi.string().required(),
          response: {}
        }
      },
      400: {
        description: 'Error Response',
        body: {
          responseCode: 400,
          responseMessage: Joi.string().required(),
          response: {
            errors: Joi.array().items(Joi.object().keys({
              errorCode: Joi.string().required(),
              errorTitle: Joi.string().required(),
              errorDescription: Joi.string().required(),
              errorDebugDescription: Joi.string()
            }))
          }
        }
      }
    }
  }
};