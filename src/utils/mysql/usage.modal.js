const { randomUUID } = require('crypto');
const { createConnectionToDb, closeConnection } = require('./db.pool');
const { usageTableName, usageFields } = require('@config/vars');
const logger = require('@utils/logger');
const { getQueryOptimalString } = require('./dataType.util');

const allFields = [
  { name: 'id', type: 'string', required: true },
  { name: 'transactionId', type: 'string', required: true },
  { name: 'client', type: 'string', required: true },
  ...usageFields
];

const usageModel = {
  async getAllUsage(client) {
    try {
      const connection = await createConnectionToDb();
      const [rows] = await connection.execute(`SELECT * FROM ${usageTableName} WHERE client = "${client}"`);
      await closeConnection(connection);
      return rows;
    } catch (error) {
      logger.error('Error fetching usage:', error);
      throw error;
    }
  },

  async getUsageById(id, client) {
    try {
      const connection = await createConnectionToDb();
      const [rows] = await connection.execute(`SELECT * FROM ${usageTableName} WHERE id = "${id}" and client = "${client}"`);
      await closeConnection(connection);
      return rows[0];
    } catch (error) {
      logger.error(`Error fetching usage with ID ${id}:`, error);
      throw error;
    }
  },

  async createUsage(transactionId, client, list) {
    const idList = list.map(() => randomUUID());
    const values = list.map((row, index) => {
      return `("${idList[index]}", "${transactionId}", "${client}", ${usageFields.map(field => getQueryOptimalString(row[field.name], field.type)).join(', ')})`;
    });
    const query = `INSERT INTO ${usageTableName} (${allFields.map(field => field.name).join(', ')}) VALUES ${values};`;
    try {
      const connection = await createConnectionToDb();
      await connection.execute(query);
      await closeConnection(connection);
      return idList;
    } catch (error) {
      logger.error('Error creating usage:', error);
      throw error;
    }
  },

  async deleteUsage(id, client) {
    try {
      const connection = await createConnectionToDb();
      const [result] = await connection.execute(`DELETE FROM ${usageTableName} WHERE id = "${id}" AND client = "${client}"`);
      await closeConnection(connection);
      return result.affectedRows;
    } catch (error) {
      logger.error(`Error deleting usage with ID ${id}:`, error);
      throw error;
    }
  }
};

module.exports = { usageModel };