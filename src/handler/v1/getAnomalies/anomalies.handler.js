const { OK, getAllCostInfo } = require('@utils/helper');
const logger = require('@utils/logger');
const { computeCostAnomalies } = require('./anomalies.util');

exports.getAnomalies = async (event) => {
  const { type, client } = event.queryStringParameters;

  // on the basis of category
  const fields = ['industry', 'category', 'subcategory', 'monthlyCost', 'startDate', 'endDate'];
  const result = await getAllCostInfo(client, fields.join(','));
  const anomalies = computeCostAnomalies(result);

  return OK('Success', {
    message: anomalies.length ? `Found ${anomalies.length} ${anomalies.length > 0 ? 'Anomalies' : 'Anomaly'}` : 'No Anomalies found!',
    data: anomalies,
  });
};
