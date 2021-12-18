/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

/**
 * Test runner used for Rapid Development.
 */
const _cloneDeep = require('lodash.clonedeep');
const SwaggerParser = require('swagger-parser');
const models = require('./test/models');
const { JsonSchemaManager, JsonSchema7Strategy, JsonSchema201909Strategy, OpenApi3Strategy } = require('./lib');

// Initialize the SchemaManager with global configuration options
const schemaManager = new JsonSchemaManager({
  baseUri: 'https://api.example.com',
  absolutePaths: true,
  disableComments: false,
});

// ------------------------------------------------------------------------------------------------
// Generate a JSON Schema Draft-07 schema for the user model
// ------------------------------------------------------------------------------------------------
const json7strategy = new JsonSchema7Strategy();
const userSchema7 = schemaManager.generate(models.user, json7strategy, {
  // title: 'MyUser',
  // description: 'My Description',
  // renderIdProperty: false,
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

console.log('='.repeat(80))
console.log('JSON Schema Draft-07')
console.log('='.repeat(80))
console.log(JSON.stringify(userSchema7, null, 2));

// console.log(models.user.associations);

// ------------------------------------------------------------------------------------------------
// Generate a JSON Schema Draft-2109-09 schema
// ------------------------------------------------------------------------------------------------
const json201909strategy = new JsonSchema201909Strategy();
const userSchema201909 = schemaManager.generate(models.user, json201909strategy, {
  title: 'MyUser',
  description: 'My Description',
  exclude: [
    '_UUIDV4_',
  ]
});

console.log('='.repeat(80))
console.log('Json Schema 2019-09');
console.log('='.repeat(80))
console.log(JSON.stringify(userSchema201909, null, 2));

// ------------------------------------------------------------------------------------------------
// Generate OpenAPI v3 schema and validate it using SwaggerParser
// ------------------------------------------------------------------------------------------------
const openapi3strategy = new OpenApi3Strategy();
const userSchema = schemaManager.generate(models.user, openapi3strategy, {
  title: 'MyUser',
  description: 'My Description',
  exclude: [
    '_UUIDV4_',
  ]
});

console.log('='.repeat(80))
console.log('OpenAPI v3')
console.log('='.repeat(80))
console.log(userSchema);

// OpenApi requires more than just the model schema for validation so we insert it into the wrapper
const wrapper = require('./test/strategies/openapi-v3-validation-wrapper');

wrapper.components.schemas.user = userSchema;
wrapper.components.schemas.profile = schemaManager.generate(models.profile, openapi3strategy);
wrapper.components.schemas.document = schemaManager.generate(models.document, openapi3strategy);
wrapper.components.schemas.company = schemaManager.generate(models.company, openapi3strategy);
wrapper.components.schemas.friendship = schemaManager.generate(
  models.friendship,
  openapi3strategy,
);

console.log('='.repeat(80))
console.log('OpenAPI validation schema as JSON string:');
console.log('='.repeat(80))
console.log(JSON.stringify(wrapper, null, 2));

console.log('Validating generated full schema against swagger-parser:');

async function validateSchema () {
  try {
    const api = await SwaggerParser.validate(_cloneDeep(wrapper));
    console.log("Wrapper passed OpenAPI validation: API name: %s, Version: %s", api.info.title, api.info.version);
  }
  catch(error) {
    console.error(error);
  }
}

validateSchema();
