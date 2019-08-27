const JsonSchemaManager = require('./schema-manager');
const JsonSchema7Strategy = require('./strategies/json-schema-v7');
const OpenApi3Strategy = require('./strategies/openapi-v3');

module.exports = {
  JsonSchemaManager,
  JsonSchema7Strategy,
  OpenApi3Strategy,
};
