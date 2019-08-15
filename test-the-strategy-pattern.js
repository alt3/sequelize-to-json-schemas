/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

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
const { SchemaManager, JsonSchema6Strategy, OpenApi3Strategy } = require('./lib');

// Initialize the SchemaManager with non-strategy-specific options
const schemaManager = new SchemaManager({
  baseUri: 'https://api.example.com',
});

// Generate JSON Schema v6 schema
const json6strategy = new JsonSchema6Strategy();
let schema = schemaManager.generate(userModel, json6strategy);
console.log('JSON Schema v6:')
console.log(schema);

// Generate OpenAPI v3 schema
const openapi3strategy = new OpenApi3Strategy();
schema = schemaManager.generate(userModel, openapi3strategy);
console.log('OpenAPI v3:');
console.log(schema);

