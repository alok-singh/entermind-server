const { randomUUID } = require('crypto');
const { createConnectionToDb, closeConnection } = require('./db.pool');
const { roiTableName, roiFields } = require('@config/vars');
const logger = require('@utils/logger');
const { getQueryOptimalString } = require('./dataType.util');

const allFields = [
  { name: 'id', type: 'string', required: true },
  { name: 'transactionId', type: 'string', required: true },
  { name: 'client', type: 'string', required: true },
  ...roiFields
];

const roiModel = {
  async getAllRoi(client) {
    try {
      const connection = await createConnectionToDb();
      const [rows] = await connection.execute(`SELECT * FROM ${roiTableName} WHERE client = "${client}"`);
      await closeConnection(connection);
      return rows;
    } catch (error) {
      logger.error('Error fetching roi:', error);
      throw error;
    }
  },

  async getRoiById(id, client) {
    try {
      const connection = await createConnectionToDb();
      const [rows] = await connection.execute(`SELECT * FROM ${roiTableName} WHERE id = "${id}" and client = "${client}"`);
      await closeConnection(connection);
      return rows[0];
    } catch (error) {
      logger.error(`Error fetching roi with ID ${id}:`, error);
      throw error;
    }
  },

  async createRoi(transactionId, client, costList) {
    const idList = costList.map(() => randomUUID());
    const values = costList.map((row, index) => {
      return `("${idList[index]}", "${transactionId}", "${client}", ${roiFields.map(field => getQueryOptimalString(row[field.name], field.type)).join(', ')})`;
    });
    const query = `INSERT INTO ${roiTableName} (${allFields.map(field => field.name).join(', ')}) VALUES ${values};`;
    try {
      const connection = await createConnectionToDb();
      await connection.execute(query);
      await closeConnection(connection);
      return idList;
    } catch (error) {
      logger.error('Error creating roi:', error);
      throw error;
    }
  },

  async deleteRoi(id, client) {
    try {
      const connection = await createConnectionToDb();
      const [result] = await connection.execute(`DELETE FROM ${roiTableName} WHERE id = "${id}" AND client = "${client}"`);
      await closeConnection(connection);
      return result.affectedRows;
    } catch (error) {
      logger.error(`Error deleting roi with ID ${id}:`, error);
      throw error;
    }
  }
};

module.exports = { roiModel };