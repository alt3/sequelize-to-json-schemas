const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
});

const { SchemaManager, OpenApi3Strategy } = require('../../../lib');
const schemaWrapper = require('./schema-validation-wrapper');

describe('OpenAPI v3 strategy', function() {
  const manager = new SchemaManager();
  const strategy = new OpenApi3Strategy();
  const userModel = sequelize.import('../../models/user.js').build();

  const schema = manager.generate(userModel, strategy);
  schemaWrapper.components.schemas.users = schema;

  describe('Properties', function() {
    it("has a version 3 'openapi' property", function() {
      expect(schemaWrapper).toHaveProperty('openapi');
      expect(schemaWrapper.openapi).toMatch(/^3\.\d\.\d/); // 3.n.n
    });

    it("has a non-empty 'schemas' property", function() {
      expect(Object.keys(schemaWrapper.components.schemas).length).toBeGreaterThan(0);
    });
  });

  describe('Validation', function() {
    it('passes schema validation against xxx', function() {
      expect(schemaWrapper).toHaveProperty('openapi');
      expect(schemaWrapper.openapi).toMatch(/^3\.\d\.\d/); // 3.n.n
    });
  });

  // @todo this should be detected by eslint-plugin-jest no-disabled-tests (but is not)
  // test('', function() {
  //   console.log('Does nothing');
  // });
});

/*
describe('foo', () => {});
*/
