/* eslint-disable no-unused-vars */

const _ = require('lodash'); // limit later to `merge`, `capitalize`, etc.

const Sequelize = require('sequelize');
const SwaggerParser = require('swagger-parser');
const { SchemaManager, OpenApi3Strategy } = require('../../../lib');
const schemaWrapper = require('./schema-validation-wrapper');

const sequelize = new Sequelize({ dialect: 'mysql' });
const userModel = sequelize.import('../../models/user.js'); // without `.build()` so we can manipulate if need be

describe('OpenAPI v3 strategy (#integration)', function() {
  describe('Default options', function() {
    const schemaManager = new SchemaManager();
    const strategy = new OpenApi3Strategy();

    // generate schemae and insert into the wrapper
    const schema = schemaManager.generate(userModel.build(), strategy);
    schemaWrapper.components.schemas.users = schema;

    describe('Properties', function() {
      it("has a version 3 'openapi' property", function() {
        expect(schemaWrapper).toHaveProperty('openapi');
        expect(schemaWrapper.openapi).toMatch(/^3\.\d\.\d/); // 3.n.n
      });

      it("has a non-empty 'schemas' property", function() {
        expect(Object.keys(schemaWrapper.components.schemas).length).toBeGreaterThan(0);
      });
    });

    // describe('Validation', function() {
    //   it('passes schema validation against the Swagger Parser', async () => {
    //     expect.assertions(1);

    //     // https://github.com/APIDevTools/swagger-parser/issues/77
    //     // @todo: enable once fixed, now blocks husky pre-commit hooks
    //     const result = await SwaggerParser.validate(_.cloneDeep(schemaWrapper));

    //     expect(result).toHaveProperty('info');
    //   });
    // });

    // @todo this should be detected by eslint-plugin-jest no-disabled-tests (but is not)
    // test('', function() {
    //   console.log('Does nothing');
    // });
  });
});

/*
describe('foo', () => {});
*/
