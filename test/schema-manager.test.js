/* eslint-disable no-unused-vars */

const models = require('./models');
const { JsonSchemaManager, JsonSchema7Strategy } = require('../lib');

describe('SchemaManager', function() {
  describe('Test configuration options for the class constructor', function() {
    // ------------------------------------------------------------------------
    // make sure default option values work as expected
    // ------------------------------------------------------------------------
    describe('Ensure default options:', function() {
      const schemaManager = new JsonSchemaManager();
      const strategy = new JsonSchema7Strategy();
      const schema = schemaManager.generate(models.user, strategy);

      it(`produce relative paths for models`, function() {
        expect(schema.$id).toEqual('/user.json');
      });

      it(`produce relative paths for attribute properties`, function() {
        expect(schema.properties.id.$id).toEqual('/properties/id');
      });

      it(`does not include attribute property '$comment'`, function() {
        expect(schema.properties.USER_ENRICHED_ATTRIBUTE.$comment).toBeUndefined();
      });
    });

    // ------------------------------------------------------------------------
    // make sure option 'baseUri' works as expected
    // ------------------------------------------------------------------------
    describe(`Ensure non-default option 'baseUri':`, function() {
      const schemaManager = new JsonSchemaManager({
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
    // make sure option 'disableComments' works as expected
    // ------------------------------------------------------------------------
    describe(`Ensure false option 'disableComments':`, function() {
      const schemaManager = new JsonSchemaManager({
        disableComments: false,
      });
      const strategy = new JsonSchema7Strategy();
      const schema = schemaManager.generate(models.user, strategy);

      it(`includes attribute property '$comment'`, function() {
        expect(schema.properties.USER_ENRICHED_ATTRIBUTE.$comment).toEqual(
          'User defined attribute comment',
        );
      });
    });

    // ------------------------------------------------------------------------
    // make sure disabling 'absolutePaths' renders relative paths
    // ------------------------------------------------------------------------
    describe(`Ensure false option 'absolutePaths':`, function() {
      const schemaManager = new JsonSchemaManager({
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
    // make sure default options render the expected model properties
    // ------------------------------------------------------------------------
    describe('Ensure default model options:', function() {
      const schemaManager = new JsonSchemaManager();
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
    // make sure non-default options render the expected model properties
    // ------------------------------------------------------------------------
    describe('Ensure custom model option:', function() {
      const schemaManager = new JsonSchemaManager();
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
    // make sure excluded attributes do not appear in the resultant schema
    // ------------------------------------------------------------------------
    describe('Ensure attribute exclusions:', function() {
      const schemaManager = new JsonSchemaManager();
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

      it(`do not exclude other attributes`, function() {
        expect(schema.properties).toHaveProperty('id');
      });
    });

    // ------------------------------------------------------------------------
    // make sure excluded attributes do appear in the resultant schema
    // ------------------------------------------------------------------------
    describe('Ensure attribute inclusions:', function() {
      const schemaManager = new JsonSchemaManager();
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

    // ------------------------------------------------------------------------
    // make sure option 'associations' functions as expected
    // ------------------------------------------------------------------------
    describe(`Ensure option 'associations' with default value 'true':`, function() {
      const schemaManager = new JsonSchemaManager();
      const strategy = new JsonSchema7Strategy();
      const schema = schemaManager.generate(models.user, strategy);

      it(`generates HasOne association property 'profile'`, function() {
        expect(schema.properties).toHaveProperty('profile');
      });

      it(`generates HasMany association property 'documents'`, function() {
        expect(schema.properties).toHaveProperty('documents');
      });
    });

    describe(`Ensure option 'associations' with user-specificed value 'false':`, function() {
      const schemaManager = new JsonSchemaManager();
      const strategy = new JsonSchema7Strategy();
      const schema = schemaManager.generate(models.user, strategy, {
        associations: false,
      });

      it(`does not generate HasOne association property 'profile'`, function() {
        expect(schema.properties.profile).toBeUndefined();
      });

      it(`does not generate HasMany association property 'documents'`, function() {
        expect(schema.properties.documents).toBeUndefined();
      });
    });
  });

  // ------------------------------------------------------------------------
  // make sure option 'includeAssociations'functions as expected
  // ------------------------------------------------------------------------
  describe('Ensure association inclusions:', function() {
    const schemaManager = new JsonSchemaManager();
    const strategy = new JsonSchema7Strategy();
    const schema = schemaManager.generate(models.user, strategy, {
      includeAssociations: ['profile'],
    });

    it(`include association 'profile'`, function() {
      expect(schema.properties).toHaveProperty('profile');
    });

    it(`do not include association 'documents'`, function() {
      expect(schema.properties.documents).toBeUndefined();
    });
  });

  // ------------------------------------------------------------------------
  // make sure option 'excludeAssociations'functions as expected
  // ------------------------------------------------------------------------
  describe('Ensure association exclusions:', function() {
    const schemaManager = new JsonSchemaManager();
    const strategy = new JsonSchema7Strategy();
    const schema = schemaManager.generate(models.user, strategy, {
      excludeAssociations: ['profile'],
    });

    it(`do not include association 'profile'`, function() {
      expect(schema.properties.profile).toBeUndefined();
    });

    it(`include association 'documents'`, function() {
      expect(schema.properties).toHaveProperty('documents');
    });
  });
});
