const fs = require('fs').promises;

const getFileContent = async (filePath) => {
  const data = await fs.readFile(filePath);
  return JSON.parse(data.toString('utf-8'));
};

const writeDatabaseInfo = async (clientId, fileName, content) => {
  const filePath = `./data/${clientId}/${fileName}.json`;
  const data = await getFileContent(filePath);
  data.push(...content);
  await fs.writeFile(filePath, JSON.stringify(data));
};

const getDatabaseInfo = async (clientId, fileName) => {
  const data = await getFileContent(`./data/${clientId}/${fileName}.json`);
  return data;
};

module.exports = { writeDatabaseInfo, getDatabaseInfo };