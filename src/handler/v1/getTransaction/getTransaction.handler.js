const { transactionFileName } = require('@config/vars');
const { OK, getDatabaseInfo } = require('@utils/helper');
const logger = require('@utils/logger');

/**
 * getTransaction
 * @public
 */
exports.getTransaction = async (event) => {
  try {
    const { client } = event.queryStringParameters;
    const data = await getDatabaseInfo(client, transactionFileName);
    return OK("Success", {
      message: "Successfully retrieved data", data: data.sort((a, b) => {
        return new Date(a.timestamp) - new Date(a.timestamp) > 0 ? 1 : -1;
      })
    });
  } catch (error) {
    console.log(error);
    return OK("Failure", { message: error.message })
  }
};
