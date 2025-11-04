const { OK, writeRoiToDatabase } = require('@utils/helper');
const httpStatus = require('http-status');

/**
 * createRoi
 * @public
 */
exports.createRoi = async (event) => {
  try {
    const { body } = event;
    const { client, data } = body;
    await writeRoiToDatabase(client, data);
    return OK("OK", { message: "Created ROI successfully" });
  } catch (error) {
    console.log(error);
    return OK("Failure", { message: error.message }, httpStatus[500])
  }
};
