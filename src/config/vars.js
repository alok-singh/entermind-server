const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(process.cwd(), '.env'),
  sample: path.join(process.cwd(), '.env.example')
});

module.exports = {
  env: process.env.NODE_ENV,
  serviceName: 'entermind-server',
  costFileName: 'cost',
  roiFileName: 'roi',
  usageFileName: 'usage',
  categories: ['AI Model Costs', 'Infrastructure & Compute', 'Agent Platform Licenses', 'Talent Costs', 'Data & Integration'],
  http: {
    // Axios configuration to make http call
    timeout: 20000, // Timeout in ms
    responseType: 'json',
    responseEncoding: 'utf8'
  }
};
