const { OK } = require('@utils/helper');
const logger = require('@utils/logger');
const { chatWithLlama } = require('@utils/ollama');

exports.hello = async (event) => {
  logger.info('im inside hello controller');
  const response = await chatWithLlama('Why sky is blue?');
  return OK('Hello API', {
    message: 'Go Serverless v1.0! Your function executed successfully!',
    response: response
  });
};
