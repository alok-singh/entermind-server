const { costFileName } = require('@config/vars');
const { OK, writeCostToDatabase } = require('@utils/helper');
const httpStatus = require('http-status');

/**
 * createCost
 * @public
 */
exports.createCost = async (event) => {
  try {
    const { body } = event;
    const { client, data } = body;
    await writeCostToDatabase(client, data);
    return OK("OK", { message: "Created Cost successfully" });
  } catch (error) {
    console.log(error);
    return OK("Failure", { message: error.message }, httpStatus[500])
  }
};
