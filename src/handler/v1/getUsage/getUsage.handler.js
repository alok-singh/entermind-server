const { OK, getAllUsageInfo } = require('@utils/helper');

/**
 * getUsage
 * @public
 */
exports.getUsage = async (event) => {
  try {
    const { client } = event.queryStringParameters;
    const data = await getAllUsageInfo(client);
    return OK("Success", { message: "Successfully retrieved data", data });
  } catch (error) {
    console.log(error);
    return OK("Failure", { message: error.message })
  }
};
