const { roiFileName } = require('@config/vars');
const { OK, getDatabaseInfo } = require('@utils/helper');
const logger = require('@utils/logger');

/**
 * getRoi
 * @public
 */
exports.getRoi = async (event) => {
  try {
    const { client } = event.queryStringParameters;
    const data = await getDatabaseInfo(client, roiFileName);
    return OK("Success", { message: "Successfully retrieved data", data });
  } catch (error) {
    console.log(error);
    return OK("Failure", { message: error.message })
  }
};
