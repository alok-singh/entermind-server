const { categories } = require('@config/vars');
const Joi = require('joi');

module.exports = {
  name: 'createRoi',
  description: 'create roi',
  path: '/v1/createRoi',
  type: 'post',
  joiSchema: {
    body: Joi.object().keys({
      client: Joi.string().required(),
      data: Joi.array().items(Joi.object().keys({
        date: Joi.date().timestamp('javascript').required(),
        initiative: Joi.string().required(),
        category: Joi.string().valid(...categories).required(),
        valueType: Joi.string().required(),
        amount: Joi.number().required(),
        kpi: Joi.string().required(),
        confidence: Joi.string().required(),
        mechanism: Joi.string().required(),
        agents: Joi.string().required(),
        notes: Joi.string(),
      })).required()
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
