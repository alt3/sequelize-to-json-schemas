const SchemaManager = require('./schema-manager');
const JsonSchema6Strategy = require('./strategies/json-schema-v6');
const OpenApi3Strategy = require('./strategies/openapi-v3');

module.exports = {
  SchemaManager,
  JsonSchema6Strategy,
  OpenApi3Strategy,
};
