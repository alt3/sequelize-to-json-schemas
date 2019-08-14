/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

/**
 * Test runner used for Rapid Development.
 */

// ============================================================================
// Please note that we do not need an active database connection to test models.
// ============================================================================
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql'
});

// we MUST chain build() or model will be an untestable `Function` instead of a real `Sequelize.Model`
const userModel = sequelize.import("./test/models/user.js").build();

// ============================================================================
// Test the SchemaManager and strategies
// ============================================================================
const { SchemaManager, JsonSchema6Strategy } = require('./lib');

// Initialize the SchemaManager with non-strategy-specific options
const schemaManager = new SchemaManager({
  baseUri: 'https://api.example.com',
});

// Initialize the JsonSchema6Strategy with strategy-specific options
const strategy = new JsonSchema6Strategy({
  woot: 'whatever',
});

// Generate the schema
const result = schemaManager.generate(userModel, strategy);

// debug result produced by the manager (work in progress)
console.log(result);
