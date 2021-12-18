/* eslint-disable no-unused-vars */

/**
 * Please note that we are NOT testing:
 * - non strategy-specific behavior
 * - custom Sequelize attribute options like 'description' and '$comment'
 *   because these are already tested in the StrategyInterface test case
 *   which uses JSON Schema Draft-07 as the basis for testing.
 */
const Ajv2019 = require('ajv/dist/2019');

const ajv = new Ajv2019();
const models = require('../models');
const { JsonSchemaManager, JsonSchema201909Strategy } = require('../../lib');

describe('JsonSchema201909Strategy', function () {
  describe('Test output using default options', function () {
    // ------------------------------------------------------------------------
    // generate schema
    // ------------------------------------------------------------------------
    const schemaManager = new JsonSchemaManager({
      disableComments: false,
    });
    const strategy = new JsonSchema201909Strategy();
    const schema = schemaManager.generate(models.user, strategy, {
      renderIdProperty: true,
    });

    // ------------------------------------------------------------------------
    // make sure sequelize model properties render as expected
    // ------------------------------------------------------------------------
    describe('Ensure model properties are rendered as expected and thus schema.model:', function () {
      const schemaUri = 'https://json-schema.org/draft/2019-09/schema#';
      it(`has property '$schema' with value '${schemaUri}'`, function () {
        expect(schema.$schema).toEqual('https://json-schema.org/draft/2019-09/schema#');
      });

      it("schema has property '$id' with value '/user.json'", function () {
        expect(schema.$id).toEqual('/user.json');
      });
    });

    // ------------------------------------------------------------------------
    // make sure sequelize DataTypes render as expected
    // ------------------------------------------------------------------------
    describe('Ensure Sequelize DataTypes are properly converted and thus:', function () {
      describe('BLOB', function () {
        it("has property 'contentEncoding' of type 'base64'", function () {
          expect(schema.properties.BLOB.contentEncoding).toEqual('base64');
        });
      });

      describe('STRING_ALLOWNULL_EXPLICIT', function () {
        it("has property 'type' of type 'array'", function () {
          expect(Array.isArray(schema.properties.STRING_ALLOWNULL_EXPLICIT.type)).toBe(true);
        });

        it("has property 'type' with two values named 'string' and 'null'", function () {
          expect(Object.values(schema.properties.STRING_ALLOWNULL_EXPLICIT.type)).toEqual([
            'string',
            'null',
          ]);
        });
      });

      // Sequelize allows null values by default so we need to make sure rendered schema
      // keys allow null by default (even when not explicitely setting `allowNull: true`)
      describe('STRING_ALLOWNULL_IMPLICIT', function () {
        it("has property 'type' of type 'array'", function () {
          expect(Array.isArray(schema.properties.STRING_ALLOWNULL_IMPLICIT.type)).toBe(true);
        });

        it("has property 'type' with two values named 'string' and 'null'", function () {
          expect(Object.values(schema.properties.STRING_ALLOWNULL_IMPLICIT.type)).toEqual([
            'string',
            'null',
          ]);
        });
      });

      describe('JSONB_ALLOWNULL', function () {
        it("has property 'anyOf' that is an array of types", function () {
          expect(Array.isArray(schema.properties.JSONB_ALLOWNULL.anyOf)).toBe(true);
        });
        it("has property 'anyOf' with values of type 'object', 'array', 'boolean', 'integer', 'number', 'string' and 'null'", function () {
          expect(Object.values(schema.properties.JSONB_ALLOWNULL.anyOf)).toEqual([
            { type: 'object' },
            { type: 'array' },
            { type: 'boolean' },
            { type: 'integer' },
            { type: 'number' },
            { type: 'string' },
            { type: 'null' },
          ]);
        });
      });

      describe('ARRAY_ALLOWNULL_EXPLICIT', function () {
        it("has property 'type' of type 'array'", function () {
          expect(Array.isArray(schema.properties.ARRAY_ALLOWNULL_EXPLICIT.type)).toBe(true);
        });

        it("has property 'type' with two values named 'array' and 'null'", function () {
          expect(Object.values(schema.properties.ARRAY_ALLOWNULL_EXPLICIT.type)).toEqual([
            'array',
            'null',
          ]);
        });
      });

      describe('ARRAY_ALLOWNULL_IMPLICIT', function () {
        it("has property 'type' of type 'array'", function () {
          expect(Array.isArray(schema.properties.ARRAY_ALLOWNULL_IMPLICIT.type)).toBe(true);
        });

        it("has property 'type' with two values named 'array' and 'null'", function () {
          expect(Object.values(schema.properties.ARRAY_ALLOWNULL_IMPLICIT.type)).toEqual([
            'array',
            'null',
          ]);
        });
      });
    });

    // ------------------------------------------------------------------------
    // make sure associations render as expected
    // ------------------------------------------------------------------------
    describe('Ensure associations are properly generated and thus:', function () {
      describe("user.HasOne(profile) generates singular property 'profile' with:", function () {
        it("property '$ref' pointing to '#/definitions/profile'", function () {
          expect(schema.properties.profile.$ref).toEqual('#/definitions/profile');
        });
      });

      describe("user.HasOne(user, as:boss) generates singular property 'boss' with:", function () {
        it("property '$ref' pointing to '#/definitions/user'", function () {
          expect(schema.properties.boss.$ref).toEqual('#/definitions/user');
        });
      });

      describe("user.BelongsTo(company) generates singular property 'company' with:", function () {
        it("property '$ref' pointing to '#/definitions/company'", function () {
          expect(schema.properties.company.$ref).toEqual('#/definitions/company');
        });
      });

      describe("user.HasMany(document) generates plural property 'documents' with:", function () {
        it("property 'type' with value 'array'", function () {
          expect(schema.properties.documents.type).toEqual('array');
        });

        it("property 'items' holding an object with '$ref' pointing at '#/definitions/document'", function () {
          expect(schema.properties.documents.items).toEqual({
            $ref: '#/definitions/document', // eslint-disable-line unicorn/prevent-abbreviations
          });
        });
      });

      describe("user.BelongsToMany(user) generates plural property 'friends' with:", function () {
        it("property 'type' with value 'array'", function () {
          expect(schema.properties.friends.type).toEqual('array');
        });

        it("property 'items.allOf' of type 'array'", function () {
          expect(Array.isArray(schema.properties.friends.items.allOf)).toBe(true);
        });

        it("array 'items.allOf' holding an object with '$ref' pointing at '#/definitions/user'", function () {
          expect(schema.properties.friends.items.allOf[0]).toEqual({
            $ref: '#/definitions/user', // eslint-disable-line unicorn/prevent-abbreviations
          });
        });

        it("array 'items.allOf' holding an object with type object and properties.friendships an object with '$ref' pointing at '#/definitions/friendship'", function () {
          expect(schema.properties.friends.items.allOf[1]).toEqual({
            type: 'object',
            properties: {
              friendships: {
                $ref: '#/definitions/friendship', // eslint-disable-line unicorn/prevent-abbreviations
              },
            },
          });
        });
      });
    });

    // ------------------------------------------------------------------------
    // confirm the document is valid JSON Schema Draft-07
    // ------------------------------------------------------------------------
    describe('Ensure that the resultant document:', function () {
      it('successfully validates as JSON Schema Draft 2019-09', async () => {
        expect.assertions(1);

        // validate document using ajv
        const valid = ajv.validate('https://json-schema.org/draft/2019-09/schema#', schema);
        if (!valid) {
          console.log(ajv.errors); // eslint-disable-line no-console
        }

        expect(valid).toBe(true);
      });
    });
  });
});