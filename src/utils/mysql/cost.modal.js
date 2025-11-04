const { randomUUID } = require('crypto');
const { createConnectionToDb, closeConnection } = require('./db.pool');
const { costTableName, costFields } = require('@config/vars');
const logger = require('@utils/logger');
const { getQueryOptimalString } = require('./dataType.util');

const allFields = [
  { name: 'id', type: 'string', required: true },
  { name: 'transactionId', type: 'string', required: true },
  { name: 'client', type: 'string', required: true },
  ...costFields
];

const costModel = {
  async getAllCosts(client) {
    try {
      const connection = await createConnectionToDb();
      const [rows] = await connection.execute(`SELECT * FROM ${costTableName} WHERE client = "${client}" ORDER BY startDate DESC`);
      await closeConnection(connection);
      return rows;
    } catch (error) {
      logger.error('Error fetching costs:', error);
      throw error;
    }
  },

  async getCostById(id, client) {
    try {
      const connection = await createConnectionToDb();
      const [rows] = await connection.execute(`SELECT * FROM ${costTableName} WHERE id = "${id}" AND client = "${client}"`);
      await closeConnection(connection);
      return rows[0];
    } catch (error) {
      logger.error(`Error fetching cost with ID ${id}:`, error);
      throw error;
    }
  },

  async createCost(transactionId, client, costList) {
    const idList = costList.map(() => randomUUID());
    const values = costList.map((row, index) => {
      return `("${idList[index]}", "${transactionId}", "${client}", ${costFields.map(field => getQueryOptimalString(row[field.name], field.type)).join(', ')})`;
    });
    const query = `INSERT INTO ${costTableName} (${allFields.map(field => field.name).join(', ')}) VALUES ${values};`;
    try {
      const connection = await createConnectionToDb();
      await connection.execute(query);
      await closeConnection(connection);
      return idList;
    } catch (error) {
      logger.error('Error creating cost:', error);
      throw error;
    }
  },

  async deleteCost(id, client) {
    try {
      const connection = await createConnectionToDb();
      const [result] = await connection.execute(`DELETE FROM ${costTableName} WHERE id = "${id}" AND client = "${client}"`);
      await closeConnection(connection);
      return result.affectedRows;
    } catch (error) {
      logger.error(`Error deleting cost with ID ${id}:`, error);
      throw error;
    }
  }
};

module.exports = { costModel };