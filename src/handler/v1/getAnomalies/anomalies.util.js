const { average } = require('simple-statistics');

/**
 * 
 * @param {string} name 
 * @returns 
 */
const cleanString = (name) => {
  return name.replace(/'/g, '');
}

/**
 * @param {Array<{industry: string, category: string, subcategory: string, monthlyCost: number, startDate: string, endDate: string}>} records 
 * @returns 
 */
const computeCostAnomalies = (records) => {
  // Group costs by category
  const categoryCosts = records.reduce((acc, row) => {
    const category = cleanString(row.category);
    const cost = row.monthlyCost ? parseFloat(row.monthlyCost) : 0;

    acc[category] = acc[category] ? acc[category] : [];
    acc[category].push(cost);
    return acc;
  }, {});

  // Compute medians
  const categoryMedians = Object.keys(categoryCosts).reduce((acc, category) => {
    acc[category] = average(categoryCosts[category]);
    return acc;
  }, {});

  console.log({ categoryCosts, categoryMedians });

  // Detect anomalies
  return records.reduce((list, row) => {
    const category = cleanString(row.category);
    const actualCost = parseFloat(row.monthlyCost);
    const normalCost = categoryMedians[category];
    if (normalCost !== 0 && actualCost > normalCost * 2) {
      list.push({
        category,
        startDate: row.startDate,
        priority: Math.floor(actualCost / normalCost) > 5 ? 'high' : 'info',
        title: `High Monthly Cost in ${category}`,
        description: `The monthly cost of ${actualCost.toFixed(2)} is significantly higher than the normal value of ${normalCost.toFixed(2)} for category '${category}'.`,
        normalValue: parseFloat(normalCost.toFixed(2)),
        actualValue: parseFloat(actualCost.toFixed(2)),
        additionalMonthlyCost: parseFloat((actualCost - normalCost).toFixed(2)),
        recommendation: `Review the cost allocation for '${category}' starting ${row.startDate} and validate if the expense is justified.`
      });
    }
    return list;
  }, []);
}

module.exports = { computeCostAnomalies };