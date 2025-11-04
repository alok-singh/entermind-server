const { OK, getAllCostInfo } = require('@utils/helper');

/**
 * cost
 * @public
 */
exports.getCost = async (event) => {
  try {
    const { client } = event.queryStringParameters;
    const data = await getAllCostInfo(client);
    return OK("Success", { message: "Successfully retrieved data", data });
  } catch (error) {
    return OK("Failure", { message: error.message })
  }
};
