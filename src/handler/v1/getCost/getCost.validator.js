const Joi = require('joi');

module.exports = {
  name: 'cost',
  description: 'get cost information',
  path: '/v1/cost',
  type: 'get',
  joiSchema: {
    body: {},
    response: {
      200: {
        description: 'OK',
        body: {
          responseCode: 200,
          responseMessage: Joi.string().required(),
          response: Joi.object().keys({
            date: Joi.string().required(),
            vendor: Joi.string().required(),
            category: Joi.string().required(),
            subcategory: Joi.string().required(),
            amount: Joi.string().required(),
            units: Joi.string().required(),
            project: Joi.string().required(),
            tags: Joi.string().required(),
            notes: Joi.string().required(),
          })
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
