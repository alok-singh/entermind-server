const Joi = require('joi');

module.exports = {
  name: 'createUsage',
  description: 'create usage',
  path: '/v1/createUsage',
  type: 'post',
  joiSchema: {
    body: Joi.object().keys({
      client: Joi.string().required(),
      data: Joi.array().items(Joi.object().keys({
        date: Joi.date().timestamp('javascript').required(),
        platform: Joi.string().required(),
        metricType: Joi.string().required(),
        quantity: Joi.number().required(),
        unitCost: Joi.number().required(),
        totalCost: Joi.number().required(),
        agentOrProject: Joi.string().required(),
        environment: Joi.string().required(),
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








