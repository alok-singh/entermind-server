const Busboy = require("busboy");

/**
 * Parse multipart/form-data from an AWS Lambda event
 * @param {Object} event - API Gateway event
 * @returns {Promise<{ fields: Object, files: Object[] }>}
 */
const parseMultipartForm = (event) => {
  return new Promise((resolve, reject) => {
    const headers = event.headers;
    const contentType = headers["content-type"] || headers["Content-Type"];
    const busboy = Busboy({ headers: { "content-type": contentType } });

    const fields = {};
    const files = [];

    busboy.on("field", (fieldname, val) => {
      fields[fieldname] = val;
    });

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const chunks = [];
      file.on("data", (chunk) => chunks.push(chunk));
      file.on("end", () => {
        files.push({ fieldname, filename, encoding, mimetype, buffer: Buffer.concat(chunks) });
      });
    });

    busboy.on("finish", () => resolve({ fields, files }));
    busboy.on("error", (err) => reject(err));

    // Convert API Gateway body to stream
    const body = Buffer.from(event.body, event.isBase64Encoded ? "base64" : "utf8");
    busboy.end(body);
  });
}

module.exports = { parseMultipartForm };