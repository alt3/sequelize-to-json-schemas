/**
 * This test case is used to make sure:
 * - child strategies will trigger an excecption if they miss an interface method
 * - all non-strategy-specific model properties are rendered as expected
 * - all non-strategy-specific attribute properties are rendered as expected
 */
const { JsonSchemaManager, JsonSchema7Strategy } = require('../lib');
const models = require('./models');
const StrategyInterface = require('../lib/strategy-interface');
const supportedDataType = require('./utils/supported-datatype');

describe('StrategyInterface', function () {
  // ------------------------------------------------------------------------
  // make sure we are testing the expected number of interface methods. If
  // this test fails, the exception tests likely need updating as well.
  // ------------------------------------------------------------------------
  describe('Ensure we are testing against:', function () {
    const methodCount = Object.getOwnPropertyNames(StrategyInterface.prototype).length - 1; // excluding the constructor

    it(`8 interface methods`, function () {
      expect(methodCount).toEqual(8);
    });
  });

  // ------------------------------------------------------------------------
  // create a dummy strategy without any implemented methods.
  // ------------------------------------------------------------------------
  class DummyStrategy extends StrategyInterface {}
  const dummyStrategy = new DummyStrategy();

  // ------------------------------------------------------------------------
  // make sure exceptions are thrown when an interface method is missing.
  // ------------------------------------------------------------------------
  describe('Ensure exceptions are thrown if child class has not implemented:', function () {
    it('getPropertySchema()', function () {
      expect(() => {
        dummyStrategy.getPropertySchema();
      }).toThrow("DummyStrategy has not implemented the 'getPropertySchema' interface method.");
    });

    it('getPropertyId()', function () {
      expect(() => {
        dummyStrategy.getPropertyId();
      }).toThrow("DummyStrategy has not implemented the 'getPropertyId' interface method.");
    });

    it('getPropertyComment()', function () {
      expect(() => {
        dummyStrategy.getPropertyComment();
      }).toThrow("DummyStrategy has not implemented the 'getPropertyComment' interface method.");
    });

    it('getPropertyExamples()', function () {
      expect(() => {
        dummyStrategy.getPropertyExamples();
      }).toThrow("DummyStrategy has not implemented the 'getPropertyExamples' interface method.");
    });

    it('getPropertyForBase64Encoding()', function () {
      expect(() => {
        dummyStrategy.getPropertyForBase64Encoding();
      }).toThrow(
        "DummyStrategy has not implemented the 'getPropertyForBase64Encoding' interface method.",
      );
    });

    it('convertTypePropertyToAllowNull()', function () {
      expect(() => {
        dummyStrategy.convertTypePropertyToAllowNull();
      }).toThrow(
        "DummyStrategy has not implemented the 'convertTypePropertyToAllowNull' interface method.",
      );
    });

    it('getPropertyForHasOneAssociation()', function () {
      expect(() => {
        dummyStrategy.getPropertyForHasOneAssociation();
      }).toThrow(
        "DummyStrategy has not implemented the 'getPropertyForHasOneAssociation' interface method.",
      );
    });

    it('getPropertyForHasManyAssociation()', function () {
      expect(() => {
        dummyStrategy.getPropertyForHasManyAssociation();
      }).toThrow(
        "DummyStrategy has not implemented the 'getPropertyForHasManyAssociation' interface method.",
      );
    });
  });

  // ------------------------------------------------------------------------
  // generate a JSON Draft-07 schema to test against
  // ------------------------------------------------------------------------
  const schemaManager = new JsonSchemaManager({
    disableComments: false,
  });
  const schema = schemaManager.generate(models.user, new JsonSchema7Strategy());

  // ------------------------------------------------------------------------
  // make sure non-strategy-specific model properties render as expected
  // ------------------------------------------------------------------------
  describe('Ensure model properties are properly generated and thus:', function () {
    it("model has property 'title' with value 'users'", function () {
      expect(schema.title).toEqual('User');
    });

    it("model has property 'type' with value 'object'", function () {
      expect(schema.type).toEqual('object');
    });
  });

  // ------------------------------------------------------------------------
  // make sure non-strategy-specific attributes properties render as expected
  // ------------------------------------------------------------------------
  describe('Ensure non-strategy-specific Sequelize DataTypes are properly converted and thus:', function () {
    if (supportedDataType('ARRAY')) {
      describe('ARRAY_INTEGERS', function () {
        it("has property 'type' with value 'array'", function () {
          expect(schema.properties.ARRAY_INTEGERS.type).toEqual('array');
        });
        it("has property 'items.type' with value 'integer'", function () {
          expect(schema.properties.ARRAY_INTEGERS.items.type).toEqual('integer');
        });
        it("has property 'items.format' with value 'int32'", function () {
          expect(schema.properties.ARRAY_INTEGERS.items.format).toEqual('int32');
        });
      });

      describe('ARRAY_TEXTS', function () {
        it("has property 'type' of type 'array'", function () {
          expect(schema.properties.ARRAY_TEXTS.type).toEqual('array');
        });
        it("has property 'items.type' with value 'string'", function () {
          expect(schema.properties.ARRAY_TEXTS.items.type).toEqual('string');
        });
      });

      if (supportedDataType('ENUM')) {
        describe('ARRAY_ENUM_STRINGS', function () {
          it("has property 'type' of tyoe 'array", function () {
            expect(schema.properties.ARRAY_ENUM_STRINGS.type).toEqual('array');
          });
          it("has property 'items.type' with value 'string'", function () {
            expect(schema.properties.ARRAY_ENUM_STRINGS.items.type).toEqual('string');
          });
          it("has property 'items.enum' with length > 0", function () {
            expect(schema.properties.ARRAY_ENUM_STRINGS.items.enum.length).toBeGreaterThan(0);
          });
        });
      }
    }

    if (supportedDataType('CITEXT')) {
      describe('CITEXT', function () {
        it("has property 'type' of type 'string'", function () {
          expect(schema.properties.CITEXT.type).toEqual('string');
        });
      });
    }

    if (supportedDataType('STRING')) {
      describe('STRING', function () {
        it("has property 'type' of type 'string'", function () {
          expect(schema.properties.STRING.type).toEqual('string');
        });
      });

      describe('STRING_1234', function () {
        it("has property 'type' of type 'string'", function () {
          expect(schema.properties.STRING_1234.type).toEqual('string');
        });

        it("has property 'maxLength' with value '1234'", function () {
          expect(schema.properties.STRING_1234.maxLength).toEqual(1234);
        });
      });

      describe('STRING_DOT_BINARY', function () {
        it("has property 'type' of type 'string'", function () {
          expect(schema.properties.STRING_DOT_BINARY.type).toEqual('string');
        });

        it("has property 'format' of type 'binary'", function () {
          expect(schema.properties.STRING_DOT_BINARY.format).toEqual('binary');
        });
      });
    }

    if (supportedDataType('TEXT')) {
      describe('TEXT', function () {
        it("has property 'type' of type 'string'", function () {
          expect(schema.properties.TEXT.type).toEqual('string');
        });
      });
    }
  });

  // ------------------------------------------------------------------------
  // make sure sequelize attribute options render as expected
  // ------------------------------------------------------------------------
  describe('Ensure Sequelize attribute options render as expected and thus:', function () {
    if (supportedDataType('INTEGER')) {
      describe('INTEGER with defaultValue', function () {
        it("has property 'default' with integer value 0", function () {
          expect(schema.properties.INTEGER.default).toEqual(0);
        });
      });
    }

    if (supportedDataType('STRING')) {
      describe('STRING with defaultValue', function () {
        it("has property 'default' with string value 'Default value for STRING'", function () {
          expect(schema.properties.STRING.default).toEqual('Default value for STRING');
        });
      });
    }
  });

  // ------------------------------------------------------------------------
  // make sure custom Sequelize attribute options render as expected
  // ------------------------------------------------------------------------
  describe('Ensure custom Sequelize attribute options render as expected and thus:', function () {
    describe('CUSTOM_DESCRIPTION', function () {
      it(`has property 'description' with the expected string value`, function () {
        expect(schema.properties.CUSTOM_DESCRIPTION.description).toEqual(
          'Custom attribute description',
        );
      });
    });

    describe('CUSTOM_COMMENT', function () {
      it(`has property '$comment' with the expected string value`, function () {
        expect(schema.properties.CUSTOM_COMMENT.$comment).toEqual('Custom comment');
      });
    });

    describe('CUSTOM_EXAMPLES', function () {
      it("has property 'examples' of type 'array'", function () {
        expect(Array.isArray(schema.properties.CUSTOM_EXAMPLES.examples)).toBe(true);
      });

      it('with the two expected string values', function () {
        expect(schema.properties.CUSTOM_EXAMPLES.examples).toEqual([
          'Custom example 1',
          'Custom example 2',
        ]);
      });
    });

    describe('CUSTOM_READONLY', function () {
      it(`has property 'readOnly' with value 'true'`, function () {
        expect(schema.properties.CUSTOM_READONLY.readOnly).toEqual(true);
      });
    });

    describe('CUSTOM_WRITEONLY', function () {
      it(`has property 'writeOnly' with value 'true'`, function () {
        expect(schema.properties.CUSTOM_WRITEONLY.writeOnly).toEqual(true);
      });
    });
  });
});
