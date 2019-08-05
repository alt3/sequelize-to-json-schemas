/* eslint-disable import/no-extraneous-dependencies */

/**
 *
 * Test file, used for developing.
 */
const Sequelize = require('sequelize-mock'); // mock Sequelize
const JsonSchemaGenerator = require('./lib/json-schema-generator'); // uses `index.js` like probably npm does
const JsonSchema6Strategy = require('./lib/strategies/json-schema-v6');
// const OpenApi3Strategy = require('./lib/strategies/openapi-v3');

// sequelize mocking
const sequelize = new Sequelize(); // mocked database connection

const userModel = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  rootFolder: {
    type: Sequelize.UUID,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

// Initialize the JsonSchemaGenerator with non-strategy-specific options
const generator = new JsonSchemaGenerator({
  baseUri: 'https://api.example.com',
});

// Initialize the JsonSchema6Strategy with strategy-specific options
const strategy = new JsonSchema6Strategy({
  woot: 'whatever',
});

// Generate the schema
generator.generate(userModel, strategy);

// debug
console.log(generator.generate(userModel, strategy));
