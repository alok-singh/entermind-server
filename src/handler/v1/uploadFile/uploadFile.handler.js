const { OK } = require('@utils/helper');
const { parseMultipartForm } = require('@utils/parseMultipartFormdata');
const { parseAwsBill } = require('@utils/pdf');
const httpStatus = require('http-status');

/**
 * createRoi
 * @public
 */
exports.uploadFile = async (event) => {
  try {
    const data = await parseMultipartForm(event);
    const { queryStringParameters: { fileType } } = event;
    console.log(data.files[0]);
    if (fileType === 'AWS_BILL') {
      const result = await Promise.all(data.files.map(file => parseAwsBill(file.buffer)));
      return OK("OK", result);
    }

    return OK("OK", { message: "Uploaded" });
  } catch (error) {
    console.log(error);
    return OK("Failure", { message: error.parserError }, httpStatus[500])
  }
};
