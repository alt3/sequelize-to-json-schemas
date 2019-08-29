/**
 * This script generates markdown files in /docs/sample-output containing fully
 * generated schemas for each strategy (so they can be included in the README).
 */

 /* eslint-disable no-console */

 const fileSystem = require('fs');
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
 const json7schema = {
   $schema: "https://json-schema.org/draft-07/schema#",
   definitions: {}
 }

 json7schema.definitions.users = schemaManager.generate(models.user, new JsonSchema7Strategy({
   title: 'MyUser',
   description: 'My Description',
 }));

 json7schema.definitions.profiles = schemaManager.generate(models.profile, new JsonSchema7Strategy());
 json7schema.definitions.documents = schemaManager.generate(models.document, new JsonSchema7Strategy());

 let markdown = `### JSON Schema Draft-07

 Please note that sequelize-to-json-schemas only generated the content of \`definitions\`.

 \`\`\`json
 ${JSON.stringify(json7schema, null, 2)}
 \`\`\`
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
 const openApi3wrapper = require('../test/strategies/openapi-v3-validation-wrapper');

 const openapi3strategy = new OpenApi3Strategy();
 const userSchema = schemaManager.generate(models.user, openapi3strategy, {
   title: 'MyUser',
   description: 'My Description',
 });

 openApi3wrapper.components.schemas.users = userSchema;
 openApi3wrapper.components.schemas.profiles = schemaManager.generate(models.profile, openapi3strategy);
 openApi3wrapper.components.schemas.documents = schemaManager.generate(models.document, openapi3strategy);

 markdown = `### OpenAPI 3.0

 Please note that sequelize-to-json-schemas only generated the content of \`components.schemas\`.

 \`\`\`json
 ${JSON.stringify(openApi3wrapper, null, 2)}
 \`\`\`
 `;

 fileSystem.writeFile(`${targetFolder}openapi-v3.md`, markdown, function check(error) {
   if (error) {
     throw error;
   }
 });

 console.log('Succesfully generated markdown sample output for OpenAPI 3.0');

 // ----------------------------------------------------------------------------
 // index.md
 // ----------------------------------------------------------------------------

 markdown = `# Examples

 Sample output as generated with the latest version of sequelize-to-json-schemas:

 - [JSON Schema Draft-07](json-schema-v7.md)
 - [OpenAPI 3.0](openapi-v3.md)
 `

 fileSystem.writeFile(`${targetFolder}README.md`, markdown, function check(error) {
   if (error) {
     throw error;
   }
 });

 console.log('Succesfully generated markdown index for sample outputs');
