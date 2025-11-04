const { formatDateMySqlTimestamp } = require('@utils/date');

const getQueryOptimalString = (value, type) => {
  if (!value) {
    return 'NULL';
  }
  return type === 'string' ? `"${value}"` : type === 'date' ? `"${formatDateMySqlTimestamp(value)}"` : value;
};

module.exports = { getQueryOptimalString };