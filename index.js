/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

/**
 *
 * Test file, used for developing.
 */
const Sequelize = require('sequelize-mock'); // mock Sequelize
const { SchemaManager, JsonSchema6Strategy } = require('./lib');

// sequelize mocking
const sequelize = new Sequelize(); // mocked database connection

const userModel = sequelize.define('user', {
  // id
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // email
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
    jsonSchema: {
      title: 'Email Address',
      exclude: true,
      comment: 'This will be the comment',
      examples: [ // should allow both string and array
        'Example 1',
        'Example 2',
      ],
    },
  },
  // rootFolder
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

// eslint-disable-next-line no-underscore-dangle
console.log(userModel._defaults);

// Initialize the SchemaManager with non-strategy-specific options
const generator = new SchemaManager({
  baseUri: 'https://api.example.com',
});

// Initialize the JsonSchema6Strategy with strategy-specific options
const strategy = new JsonSchema6Strategy({
  woot: 'whatever',
});

// Generate the schema
generator.generate(userModel, strategy);

// debug
// console.log(generator.generate(userModel, strategy));
