const { costFileName } = require('@config/vars');
const { OK, getDatabaseInfo } = require('@utils/helper');

/**
 * cost
 * @public
 */
exports.getCost = async (event) => {
  try {
    const { client } = event.queryStringParameters;
    const data = await getDatabaseInfo(client, costFileName);
    return OK("Success", { message: "Successfully retrieved data", response: data });
  } catch (error) {
    console.log(error);
    return OK("Failure", { message: error.message })
  }
};
