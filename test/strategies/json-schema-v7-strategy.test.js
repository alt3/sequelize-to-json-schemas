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
        expect(schema).toHaveProperty('$schema');
        expect(schema.$schema).toEqual('https://json-schema.org/draft-07/schema#');
      });

      it("has property '$id' with value '/user.json'", function() {
        expect(schema).toHaveProperty('$id');
        expect(schema.$id).toEqual('/user.json');
      });

      it("has property 'title' with value 'users'", function() {
        expect(schema).toHaveProperty('title');
        expect(schema.title).toEqual('User');
      });

      it("has property 'type' with value 'object'", function() {
        expect(schema).toHaveProperty('type');
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
            expect(schema.properties).toHaveProperty('CITEXT');
            expect(schema.properties.CITEXT).toHaveProperty('type');
            expect(schema.properties.CITEXT.type).toEqual('string');
          });
        });
      }

      if (supportedDataType('STRING')) {
        describe('STRING', function() {
          it("has property 'type' of type 'string'", function() {
            expect(schema.properties).toHaveProperty('STRING');
            expect(schema.properties.STRING).toHaveProperty('type');
            expect(schema.properties.STRING.type).toEqual('string');
          });
        });

        describe('STRING_1234', function() {
          it("has property 'type' of type 'string'", function() {
            expect(schema.properties).toHaveProperty('STRING_1234');
            expect(schema.properties.STRING_1234).toHaveProperty('type');
            expect(schema.properties.STRING_1234.type).toEqual('string');
          });

          it("has property 'maxLength' with value '1234'", function() {
            expect(schema.properties.STRING_1234).toHaveProperty('maxLength');
            expect(schema.properties.STRING_1234.maxLength).toEqual(1234);
          });
        });

        describe('STRING_ALLOWNULL', function() {
          it("has property 'type' of type 'array'", function() {
            expect(schema.properties).toHaveProperty('STRING_ALLOWNULL');
            expect(schema.properties.STRING_ALLOWNULL).toHaveProperty('type');
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
            expect(schema.properties).toHaveProperty('TEXT');
            expect(schema.properties.TEXT).toHaveProperty('type');
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
          expect(schema.properties).toHaveProperty('USER_ENRICHED_PROPERTIES');
          expect(schema.properties.USER_ENRICHED_PROPERTIES).toHaveProperty('description');
          expect(typeof schema.properties.USER_ENRICHED_PROPERTIES.description).toBe('string');
        });

        it("has property 'examples' of type 'array'", function() {
          expect(schema.properties.USER_ENRICHED_PROPERTIES).toHaveProperty('examples');
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
