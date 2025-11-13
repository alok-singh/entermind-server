require('module-alias/register');

// define all the routes/handlers
const helloRoute = require('./handler/v1/hello');
const getCost = require('./handler/v1/getCost');
const createCost = require('./handler/v1/createCost');
const createRoi = require('./handler/v1/createRoi');
const createUsage = require('./handler/v1/createUsage');
const getRoi = require('./handler/v1/getRoi');
const getUsage = require('./handler/v1/getUsage');
const getTransaction = require('./handler/v1/getTransaction');
const uploadFile = require('./handler/v1/uploadFile');
const getAnomalies = require('./handler/v1/getAnomalies');

module.exports = {
  hello: helloRoute,
  getCost: getCost,
  createCost: createCost,
  createRoi: createRoi,
  createUsage: createUsage,
  getRoi: getRoi,
  getUsage: getUsage,
  getTransaction: getTransaction,
  uploadFile: uploadFile,
  getAnomalies: getAnomalies
};
