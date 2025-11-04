const { costFields } = require('@config/vars');
const Joi = require('joi');
const { validator } = require('@utils/helper')

module.exports = {
  name: 'createCost',
  description: 'create cost information',
  path: '/v1/createCost',
  type: 'post',
  joiSchema: {
    body: Joi.object().keys({
      client: Joi.string().required(),
      data: Joi.array().items(Joi.object().keys(costFields.reduce((acc, key) => {
        acc[key.name] = validator[key.type](key.required);
        return acc;
      }, {}))).required(),
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