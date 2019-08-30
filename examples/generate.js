/**
 * This script generates markdown files in /docs/sample-output containing fully
 * generated schemas for each strategy (so they can be included in the README).
 */

/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const fileSystem = require('fs');
const moment = require('moment');
const models = require('../test/models');
const { JsonSchemaManager, JsonSchema7Strategy, OpenApi3Strategy } = require('../lib');

const targetFolder = './examples/';

const schemaManager = new JsonSchemaManager({
  baseUri: 'https://api.example.com',
  absolutePaths: true,
  disableComments: false,
});

// ----------------------------------------------------------------------------
// JSON Schema Draft-07
// ----------------------------------------------------------------------------
let userSchema = schemaManager.generate(models.user, new JsonSchema7Strategy(), {
  title: 'Custom Title',
  description: 'Custom Description',
});

let profileSchema = schemaManager.generate(models.profile, new JsonSchema7Strategy());
let documentSchema = schemaManager.generate(models.document, new JsonSchema7Strategy());
let fullSchema = {
  $schema: 'https://json-schema.org/draft-07/schema#',
  definitions: {
    users: userSchema,
    profiles: profileSchema,
    documents: documentSchema,
  },
};

let markdown = `# JSON Schema Draft-07

These schemas were automatically generated on ${moment().format('YYYY-MM-DD')}
using [these Sequelize models](../test/models) and the most recent version of
sequelize-to-json-schemas. To verify that these are all valid schemas use:

- [JSON Schema Validator](https://www.jsonschemavalidator.net/)
- [ajv](https://github.com/epoberezkin/ajv)

## User Model

<!-- prettier-ignore-start -->
\`\`\`json
${JSON.stringify(userSchema, null, 2)}
\`\`\`
<!-- prettier-ignore-end -->

## Profile Model

<!-- prettier-ignore-start -->
\`\`\`json
${JSON.stringify(profileSchema, null, 2)}
\`\`\`
<!-- prettier-ignore-end -->

## Document Model

<!-- prettier-ignore-start -->
\`\`\`json
${JSON.stringify(documentSchema, null, 2)}
\`\`\`
<!-- prettier-ignore-end -->

## Full Schema

Please note that sequelize-to-json-schemas does NOT generate full schemas. This is just an
example of how to integrate the generated model schemas into a full JSON Schema Draft-07
document (by adding model schemas to \`definitions\`).

<!-- prettier-ignore-start -->
\`\`\`json
${JSON.stringify(fullSchema, null, 2)}
\`\`\`
<!-- prettier-ignore-end -->
`;

fileSystem.writeFile(`${targetFolder}json-schema-v7.md`, markdown, function check(error) {
  if (error) {
    throw error;
  }
});

console.log('Succesfully generated markdown sample output for JSON Schema Draft-07');

// ----------------------------------------------------------------------------
// OpenAPI 3.0
// ----------------------------------------------------------------------------
const openapi3strategy = new OpenApi3Strategy();
userSchema = schemaManager.generate(models.user, openapi3strategy, {
  title: 'Custom Title',
  description: 'Custom Description',
});

profileSchema = schemaManager.generate(models.profile, openapi3strategy);
documentSchema = schemaManager.generate(models.document, openapi3strategy);

fullSchema = require('../test/strategies/openapi-v3-validation-wrapper');

fullSchema.components.schemas = {
  users: userSchema,
  profiles: profileSchema,
  documents: documentSchema,
};

markdown = `# OpenAPI 3.0

These schemas were automatically generated on ${moment().format('YYYY-MM-DD')}
using [these Sequelize models](../test/models/) and the most recent version of
sequelize-to-json-schemas. To verify that these are all valid schemas use:

- [Swagger Editor](https://editor.swagger.io/)
- [Online Swagger & OpenAPI Validator](https://apidevtools.org/swagger-parser/online)
- [Swagger Parser](https://github.com/swagger-api/swagger-parser)

## User Model

<!-- prettier-ignore-start -->
\`\`\`json
${JSON.stringify(userSchema, null, 2)}
\`\`\`
<!-- prettier-ignore-end -->

## Profile Model

<!-- prettier-ignore-start -->
\`\`\`json
${JSON.stringify(profileSchema, null, 2)}
\`\`\`
<!-- prettier-ignore-end -->

## Document Model

<!-- prettier-ignore-start -->
\`\`\`json
${JSON.stringify(documentSchema, null, 2)}
\`\`\`
<!-- prettier-ignore-end -->

## Full Schema

Please note that sequelize-to-json-schemas does NOT generate full schemas. This is just an
example of how to integrate the generated model schemas into a full OpenAPI 3.0 document
(by adding model schemas to \`components.schemas\`).

<!-- prettier-ignore-start -->
\`\`\`json
${JSON.stringify(fullSchema, null, 2)}
\`\`\`
<!-- prettier-ignore-end -->
`;

fileSystem.writeFile(`${targetFolder}openapi-v3.md`, markdown, function check(error) {
  if (error) {
    throw error;
  }
});

console.log('Succesfully generated markdown sample output for OpenAPI 3.0');
