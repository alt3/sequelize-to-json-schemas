/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

/**
 * Test runner used for Rapid Development.
 */
const _ = require('lodash'); // limit later to `merge`, `capitalize`, etc.
const SwaggerParser = require('swagger-parser');
const models = require('./test/models');
const { JsonSchemaManager, JsonSchema7Strategy, OpenApi3Strategy } = require('./lib');

// Initialize the SchemaManager with global configuration options
const schemaManager = new JsonSchemaManager({
  baseUri: 'https://api.example.com',
  absolutePaths: true,
  hideComments: false,
});

// Generate a JSON Schema Draft-07 schema for the user model
const json7strategy = new JsonSchema7Strategy();
const schema = schemaManager.generate(models.user, json7strategy, {
  // title: 'MyUser',
  // description: 'My Description',
  // include: [
  //   '_STRING_',
  //   '_STRING_50_',
  // ],
  // exclude: [
  //   '_STRING_',
  //   '_STRING_50_',
  // ]
});

// schema.definitions.profile = schemaManager.generate(models.profile, json7strategy);
// schema.definitions.document = schemaManager.generate(models.document, json7strategy);


console.log('JSON Schema v7:')
// console.log(userSchema);
console.log(JSON.stringify(schema, null, 2));

// console.log(models.user.associations);

// ----------------------------------
// Generate OpenAPI v3 schema
// ----------------------------------
const openapi3strategy = new OpenApi3Strategy();
const userSchema = schemaManager.generate(models.user, openapi3strategy, {
  title: 'MyUser',
  description: 'My Description',
  exclude: [
    '_UUIDV4_',
  ]
});

console.log('OpenAPI v3:');
// console.log(userSchema);

// OpenApi requires more than just the model schema for validation so we insert it into the wrapper
const wrapper = require('./test/strategies/openapi-v3-validation-wrapper');

wrapper.components.schemas.users = userSchema;
wrapper.components.schemas.profiles = schemaManager.generate(models.profile, openapi3strategy);
wrapper.components.schemas.documents = schemaManager.generate(models.document, openapi3strategy);

console.log('Validation schema as JSON string:');
console.log(JSON.stringify(wrapper, null, 2));

console.log('Validating generated full schema against swagger-parser:');

async function validateSchema () {
  try {
    const api = await SwaggerParser.validate(_.cloneDeep(wrapper));
    console.log("Wrapper passed OpenAPI validation: API name: %s, Version: %s", api.info.title, api.info.version);
  }
  catch(error) {
    console.error(error);
  }
}

validateSchema();
