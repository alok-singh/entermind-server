const Joi = require('joi');

module.exports = {
  name: 'getUsage',
  description: 'get usage',
  path: '/v1/getUsage',
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
            platform: Joi.string().required(),
            metricType: Joi.string().required(),
            quantity: Joi.string().required(),
            unitCost: Joi.string().required(),
            totalCost: Joi.string().required(),
            agentOrProject: Joi.string().required(),
            environment: Joi.string().required(),
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
