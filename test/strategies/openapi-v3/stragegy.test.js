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

    // ------------------------------------------------------------------------
    // generate schema and insert into the wrapper
    // ------------------------------------------------------------------------
    const modelSchema = schemaManager.generate(userModel.build(), strategy);
    schemaWrapper.components.schemas.users = modelSchema;

    // convenience variable pointing to the model schema
    const modelNode = schemaWrapper.components.schemas.users.properties;

    // ------------------------------------------------------------------------
    // make sure the wrapper is properly generated
    // ------------------------------------------------------------------------
    describe('Tree structure', function() {
      it('has leaf ./openapi with string version 3.n.n', function() {
        expect(schemaWrapper).toHaveProperty('openapi');
        expect(schemaWrapper.openapi).toMatch(/^3\.\d\.\d/); // 3.n.n
      });

      it('it has non-empty container ./components/schemas/users', function() {
        expect(schemaWrapper.components.schemas).toHaveProperty('users');
        expect(Object.keys(schemaWrapper.components.schemas.users).length).toBeGreaterThan(0);
      });
    });

    // ------------------------------------------------------------------------
    // real-time validation of the wrapper and generated model schema
    // ------------------------------------------------------------------------
    describe('Validation', function() {
      it('passes Swagger Parser schema validation', async () => {
        expect.assertions(1);
        // https://github.com/APIDevTools/swagger-parser/issues/77
        // @todo: enable once fixed, now blocks husky pre-commit hooks
        const result = await SwaggerParser.validate(_.cloneDeep(schemaWrapper));
        expect(result).toHaveProperty('info');
      });
    });

    // ------------------------------------------------------------------------
    // _STRING_ALLOWNULL_
    // ------------------------------------------------------------------------
    describe('Attribute _STRING_ALLOWNULL_', function() {
      it("has property 'type' with value 'string'", function() {
        expect(modelNode).toHaveProperty('_STRING_ALLOWNULL_');
        expect(modelNode._STRING_ALLOWNULL_).toHaveProperty('type');
        expect(modelNode._STRING_ALLOWNULL_.type).toEqual('string');
      });

      it("has property 'nullable' with value 'true'", function() {
        expect(modelNode._STRING_ALLOWNULL_).toHaveProperty('nullable');
        expect(modelNode._STRING_ALLOWNULL_.nullable).toBe(true);
      });
    });

    // @todo this should be detected by eslint-plugin-jest no-disabled-tests (but is not)
    // test('', function() {
    //   console.log('Does nothing');
    // });

    // @todo add this to the test suite, it should throw an exception
    // Model.rawAttributes._FAKE_TYPE_ = {
    //   type: "FAKETYPE"
    // };
  });
});

/*
describe('foo', () => {});
*/
