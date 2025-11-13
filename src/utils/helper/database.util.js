const { randomUUID } = require('crypto');
const { transactionTypes } = require("@config/vars");
const { costModel } = require("@utils/mysql");
const { transactionModel } = require("@utils/mysql/transaction.modal");
const { roiModel } = require('@utils/mysql/roi.modal');
const { usageModel } = require('@utils/mysql/usage.modal');

const generateTransactionData = (transactionId, transactionType, client) => {
  return { date: new Date(), type: transactionTypes[transactionType], id: transactionId, client };
}

const writeCostToDatabase = async (client, costList) => {
  const transactionId = randomUUID();
  const transactionData = generateTransactionData(transactionId, transactionTypes.COST, client);
  await Promise.all([costModel.createCost(transactionId, client, costList), transactionModel.createTransaction(transactionData)]);
};

const writeRoiToDatabase = async (client, roiList) => {
  const transactionId = randomUUID();
  const transactionData = generateTransactionData(transactionId, transactionTypes.ROI, client);
  await Promise.all([roiModel.createRoi(transactionId, client, roiList), transactionModel.createTransaction(transactionData)]);
};

const writeUsageToDatabase = async (client, usageList) => {
  const transactionId = randomUUID();
  const transactionData = generateTransactionData(transactionId, transactionTypes.USAGE, client);
  await Promise.all([usageModel.createUsage(transactionId, client, usageList), transactionModel.createTransaction(transactionData)]);
};

const getAllCostInfo = async (client, fields) => {
  const result = await costModel.getAllCosts(client, fields);
  return result;
};

const getAllRoiInfo = async (client) => {
  const result = await roiModel.getAllRoi(client);
  return result;
};

const getAllUsageInfo = async (client) => {
  const result = await usageModel.getAllUsage(client);
  return result;
};

const getAllTransactionsInfo = async (client) => {
  const result = await transactionModel.getAllTransactions(client);
  return result;
};


module.exports = { writeCostToDatabase, writeRoiToDatabase, writeUsageToDatabase, getAllCostInfo, getAllRoiInfo, getAllUsageInfo, getAllTransactionsInfo };