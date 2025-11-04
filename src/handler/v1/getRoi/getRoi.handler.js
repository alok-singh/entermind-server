const { roiFileName } = require('@config/vars');
const { OK, getAllRoiInfo } = require('@utils/helper');
const logger = require('@utils/logger');

/**
 * getRoi
 * @public
 */
exports.getRoi = async (event) => {
  try {
    const { client } = event.queryStringParameters;
    const data = await getAllRoiInfo(client, roiFileName);
    return OK("Success", { message: "Successfully retrieved data", data });
  } catch (error) {
    return OK("Failure", { message: error.message })
  }
};
