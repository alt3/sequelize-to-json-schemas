/* eslint-disable no-unused-vars */

/**
 * Please note that we are NOT testing:
 * - non strategy-specific behavior
 * - custom Sequelize attribute options like 'description' and '$comment'
 *   because these are already tested in the StrategyInterface test case
 *   which uses JSON Schema Draft-07 as the basis for testing.
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
    // make sure associations render as expected
    // ------------------------------------------------------------------------
    describe('Ensure associations are properly generated and thus:', function() {
      describe("user.HasOne(profile) generates singular property 'profile' with:", function() {
        it("property '$ref' pointing to '#/definitions/profile'", function() {
          expect(schema.properties.profile.$ref).toEqual('#/definitions/profile');
        });
      });

      describe("user.HasOne(user, as:boss) generates singular property 'boss' with:", function() {
        it("property '$ref' pointing to '#/definitions/user'", function() {
          expect(schema.properties.boss.$ref).toEqual('#/definitions/user');
        });
      });

      describe("user.HasMany(document) generates plural property 'documents' with:", function() {
        it("property 'type' with value 'array'", function() {
          expect(schema.properties.documents.type).toEqual('array');
        });

        it("property 'items.oneOf' of type 'array'", function() {
          expect(Array.isArray(schema.properties.documents.items.oneOf)).toBe(true);
        });

        it("array 'items.oneOf' holding an object with '$ref' pointing at '#/definitions/document'", function() {
          expect(schema.properties.documents.items.oneOf[0]).toEqual({
            $ref: '#/definitions/document', // eslint-disable-line unicorn/prevent-abbreviations
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
