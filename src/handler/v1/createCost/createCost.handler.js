const { costFileName } = require('@config/vars');
const { OK, writeDatabaseInfo } = require('@utils/helper');
const httpStatus = require('http-status');

/**
 * createCost
 * @public
 */
exports.createCost = async (event) => {
  try {
    const { body } = event;
    const { client, data } = body;
    await writeDatabaseInfo(client, costFileName, data);
    return OK("OK", { message: "Created Cost successfully" });
  } catch (error) {
    console.log(error);
    return OK("Failure", { message: error.message }, httpStatus[500])
  }
};
