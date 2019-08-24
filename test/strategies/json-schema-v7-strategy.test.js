/* eslint-disable no-unused-vars */

const Ajv = require('ajv');
const models = require('../models');
const supportedDataType = require('../utils/supported-datatype');

const { SchemaManager, JsonSchema7Strategy } = require('../../lib');

describe('JsonSchema7Strategy', function() {
  describe('Test output using default options', function() {
    // ------------------------------------------------------------------------
    // generate schema
    // ------------------------------------------------------------------------
    const schemaManager = new SchemaManager();
    const strategy = new JsonSchema7Strategy();
    const schema = schemaManager.generate(models.user, strategy);

    // ------------------------------------------------------------------------
    // confirm sequelize model properties render as expected
    // ------------------------------------------------------------------------
    describe('Ensure schema.model:', function() {
      const schemaUri = 'https://json-schema.org/draft-07/schema#';
      it(`has property '$schema' with value '${schemaUri}'`, function() {
        expect(schema.$schema).toEqual('https://json-schema.org/draft-07/schema#');
      });

      it("has property '$id' with value '/user.json'", function() {
        expect(schema.$id).toEqual('/user.json');
      });

      it("has property 'title' with value 'users'", function() {
        expect(schema.title).toEqual('User');
      });

      it("has property 'type' with value 'object'", function() {
        expect(schema.type).toEqual('object');
      });
    });

    // ------------------------------------------------------------------------
    // confirm sequelize attributes render as expected
    // ------------------------------------------------------------------------
    describe('Ensure Sequelize DataTypes are properly converted and thus:', function() {
      if (supportedDataType('CITEXT')) {
        describe('CITEXT', function() {
          it("has property 'type' of type 'string'", function() {
            expect(schema.properties.CITEXT.type).toEqual('string');
          });
        });
      }

      if (supportedDataType('INTEGER')) {
        describe('INTEGER', function() {
          it("has property 'default' with integer value 0", function() {
            expect(schema.properties.INTEGER.default).toEqual(0);
          });
        });
      }

      if (supportedDataType('STRING')) {
        describe('STRING', function() {
          it("has property 'type' of type 'string'", function() {
            expect(schema.properties.STRING.type).toEqual('string');
          });

          it("has property 'default' with string value 'Default value for STRING'", function() {
            expect(schema.properties.STRING.default).toEqual('Default value for STRING');
          });
        });

        describe('STRING_1234', function() {
          it("has property 'type' of type 'string'", function() {
            expect(schema.properties.STRING_1234.type).toEqual('string');
          });

          it("has property 'maxLength' with value '1234'", function() {
            expect(schema.properties.STRING_1234.maxLength).toEqual(1234);
          });
        });

        describe('STRING_DOT_BINARY', function() {
          it("has property 'type' of type 'string'", function() {
            expect(schema.properties.STRING_DOT_BINARY.type).toEqual('string');
          });

          it("has property 'format' of type 'binary'", function() {
            expect(schema.properties.STRING_DOT_BINARY.format).toEqual('binary');
          });
        });

        describe('STRING_ALLOWNULL', function() {
          it("has property 'type' of type 'array'", function() {
            expect(Array.isArray(schema.properties.STRING_ALLOWNULL.type)).toBe(true);
          });

          it("has property 'type' with two values named 'string' and 'null'", function() {
            expect(Object.values(schema.properties.STRING_ALLOWNULL.type)).toEqual([
              'string',
              'null',
            ]);
          });
        });
      }

      if (supportedDataType('TEXT')) {
        describe('TEXT', function() {
          it("has property 'type' of type 'string'", function() {
            expect(schema.properties.TEXT.type).toEqual('string');
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
          expect(typeof schema.properties.USER_ENRICHED_PROPERTIES.description).toBe('string');
        });

        it("has property 'examples' of type 'array'", function() {
          expect(Array.isArray(schema.properties.USER_ENRICHED_PROPERTIES.examples)).toBe(true);
        });
      });
    });

    // ------------------------------------------------------------------------
    // confirm the document is valid JSON Schema Draft-07
    // ------------------------------------------------------------------------
    describe('Ensure that the resultant document:', function() {
      it('successfully validates as JSON Schema Draft-07', async () => {
        expect.assertions(1);

        // validate document using ajv
        const ajv = new Ajv();

        const valid = ajv.validate('http://json-schema.org/draft-07/schema#', schema);
        if (!valid) {
          console.log(ajv.errors); // eslint-disable-line no-console
        }

        expect(valid).toBe(true);
      });
    });
  });
});
