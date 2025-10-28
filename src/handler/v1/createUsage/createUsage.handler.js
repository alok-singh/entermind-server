const { usageFileName } = require('@config/vars');
const { OK, writeDatabaseInfo } = require('@utils/helper');
const httpStatus = require('http-status');

/**
 * createUsage
 * @public
 */
exports.createUsage = async (event) => {
  try {
    const { body } = event;
    const { client, data } = body;
    await writeDatabaseInfo(client, usageFileName, data);
    return OK("OK", { message: "Created Usage successfully" });
  } catch (error) {
    console.log(error);
    return OK("Failure", { message: error.message },  httpStatus[500])
  }
};
