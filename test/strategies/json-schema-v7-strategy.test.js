/* eslint-disable no-unused-vars */

/**
 * Please note that we are ONLY testing strategy-specific behavior here. All
 * non-strategy-specific tests are handled by the StrategyInterface test case.
 */
const Ajv = require('ajv');
const models = require('../models');
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
      });
    });

    // ------------------------------------------------------------------------
    // make sure associations render as expected
    // ------------------------------------------------------------------------
    describe('Ensure associations are properly generated and thus:', function() {
      // @todo
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
