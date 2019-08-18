/* eslint-disable no-unused-vars */

const Sequelize = require('sequelize');
const { SchemaManager, JsonSchema7Strategy } = require('../lib');

const sequelize = new Sequelize({ dialect: 'mysql' }); // no database connection required
const userModel = sequelize.import('./models/user.js'); // without `.build()` so we can manipulate if need be

describe('SchemaManager', function() {
  describe('Test configuration options for the class constructor', function() {
    // ------------------------------------------------------------------------
    // test default options
    // ------------------------------------------------------------------------
    describe('Ensure default values:', function() {
      const schemaManager = new SchemaManager();
      const strategy = new JsonSchema7Strategy();
      const schema = schemaManager.generate(userModel.build(), strategy);

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
      const schema = schemaManager.generate(userModel.build(), strategy);

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
      const schema = schemaManager.generate(userModel.build(), strategy);

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
    describe('Ensure default generate() options:', function() {
      const schemaManager = new SchemaManager();
      const strategy = new JsonSchema7Strategy();
      const schema = schemaManager.generate(userModel.build(), strategy);

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
    describe('Ensure custom generate() option:', function() {
      const schemaManager = new SchemaManager();
      const strategy = new JsonSchema7Strategy();
      const schema = schemaManager.generate(userModel.build(), strategy, {
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
    // @todo add a test for include/exclude
    // ------------------------------------------------------------------------
  });
});
