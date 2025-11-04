const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(process.cwd(), '.env'),
  sample: path.join(process.cwd(), '.env.example')
});

module.exports = {
  env: process.env.NODE_ENV,
  serviceName: 'entermind-server',
  costTableName: 'cost',
  costFields: [
    { name: 'industry', type: 'string', required: false },
    { name: 'category', type: 'string', required: false },
    { name: 'subcategory', type: 'string', required: false },
    { name: 'description', type: 'string', required: false },
    { name: 'costType', type: 'string', required: false },
    { name: 'vendor', type: 'string', required: false },
    { name: 'department', type: 'string', required: false },
    { name: 'modelService', type: 'string', required: false },
    { name: 'cloudRegion', type: 'string', required: false },
    { name: 'environment', type: 'string', required: false },
    { name: 'usageUnit', type: 'string', required: false },
    { name: 'quantity', type: 'string', required: false },
    { name: 'unitCost', type: 'number', required: false },
    { name: 'monthlyCost', type: 'number', required: false },
    { name: 'annualizedCost', type: 'number', required: false },
    { name: 'billingAccount', type: 'string', required: false },
    { name: 'contractId', type: 'string', required: false },
    { name: 'startDate', type: 'date', required: true },
    { name: 'endDate', type: 'date', required: true },
    { name: 'owner', type: 'string', required: false },
    { name: 'tags', type: 'string', required: false },
    { name: 'notes', type: 'string', required: false }
  ],
  roiTableName: 'roi',
  roiFields: [
    { name: "industry", type: "string", required: false },
    { name: "project", type: "string", required: false },
    { name: "aiCategory", type: "string", required: false },
    { name: "objective", type: "string", required: false },
    { name: "baselineMetric", type: "string", required: false },
    { name: "baselineValue", type: "number", required: false },
    { name: "postAiValue", type: "number", required: false },
    { name: "improvement", type: "number", required: false },
    { name: "annualizedBenefit", type: "number", required: false },
    { name: "annualizedCost", type: "number", required: false },
    { name: "benefitDriver", type: "string", required: false },
    { name: "linkedCostId", type: "string", required: false },
    { name: "paybackPeriod", type: "string", required: false },
    { name: "roi", type: "number", required: false },
    { name: "npv", type: "string", required: false },
    { name: "irr", type: "string", required: false },
    { name: "strategicPillar", type: "string", required: false },
    { name: "businessUnit", type: "string", required: false },
    { name: "owner", type: "string", required: false },
    { name: "status", type: "string", required: false },
    { name: "validationSource", type: "string", required: false },
    { name: "notes", type: "string", required: false },
  ],
  usageTableName: 'resourceUsage',
  usageFields: [
    { name: 'industry', type: 'string', required: false },
    { name: 'systemName', type: 'string', required: false },
    { name: 'functionName', type: 'string', required: false },
    { name: 'model', type: 'string', required: false },
    { name: 'version', type: 'string', required: false },
    { name: 'region', type: 'string', required: false },
    { name: 'usageType', type: 'string', required: false },
    { name: 'metric', type: 'string', required: false },
    { name: 'dailyAvg', type: 'number', required: false },
    { name: 'monthlyTotal', type: 'number', required: false },
    { name: 'unitCost', type: 'number', required: false },
    { name: 'monthlyCost', type: 'number', required: false },
    { name: 'linkedCostId', type: 'string', required: false },
    { name: 'linkedRoiId', type: 'string', required: false },
    { name: 'humanHours', type: 'number', required: false },
    { name: 'autoResolution', type: 'number', required: false },
    { name: 'errorRate', type: 'number', required: false },
    { name: 'downtime', type: 'number', required: false },
    { name: 'owner', type: 'string', required: false },
    { name: 'department', type: 'string', required: false },
    { name: 'notes', type: 'string', required: false },
  ],
  transactionTableName: 'transactions',
  transactionFields: [
    { name: 'id', type: 'string' },
    { name: 'date', type: 'date' },
    { name: 'client', type: 'string' },
    { name: 'type', type: 'string' }
  ],
  transactionTypes: {
    COST: 'COST',
    ROI: 'ROI',
    USAGE: 'USAGE',
  },
  http: {
    // Axios configuration to make http call
    timeout: 20000, // Timeout in ms
    responseType: 'json',
    responseEncoding: 'utf8'
  }
};
