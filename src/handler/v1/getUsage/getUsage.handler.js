const { usageFileName } = require('@config/vars');
const { OK, getDatabaseInfo } = require('@utils/helper');

/**
 * getUsage
 * @public
 */
exports.getUsage = async (event) => {
  try {
    const { client } = event.queryStringParameters;
    const data = await getDatabaseInfo(client, usageFileName);
    return OK("Success", { message: "Successfully retrieved data", response: data });
  } catch (error) {
    console.log(error);
    return OK("Failure", { message: error.message })
  }
};
