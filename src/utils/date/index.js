/**
 * @param {*} date String 
 * @returns String in format 'YYYY-MM-DD hh:mm:ss'
 */
const formatDateMySqlTimestamp = (date) => {
  return date.toISOString().split('.').shift().replace('T', ' ');
};

module.exports = { formatDateMySqlTimestamp };