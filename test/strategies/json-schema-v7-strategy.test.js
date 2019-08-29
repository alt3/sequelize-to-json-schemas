/* eslint-disable no-unused-vars */

/**
 * Please note that we are ONLY testing strategy-specific behavior here. All
 * non-strategy-specific tests are handled by the StrategyInterface test case.
 */
const Ajv = require('ajv');
const models = require('../models');
const { JsonSchemaManager, JsonSchema7Strategy } = require('../../lib');

describe('JsonSchema7Strategy', function() {
  describe('Test output using default options', function() {
    // ------------------------------------------------------------------------
    // generate schema
    // ------------------------------------------------------------------------
    const schemaManager = new JsonSchemaManager({
      disableComments: false,
    });
    const strategy = new JsonSchema7Strategy();
    const schema = schemaManager.generate(models.user, strategy);

    // ------------------------------------------------------------------------
    // make sure sequelize model properties render as expected
    // ------------------------------------------------------------------------
    describe('Ensure model properties are rendered as expected and thus schema.model:', function() {
      const schemaUri = 'https://json-schema.org/draft-07/schema#';
      it(`has property '$schema' with value '${schemaUri}'`, function() {
        expect(schema.$schema).toEqual('https://json-schema.org/draft-07/schema#');
      });

      it("has property '$id' with value '/user.json'", function() {
        expect(schema.$id).toEqual('/user.json');
      });
    });

    // ------------------------------------------------------------------------
    // make sure sequelize DataTypes render as expected
    // ------------------------------------------------------------------------
    describe('Ensure Sequelize DataTypes are properly converted and thus:', function() {
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
    });

    // ------------------------------------------------------------------------
    // make sure user-definable attribute properties render as expected
    // ------------------------------------------------------------------------
    describe('Ensure user-enriched Sequelized attributes are properly converted and thus:', function() {
      describe('USER_ENRICHED_ATTRIBUTE', function() {
        it("has property 'examples' of type 'array'", function() {
          expect(Array.isArray(schema.properties.USER_ENRICHED_ATTRIBUTE.examples)).toBe(true);
        });

        it("has property '$comment' of type 'string'", function() {
          expect(schema.properties.USER_ENRICHED_ATTRIBUTE.$comment).toEqual(
            'User defined attribute comment',
          );
        });
      });
    });

    // ------------------------------------------------------------------------
    // make sure associations render as expected
    // ------------------------------------------------------------------------
    describe('Ensure associations are properly generated and thus:', function() {
      describe("user.HasOne(profile) generates singular property 'profile' with:", function() {
        it("property '$ref' pointing to plural '#/definitions/profiles'", function() {
          expect(schema.properties.profile.$ref).toEqual('#/definitions/profiles');
        });
      });

      describe("user.HasMany(document) generates plural property 'documents' with:", function() {
        it("property 'type' with value 'array'", function() {
          expect(schema.properties.documents.type).toEqual('array');
        });

        it("property 'items.oneOf' of type 'array'", function() {
          expect(Array.isArray(schema.properties.documents.items.oneOf)).toBe(true);
        });

        it("array 'items.oneOf' holding an object with '$ref' pointing at plural '#/definitions/documents'", function() {
          expect(schema.properties.documents.items.oneOf[0]).toEqual({
            $ref: '#/definitions/documents', // eslint-disable-line unicorn/prevent-abbreviations
          });
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
