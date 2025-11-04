const { OK, writeUsageToDatabase } = require('@utils/helper');
const httpStatus = require('http-status');

/**
 * createUsage
 * @public
 */
exports.createUsage = async (event) => {
  try {
    const { body } = event;
    const { client, data } = body;
    await writeUsageToDatabase(client, data);
    return OK("OK", { message: "Created Usage successfully" });
  } catch (error) {
    return OK("Failure", { message: error.message }, httpStatus[500])
  }
};
