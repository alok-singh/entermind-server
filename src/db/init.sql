CREATE DATABASE entermind;

USE entermind;

CREATE TABLE cost (
	id VARCHAR(36) PRIMARY KEY,
	transactionId VARCHAR(36) NOT NULL,
  client VARCHAR(100) NOT NULL,
  industry VARCHAR(100),
  category VARCHAR(100),
  subcategory VARCHAR(100),
  description VARCHAR(100),
  costType VARCHAR(100),
  vendor VARCHAR(100),
  department VARCHAR(100),
  modelService VARCHAR(100),
  cloudRegion VARCHAR(100),
  environment VARCHAR(100),
  usageUnit VARCHAR(100),
  quantity VARCHAR(100),
  unitCost DOUBLE, 
  monthlyCost DOUBLE, 
  annualizedCost DOUBLE, 
  billingAccount VARCHAR(100),
  contractId VARCHAR(100),
  startDate TIMESTAMP NOT NULL, 
  endDate TIMESTAMP NOT NULL, 
  owner VARCHAR(100),
  tags VARCHAR(100),
  notes VARCHAR(100),
);

CREATE TABLE roi (
  id VARCHAR(36) PRIMARY KEY,
	transactionId VARCHAR(36) NOT NULL,
  industry VARCHAR(50),
  project VARCHAR(50),
  aiCategory VARCHAR(50),
  objective VARCHAR(50),
  baselineMetric VARCHAR(50),
  baselineValue DOUBLE,
  postAiValue DOUBLE,
  improvement DOUBLE,
  annualizedBenefit DOUBLE,
  annualizedCost DOUBLE,
  benefitDriver VARCHAR(50),
  linkedCostId VARCHAR(50),
  paybackPeriod VARCHAR(50),
  roi DOUBLE,
  npv VARCHAR(50),
  irr VARCHAR(50),
  strategicPillar VARCHAR(50),
  businessUnit VARCHAR(50),
  owner VARCHAR(50),
  status VARCHAR(50),
  validationSource VARCHAR(50),
  notes VARCHAR(50),
);

CREATE TABLE resourceUsage (
	id VARCHAR(36) PRIMARY KEY,
	transactionId VARCHAR(36) NOT NULL,
  industry VARCHAR(100),
  systemName VARCHAR(100),
  functionName VARCHAR(100),
  model VARCHAR(100),
  version VARCHAR(100),
  region VARCHAR(100),
  usageType VARCHAR(100),
  metric VARCHAR(100),
  dailyAvg DOUBLE,
  monthlyTotal DOUBLE,
  unitCost DOUBLE,
  monthlyCost DOUBLE,
  linkedCostId VARCHAR(36),
  linkedRoiId VARCHAR(36),
  humanHours DOUBLE,
  autoResolution DOUBLE,
  errorRate DOUBLE,
  downtime DOUBLE,
  owner VARCHAR(100),
  department VARCHAR(100),
  notes VARCHAR(100)
);

CREATE TABLE transactions (
	id VARCHAR(36) PRIMARY KEY,
  client VARCHAR(36) NOT NULL,
  date TIMESTAMP NOT NULL,
	type ENUM('COST', 'ROI', 'USAGE')
);

ALTER TABLE roi 
ADD COLUMN client VARCHAR(36) NOT NULL;

ALTER TABLE resourceUsage 
ADD COLUMN client VARCHAR(36) NOT NULL;


DROP TABLE cost;
DROP TABLE roi;
DROP TABLE resourceUsage;

INSERT INTO cost (id, date, client, vendor, category, subcategory, amount, units, project, tags, notes, transactionId) VALUES 
("e7042fd3-80cc-498b-b7db-3608c0282131", "2025-11-03 13:32:25", "client-1", "Azure", "Infrastructure & Compute", "Abc.com", 10.12, "units", "project", "tags", "notes", "89c42361-7218-4526-9d0a-f67310d9c314");

SELECT * FROM cost;
TRUNCATE TABLE cost;