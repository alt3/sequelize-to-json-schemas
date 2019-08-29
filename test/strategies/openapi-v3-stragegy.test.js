/* eslint-disable no-unused-vars */

/**
 * Please note that we are ONLY testing strategy-specific behavior here. All
 * non-strategy-specific tests are handled by the StrategyInterface test case.
 */

const _ = require('lodash'); // limit later to `merge`, `capitalize`, etc.
const SwaggerParser = require('swagger-parser');
const models = require('../models');
const { JsonSchemaManager, OpenApi3Strategy } = require('../../lib');
const schemaWrapper = require('./openapi-v3-validation-wrapper');

describe('OpenApi3Strategy', function() {
  describe('Test output using default options', function() {
    // ------------------------------------------------------------------------
    // generate schema
    // ------------------------------------------------------------------------
    const schemaManager = new JsonSchemaManager({
      hideComments: false,
    });
    const strategy = new OpenApi3Strategy();
    const userSchema = schemaManager.generate(models.user, strategy);

    // ------------------------------------------------------------------------
    // make sure sequelize DataTypes render as expected
    // ------------------------------------------------------------------------
    describe('Ensure Sequelize DataTypes are properly converted and thus:', function() {
      describe('STRING_ALLOWNULL', function() {
        it("has property 'type' of type 'string'", function() {
          expect(userSchema.properties.STRING_ALLOWNULL.type).toEqual('string');
        });

        it("has property 'nullable' of type 'boolean'", function() {
          expect(typeof userSchema.properties.STRING_ALLOWNULL.nullable).toEqual('boolean');
        });
      });
    });

    // ------------------------------------------------------------------------
    // make sure user-definable attribute properties render as expected
    // ------------------------------------------------------------------------
    describe('Ensure user-enriched Sequelized attributes are properly converted and thus:', function() {
      describe('USER_ENRICHED_ATTRIBUTE', function() {
        it("has property 'example' of type 'array'", function() {
          expect(Array.isArray(userSchema.properties.USER_ENRICHED_ATTRIBUTE.example)).toBe(true);
        });
      });
    });

    // ------------------------------------------------------------------------
    // make sure associations render as expected
    // ------------------------------------------------------------------------
    describe('Ensure associations are properly generated and thus:', function() {
      describe("user.HasOne(profile) generates singular property 'profile' with:", function() {
        it("property '$ref' pointing to plural '#/components/schemas/profiles'", function() {
          expect(userSchema.properties.profile.$ref).toEqual('#/components/schemas/profiles');
        });
      });

      describe("user.HasMany(document) generates plural property 'documents' with:", function() {
        it("property 'type' with value 'array'", function() {
          expect(userSchema.properties.documents.type).toEqual('array');
        });

        it("property 'items.oneOf' of type 'array'", function() {
          expect(Array.isArray(userSchema.properties.documents.items.oneOf)).toBe(true);
        });

        it("array 'items.oneOf' holding an object with '$ref' pointing to plural '#/components/schemas/documents'", function() {
          expect(userSchema.properties.documents.items.oneOf[0]).toEqual({
            $ref: '#/components/schemas/documents', // eslint-disable-line unicorn/prevent-abbreviations
          });
        });
      });
    });

    // ------------------------------------------------------------------------
    // make sure the resultant document is valid OpenAPI 3.0
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
