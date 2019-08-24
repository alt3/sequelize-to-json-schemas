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

    it(`8 interface methods`, function() {
      expect(methodCount).toEqual(8);
    });
  });

  // ------------------------------------------------------------------------
  // test missing methods in the extended class
  // ------------------------------------------------------------------------
  describe('Ensure exceptions are thrown if child class has not implemented:', function() {
    it('getPropertySchema()', function() {
      expect(() => {
        dummyStrategy.getPropertySchema();
      }).toThrow("DummyStrategy has not implemented the 'getPropertySchema' interface method.");
    });

    it('getPropertyId()', function() {
      expect(() => {
        dummyStrategy.getPropertyId();
      }).toThrow("DummyStrategy has not implemented the 'getPropertyId' interface method.");
    });

    it('getPropertyTitle()', function() {
      expect(() => {
        dummyStrategy.getPropertyTitle();
      }).toThrow("DummyStrategy has not implemented the 'getPropertyTitle' interface method.");
    });

    it('getPropertyDescription()', function() {
      expect(() => {
        dummyStrategy.getPropertyDescription();
      }).toThrow(
        "DummyStrategy has not implemented the 'getPropertyDescription' interface method.",
      );
    });

    it('getPropertyExamples()', function() {
      expect(() => {
        dummyStrategy.getPropertyExamples();
      }).toThrow("DummyStrategy has not implemented the 'getPropertyExamples' interface method.");
    });

    it('convertTypePropertyToAllowNull()', function() {
      expect(() => {
        dummyStrategy.convertTypePropertyToAllowNull();
      }).toThrow(
        "DummyStrategy has not implemented the 'convertTypePropertyToAllowNull' interface method.",
      );
    });

    it('getPropertyForHasOneAssociation()', function() {
      expect(() => {
        dummyStrategy.getPropertyForHasOneAssociation();
      }).toThrow(
        "DummyStrategy has not implemented the 'getPropertyForHasOneAssociation' interface method.",
      );
    });

    it('getPropertyForHasManyAssociation()', function() {
      expect(() => {
        dummyStrategy.getPropertyForHasManyAssociation();
      }).toThrow(
        "DummyStrategy has not implemented the 'getPropertyForHasManyAssociation' interface method.",
      );
    });
  });
});
