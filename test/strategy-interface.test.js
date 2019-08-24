const models = require('./models');
const { SchemaManager } = require('../lib');
const StrategyInterface = require('../lib/strategy-interface');

// create a dummy strategy so we can test non-implemented methods
class DummyStrategy extends StrategyInterface {}
const dummyStrategy = new DummyStrategy();

describe('StrategyInterface', function() {
  // ------------------------------------------------------------------------
  //  make sure we are testing what we expect
  // ------------------------------------------------------------------------
  describe('Ensure we are testing against:', function() {
    const methodCount = Object.getOwnPropertyNames(StrategyInterface.prototype).length - 1; // excluding the constructor

    it(`9 interface methods`, function() {
      expect(methodCount).toEqual(9);
    });
  });

  // ------------------------------------------------------------------------
  // test missing methods in the extended class
  // ------------------------------------------------------------------------
  describe('Ensure exceptions are thrown if child class has not implemented:', function() {
    const schemaManager = new SchemaManager();

    it('getOnlineSchemaUri()', function() {
      expect(() => {
        schemaManager.generate(models.user, dummyStrategy);
      }).toThrow(Error);
    });

    it('getPropertySchema()', function() {
      expect(() => {
        schemaManager.generate(models.user, dummyStrategy);
      }).toThrow(Error);
    });

    it('getPropertyId()', function() {
      expect(() => {
        schemaManager.generate(models.user, dummyStrategy);
      }).toThrow(Error);
    });

    it('getPropertyTitle()', function() {
      expect(() => {
        schemaManager.generate(models.user, dummyStrategy);
      }).toThrow(Error);
    });

    it('getPropertyDescription()', function() {
      expect(() => {
        schemaManager.generate(models.user, dummyStrategy);
      }).toThrow(Error);
    });

    it('getPropertyExamples()', function() {
      expect(() => {
        schemaManager.generate(models.user, dummyStrategy);
      }).toThrow(Error);
    });

    it('convertTypePropertyToAllowNull()', function() {
      expect(() => {
        schemaManager.generate(models.user, dummyStrategy);
      }).toThrow(Error);
    });

    it('getPropertyForHasOneAssociation()', function() {
      expect(() => {
        schemaManager.generate(models.user, dummyStrategy);
      }).toThrow(Error);
    });

    it('getPropertyForHasManyAssociation()', function() {
      expect(() => {
        schemaManager.generate(models.user, dummyStrategy);
      }).toThrow(Error);
    });
  });
});
