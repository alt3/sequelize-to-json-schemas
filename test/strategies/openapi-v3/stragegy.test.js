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

      it('has non-empty container ./components/schemas/users', function() {
        expect(schemaWrapper.components.schemas).toHaveProperty('users');
        expect(Object.keys(schemaWrapper.components.schemas.users).length).toBeGreaterThan(0);
      });
    });

    // ------------------------------------------------------------------------
    // make sure sequelize attributes are rendered as expected
    // ------------------------------------------------------------------------
    describe('Sequelize attributes', function() {
      describe('_STRING_ALLOWNULL_', function() {
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
    });

    // ------------------------------------------------------------------------
    // make sure user-definable attribute properties are rendered as expected
    // ------------------------------------------------------------------------
    describe('User definable properties', function() {
      describe('_USER_DEFINED_PROPERTIES_', function() {
        it("has property 'description' of type 'string'", function() {
          expect(modelNode).toHaveProperty('_USER_DEFINED_PROPERTIES_');
          expect(modelNode._USER_DEFINED_PROPERTIES_).toHaveProperty('description');
          expect(typeof modelNode._USER_DEFINED_PROPERTIES_.description).toBe('string');
        });

        it("has property 'example' of type 'array'", function() {
          expect(modelNode._USER_DEFINED_PROPERTIES_).toHaveProperty('example');
          expect(Array.isArray(modelNode._USER_DEFINED_PROPERTIES_.example)).toBe(true);
        });
      });
    });

    // ------------------------------------------------------------------------
    // make sure the schema is valid OpenAPI 3.0 by running Swagger Parser.
    // ------------------------------------------------------------------------
    describe('Schema', function() {
      it('successfully validates as JSON API 3.0', async () => {
        expect.assertions(1);
        // https://github.com/APIDevTools/swagger-parser/issues/77
        // @todo: enable once fixed, now blocks husky pre-commit hooks
        const result = await SwaggerParser.validate(_.cloneDeep(schemaWrapper));
        expect(result).toHaveProperty('info');
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
