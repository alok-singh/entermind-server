const { transactionFileName } = require('@config/vars');
const { randomUUID } = require('crypto');

const fs = require('fs').promises;

const getFileContent = async (filePath) => {
  const data = await fs.readFile(filePath);
  return JSON.parse(data.toString('utf-8'));
};

const writeDatabaseInfo = async (clientId, fileName, content) => {
  const transactionId = randomUUID();
  const filePath = `./data/${clientId}/${fileName}.json`;
  const transactionFilePath = `./data/${clientId}/${transactionFileName}.json`;
  const [data, transaction] = await Promise.all([getFileContent(filePath), getFileContent(transactionFilePath)]);
  data.push(...content.map(item => ({ ...item, transactionId })));
  transaction.push({ timestamp: new Date().toISOString(), type: fileName, transactionId });
  
  await Promise.all([fs.writeFile(filePath, JSON.stringify(data)), fs.writeFile(transactionFilePath, JSON.stringify(transaction))]);
};

const getDatabaseInfo = async (clientId, fileName) => {
  const data = await getFileContent(`./data/${clientId}/${fileName}.json`);
  return data;
};

module.exports = { writeDatabaseInfo, getDatabaseInfo };