/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

/**
 *
 * Test file, used for developing.
 */

// ============================================================================
// Please note that we do not need an active database connection to test models.
// ============================================================================
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql'
});

const userModel = sequelize.import("./test/models/user.js").build(); // build() required or model will be an untestable `Function` and not a `Sequelize.Model`
// console.log(userModel.rawAttributes);


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
schemaManager.generate(userModel, strategy);

// debug
// console.log(schemaManager.generate(userModel, strategy));
