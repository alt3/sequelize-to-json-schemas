/* eslint-disable no-unused-vars */

const _ = require('lodash'); // limit later to `merge`, `capitalize`, etc.
const SwaggerParser = require('swagger-parser');
const models = require('../models');
const supportedDataType = require('../utils/supported-datatype');
const { SchemaManager, OpenApi3Strategy } = require('../../lib');
const schemaWrapper = require('./openapi-v3-validation-wrapper');

describe('OpenApi3Strategy', function() {
  describe('Test output using default options', function() {
    // ------------------------------------------------------------------------
    // generate schema
    // ------------------------------------------------------------------------
    const schemaManager = new SchemaManager();
    const strategy = new OpenApi3Strategy();
    const userSchema = schemaManager.generate(models.user, strategy);

    // ------------------------------------------------------------------------
    // confirm sequelize model properties render as expected
    // ------------------------------------------------------------------------
    describe('Ensure User schema.model:', function() {
      it("has property 'title' with value 'users'", function() {
        expect(userSchema).toHaveProperty('title');
        expect(userSchema.title).toEqual('User');
      });

      it("has property 'type' with value 'object'", function() {
        expect(userSchema).toHaveProperty('type');
        expect(userSchema.type).toEqual('object');
      });
    });

    // ------------------------------------------------------------------------
    // confirm sequelize attributes render as expected
    // ------------------------------------------------------------------------
    describe('Ensure Sequelize DataTypes are properly converted and thus:', function() {
      if (supportedDataType('CITEXT')) {
        describe('CITEXT', function() {
          it("has property 'type' of type 'string'", function() {
            expect(userSchema.properties.CITEXT.type).toEqual('string');
          });
        });
      }

      if (supportedDataType('INTEGER')) {
        describe('INTEGER', function() {
          it("has property 'default' with integer value 0", function() {
            expect(userSchema.properties.INTEGER.default).toEqual(0);
          });
        });
      }

      if (supportedDataType('STRING')) {
        describe('STRING', function() {
          it("has property 'type' of type 'string'", function() {
            expect(userSchema.properties.STRING.type).toEqual('string');
          });

          it("has property 'default' with string value 'Default value for STRING'", function() {
            expect(userSchema.properties.STRING.default).toEqual('Default value for STRING');
          });
        });

        describe('STRING_1234', function() {
          it("has property 'type' of type 'string'", function() {
            expect(userSchema.properties.STRING_1234.type).toEqual('string');
          });

          it("has property 'maxLength' with value '1234'", function() {
            expect(userSchema.properties.STRING_1234.maxLength).toEqual(1234);
          });
        });

        describe('STRING_DOT_BINARY', function() {
          it("has property 'type' of type 'string'", function() {
            expect(userSchema.properties.STRING_DOT_BINARY.type).toEqual('string');
          });

          it("has property 'format' of type 'binary'", function() {
            expect(userSchema.properties.STRING_DOT_BINARY.format).toEqual('binary');
          });
        });

        describe('STRING_ALLOWNULL', function() {
          it("has property 'type' of type 'string'", function() {
            expect(userSchema.properties.STRING_ALLOWNULL.type).toEqual('string');
          });

          it("has property 'nullable' of type 'boolean'", function() {
            expect(typeof userSchema.properties.STRING_ALLOWNULL.nullable).toEqual('boolean');
          });
        });
      }

      if (supportedDataType('TEXT')) {
        describe('TEXT', function() {
          it("has property 'type' of type 'string'", function() {
            expect(userSchema.properties.TEXT.type).toEqual('string');
          });
        });
      }
    });

    // ------------------------------------------------------------------------
    // confirm user-definable attribute properties render as expected
    // ------------------------------------------------------------------------
    describe('Ensure user-enriched Sequelized attributes are properly converted and thus:', function() {
      describe('USER_ENRICHED_PROPERTIES', function() {
        it("has property 'description' of type 'string'", function() {
          expect(typeof userSchema.properties.USER_ENRICHED_PROPERTIES.description).toBe('string');
        });

        it("has property 'example' of type 'array'", function() {
          expect(Array.isArray(userSchema.properties.USER_ENRICHED_PROPERTIES.example)).toBe(true);
        });
      });
    });

    // ------------------------------------------------------------------------
    // confirm the document is valid OpenAPI 3.0
    //
    // Please note that we MUST include the profiles and documents schemas or
    // the $refs will not resolve causing the validation to fail.
    // ------------------------------------------------------------------------
    describe('Ensure that the resultant document:', function() {
      schemaWrapper.components.schemas.users = userSchema;
      schemaWrapper.components.schemas.profiles = schemaManager.generate(models.profile, strategy);
      schemaWrapper.components.schemas.documents = schemaManager.generate(
        models.document,
        strategy,
      );

      it("has leaf /openapi with string containing version '3.n.n'", function() {
        expect(schemaWrapper.openapi).toMatch(/^3\.\d\.\d/); // 3.n.n
      });

      it('has non-empty container /components/schemas/users', function() {
        expect(Object.keys(schemaWrapper.components.schemas.users).length).toBeGreaterThan(0);
      });

      // validate document using Swagger Parser
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

    // @todo add this to the StrategyInterface test suite, it should throw an exception
    // Model.rawAttributes._FAKE_TYPE_ = {
    //   type: "FAKETYPE"
    // };
  });
});

/*
describe('foo', () => {});
*/
