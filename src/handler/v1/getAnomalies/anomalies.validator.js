const Joi = require('joi');

module.exports = {
  name: 'Get Anomalies',
  path: '/v1/get-anomalies',
  type: 'get',
  description: 'Get anomalies API',
  joiSchema: {
    headers: Joi.object({}).options({ stripUnknown: true }),
    body: {},
    query: Joi.object().keys({
      client: Joi.string().required(),
      type: Joi.string().valid('COST', 'ROI', 'USAGE').required(),
    }),
    response: {
      200: {
        description: Joi.string(),
        body: {
          responseCode: 200,
          responseMessage: Joi.string().required()
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