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
        describe('_CITEXT_', function() {
          it("has property 'type' of type 'string'", function() {
            expect(schema.properties).toHaveProperty('_CITEXT_');
            expect(schema.properties._CITEXT_).toHaveProperty('type');
            expect(schema.properties._CITEXT_.type).toEqual('string');
          });
        });
      }

      if (supportedDataType('STRING')) {
        describe('_STRING_ALLOWNULL_', function() {
          it("has property 'type' of type 'array'", function() {
            expect(schema.properties).toHaveProperty('_STRING_ALLOWNULL_');
            expect(schema.properties._STRING_ALLOWNULL_).toHaveProperty('type');
            expect(Array.isArray(schema.properties._STRING_ALLOWNULL_.type)).toBe(true);
          });

          it("has property 'type' with two values named 'string' and 'null'", function() {
            expect(Object.values(schema.properties._STRING_ALLOWNULL_.type)).toEqual([
              'string',
              'null',
            ]);
          });
        });
      }

      if (supportedDataType('TEXT')) {
        describe('_TEXT_', function() {
          it("has property 'type' of type 'string'", function() {
            expect(schema.properties).toHaveProperty('_TEXT_');
            expect(schema.properties._TEXT_).toHaveProperty('type');
            expect(schema.properties._TEXT_.type).toEqual('string');
          });
        });
      }
    });

    // ------------------------------------------------------------------------
    // confirm user-definable attribute properties render as expected
    // ------------------------------------------------------------------------
    describe('Ensure user-enriched Sequelized attributes are properly converted and thus:', function() {
      describe('_USER_ENRICHED_PROPERTIES_', function() {
        it("has property 'description' of type 'string'", function() {
          expect(schema.properties).toHaveProperty('_USER_ENRICHED_PROPERTIES_');
          expect(schema.properties._USER_ENRICHED_PROPERTIES_).toHaveProperty('description');
          expect(typeof schema.properties._USER_ENRICHED_PROPERTIES_.description).toBe('string');
        });

        it("has property 'examples' of type 'array'", function() {
          expect(schema.properties._USER_ENRICHED_PROPERTIES_).toHaveProperty('examples');
          expect(Array.isArray(schema.properties._USER_ENRICHED_PROPERTIES_.examples)).toBe(true);
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
