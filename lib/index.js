const SchemaManager = require('./schema-manager');
const JsonSchema7Strategy = require('./strategies/json-schema-v7');
const OpenApi3Strategy = require('./strategies/openapi-v3');

module.exports = {
  SchemaManager,
  JsonSchema7Strategy,
  OpenApi3Strategy,
};
