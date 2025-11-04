const { createConnectionToDb, closeConnection } = require('./db.pool');
const { transactionTableName, transactionFields } = require('@config/vars');
const logger = require('@utils/logger');
const { getQueryOptimalString } = require('./dataType.util');

const transactionModel = {
  async getAllTransactions(client) {
    try {
      const connection = await createConnectionToDb();
      const [rows] = await connection.execute(`SELECT * FROM transactions WHERE client = "${client}"`);
      await closeConnection(connection);
      return rows;
    } catch (error) {
      logger.error('Error fetching transactions:', error);
      throw error;
    }
  },

  async getTransactionById(client, id) {
    try {
      const connection = await createConnectionToDb();
      const [rows] = await connection.execute(`SELECT * FROM transactions WHERE id = "${id}" and client = "${client}"`);
      await closeConnection(connection);
      return rows[0];
    } catch (error) {
      logger.error(`Error fetching transaction with ID ${id}:`, error);
      throw error;
    }
  },

  async createTransaction(data) {
    const values = transactionFields.map(field => getQueryOptimalString(data[field.name], field.type)).join(', ');
    const query = `INSERT INTO ${transactionTableName} (${transactionFields.map(field => field.name).join(', ')}) VALUES (${values})`;
    try {
      const connection = await createConnectionToDb();
      await connection.execute(query);
      await closeConnection(connection);
    } catch (error) {
      logger.error('Error creating transaction:', error);
      throw error;
    }
  },

  async deleteTransaction(id) {
    try {
      const connection = await createConnectionToDb();
      const [result] = await connection.execute(`DELETE FROM transactions WHERE client = "${client}" and id = "${id}"`);
      await closeConnection(connection);
      return result.affectedRows;
    } catch (error) {
      logger.error(`Error deleting transaction with ID ${id}:`, error);
      throw error;
    }
  }
};

module.exports = { transactionModel };