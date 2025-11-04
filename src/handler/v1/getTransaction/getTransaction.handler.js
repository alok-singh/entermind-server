const { transactionFileName } = require('@config/vars');
const { OK, getDatabaseInfo, getAllTransactionsInfo } = require('@utils/helper');
const logger = require('@utils/logger');

/**
 * getTransaction
 * @public
 */
exports.getTransaction = async (event) => {
  try {
    const { client } = event.queryStringParameters;
    const data = await getAllTransactionsInfo(client);
    return OK("Success", {
      message: "Successfully retrieved data", data
    });
  } catch (error) {
    console.log(error);
    return OK("Failure", { message: error.message })
  }
};
