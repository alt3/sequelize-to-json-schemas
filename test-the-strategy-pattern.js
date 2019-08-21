/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

/**
 * Test runner used for Rapid Development.
 */
const _ = require('lodash'); // limit later to `merge`, `capitalize`, etc.
const SwaggerParser = require('swagger-parser');
const models = require('./test/models');
const { SchemaManager, JsonSchema7Strategy, OpenApi3Strategy } = require('./lib');

// Initialize the SchemaManager with global configuration options
const schemaManager = new SchemaManager({
  baseUri: 'https://api.example.com',
  absolutePaths: true,
});

// Generate a JSON Schema Draft-07 schema for the user model
const json7strategy = new JsonSchema7Strategy();
let userSchema = schemaManager.generate(models.user, json7strategy, {
  title: 'MyUser',
  description: 'My Description',
  // include: [
  //   '_STRING_',
  //   '_STRING_50_',
  // ],
  // exclude: [
  //   '_STRING_',
  //   '_STRING_50_',
  // ]
});

console.log('JSON Schema v7:')
// console.log(userSchema);
console.log(JSON.stringify(userSchema, null, 2));

// console.log(models.user.associations);

// ----------------------------------
// Generate OpenAPI v3 schema
// ----------------------------------
const openapi3strategy = new OpenApi3Strategy();
userSchema = schemaManager.generate(models.user, openapi3strategy, {
  title: 'MyUser',
  description: 'My Description',
  exclude: [
    '_UUIDV4_',
  ]
});

console.log('OpenAPI v3:');
// console.log(userSchema);

// OpenApi requires more than just the model schema for validation so we insert it into the wrapper
const validationSchema = require('./test/strategies/openapi-v3-validation-wrapper');

validationSchema.components.schemas.users = userSchema;
console.log('Validation schema object:');
console.log(validationSchema);

console.log('Validation schema as JSON string:');
console.log(JSON.stringify(validationSchema, null, 2));

console.log('Validating generated full schema against swagger-parser:');

async function validateSchema () {
  try {
    const api = await SwaggerParser.validate(_.cloneDeep(validationSchema));
    console.log("API name: %s, Version: %s", api.info.title, api.info.version);
  }
  catch(error) {
    console.error(error);
  }
}

validateSchema();
