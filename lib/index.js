const JsonSchemaManager = require('./schema-manager');
const JsonSchema7Strategy = require('./strategies/json-schema-v7');
const JsonSchema201909Strategy = require('./strategies/json-schema-v2019-09');
const OpenApi3Strategy = require('./strategies/openapi-v3');

module.exports = {
  JsonSchemaManager,
  JsonSchema7Strategy,
  JsonSchema201909Strategy,
  OpenApi3Strategy,
};
