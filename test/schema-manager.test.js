/* eslint-disable no-unused-vars */

const models = require('./models');
const { SchemaManager, JsonSchema7Strategy } = require('../lib');

describe('SchemaManager', function() {
  describe('Test configuration options for the class constructor', function() {
    // ------------------------------------------------------------------------
    // test default options
    // ------------------------------------------------------------------------
    describe('Ensure default values:', function() {
      const schemaManager = new SchemaManager();
      const strategy = new JsonSchema7Strategy();
      const schema = schemaManager.generate(models.user, strategy);

      it(`produce relative paths for models`, function() {
        expect(schema.$id).toEqual('/user.json');
      });

      it(`produce relative paths for attribute properties`, function() {
        expect(schema.properties.id.$id).toEqual('/properties/id');
      });
    });

    // ------------------------------------------------------------------------
    // test custom baseUri
    // ------------------------------------------------------------------------
    describe('Ensure custom baseUri:', function() {
      const schemaManager = new SchemaManager({
        baseUri: 'https://alt3.io',
      });
      const strategy = new JsonSchema7Strategy();
      const schema = schemaManager.generate(models.user, strategy);

      it(`produces absolute paths for models`, function() {
        expect(schema.$id).toEqual('https://alt3.io/user.json');
      });

      it(`produces absolute paths for attribute properties`, function() {
        expect(schema.properties.id.$id).toEqual('https://alt3.io/properties/id');
      });
    });

    // ------------------------------------------------------------------------
    // test disabled absolutePaths
    // ------------------------------------------------------------------------
    describe('Ensure disabled absolutePaths:', function() {
      const schemaManager = new SchemaManager({
        baseUri: 'https://alt3.io',
        absolutePaths: false,
      });
      const strategy = new JsonSchema7Strategy();
      const schema = schemaManager.generate(models.user, strategy);

      it(`ignores baseUri and produces relative paths for models`, function() {
        expect(schema.$id).toEqual('/user.json');
      });

      it(`ignores baseUri and produces relative paths for attribute properties`, function() {
        expect(schema.properties.id.$id).toEqual('/properties/id');
      });
    });
  });

  describe('Test configuration options for the generate() method', function() {
    // ------------------------------------------------------------------------
    // test default options
    // ------------------------------------------------------------------------
    describe('Ensure default model options:', function() {
      const schemaManager = new SchemaManager();
      const strategy = new JsonSchema7Strategy();
      const schema = schemaManager.generate(models.user, strategy);

      it(`produce auto-generated model.title`, function() {
        expect(schema.title).toEqual('User');
      });

      it(`do not produce model.description`, function() {
        expect(schema.description).toBeUndefined();
      });
    });

    // ------------------------------------------------------------------------
    // test custom model properties
    // ------------------------------------------------------------------------
    describe('Ensure custom model option:', function() {
      const schemaManager = new SchemaManager();
      const strategy = new JsonSchema7Strategy();
      const schema = schemaManager.generate(models.user, strategy, {
        title: 'Custom Model Title',
        description: 'Custom Model Description',
        examples: ['Some Example'],
      });

      it(`'title' overrides value in model.title`, function() {
        expect(schema.title).toEqual('Custom Model Title');
      });

      it(`'description' produces custom property model.description`, function() {
        expect(schema.description).toEqual('Custom Model Description');
      });
    });

    // ------------------------------------------------------------------------
    // test attribute exclusion
    // ------------------------------------------------------------------------
    describe('Ensure attribute exclusions:', function() {
      const schemaManager = new SchemaManager();
      const strategy = new JsonSchema7Strategy();
      const schema = schemaManager.generate(models.user, strategy, {
        exclude: ['STRING', 'STRING_1234'],
      });

      it(`exclude attribute STRING`, function() {
        expect(schema.properties.STRING).toBeUndefined();
      });

      it(`exclude attribute STRING_1234`, function() {
        expect(schema.properties.STRING_1234).toBeUndefined();
      });

      it(`do not exclude other attribues`, function() {
        expect(schema.properties).toHaveProperty('id');
      });
    });

    // ------------------------------------------------------------------------
    // test attribute inclusion
    // ------------------------------------------------------------------------
    describe('Ensure attribute inclusions:', function() {
      const schemaManager = new SchemaManager();
      const strategy = new JsonSchema7Strategy();
      const schema = schemaManager.generate(models.user, strategy, {
        include: ['STRING', 'STRING_1234'],
      });

      it(`include attribute STRING`, function() {
        expect(schema.properties).toHaveProperty('STRING');
      });

      it(`include attribute STRING_1234`, function() {
        expect(schema.properties).toHaveProperty('STRING_1234');
      });

      it(`do not include other attributes`, function() {
        expect(Object.keys(schema.properties).length).toBe(4); // 2 left + 1 HasOne + 1 HasMany
      });
    });
  });
});
