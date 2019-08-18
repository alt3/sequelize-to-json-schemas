const _ = require('lodash');

// Common types.  These should never be exposed directly but, rather, get cloned
// before being returned.  This avoids cross-contamination if a user modifies
// the their schema.
const ANY = { type: ['object', 'array', 'boolean', 'number', 'string'] };
const ARRAY = { type: 'array' };
const BOOLEAN = { type: 'boolean' };
const INTEGER = { type: 'integer' };
const NUMBER = { type: 'number' };
const STRING = { type: 'string' };

const STRING_LENGTHS = {
  tiny: 255,
  medium: 16777215,
  long: 4294967295,
};

/**
 * Class responsible for converting Sequelize DataTypes to strategy-compatible `type` properties.
 *
 * @copyright Copyright (c) 2019 ALT3 B.V.
 * @license Licensed under the MIT License
 * @see {@link https://sequelize.org/master/manual/data-types.html}
 */
class TypeMapper {
  /**
   * Returns the strategy-specific `type` property for the given Sequelize DataType
   *
   * @param {string} attributeName Name of the Sequelize attribute
   * @param {object} properties Properties of the Sequelize attribute
   * @param {StrategyInterface} strategy Strategy instance
   * @returns {object} Object holding the `type` property
   * @throws {TypeError} Throws an exception if the resolved DataType is unkown to the Mapper
   */
  map(attributeName, properties, strategy) {
    let result;
    let attributeType = properties && properties.type && properties.type.key;

    // w
    // NOTE: All known sequelize types should be mentioned in the switch blocks
    // below, either under aliases or transforms (but may be commented out if not
    // supported yet)

    // Aliases
    switch (attributeType) {
      case 'TEXT':
        break;
      case 'CITEXT':
        attributeType = 'STRING';
        break;
      case 'VIRTUAL': {
        // Use schema for the return type (if defined)
        attributeType =
          properties.type && properties.type.returnType && properties.type.returnType.key;
        break;
      }

      default:
        break;
    }

    // Transforms (to schema property)
    switch (attributeType) {
      // ABSTRACT - not supported

      case 'ARRAY': {
        result = {
          ...ARRAY,
          // Sequelize requires attribute.type to be defined for ARRAYs
          items: this.map({ type: properties.type.type, allowNull: false }),
        };
        break;
      }

      case 'BIGINT': {
        result = { ...INTEGER, format: 'int64' };
        break;
      }
      case 'BLOB': {
        result = { ...STRING, contentEncoding: 'base64' };
        break;
      }
      case 'BOOLEAN': {
        result = { ...BOOLEAN };
        break;
      }
      case 'CHAR': {
        result = { ...STRING };
        break;
      }
      case 'CIDR': {
        result = { ...STRING };
        break;
      }

      case 'DATE': {
        result = { ...STRING, format: 'date-time' };
        break;
      }
      case 'DATEONLY': {
        result = { ...STRING, format: 'date' };
        break;
      }
      case 'DECIMAL': {
        result = { ...NUMBER };
        break;
      }

      // This is the `key` for DOUBLE datatypes... ¯\_(ツ)_/¯
      case 'DOUBLE PRECISION': {
        result = { ...NUMBER, format: 'double' };
        break;
      }
      case 'ENUM': {
        result = { ...STRING, enum: [...properties.values] };
        break;
      }
      case 'FLOAT': {
        result = { ...NUMBER, format: 'float' };
        break;
      }
      // GEOGRAPHY - needs definition
      // GEOMETRY - needs definition
      // HSTORE - needs definition

      // @todo: fix this one, does not validate against version 7 schema
      // @see https://github.com/Julian/jsonschema/issues/171
      case 'INET': {
        result = { type: [{ ...STRING, format: 'ipv4' }, { ...STRING, format: 'ipv6' }] };
        break;
      }

      case 'INTEGER': {
        result = { ...INTEGER, format: 'int32' };
        break;
      }
      case 'JSON': {
        result = { ...ANY, type: [...ANY.type] };
        break;
      }
      case 'JSONB': {
        result = { ...ANY, type: [...ANY.type] };
        break;
      }
      case 'MACADDR': {
        result = { ...STRING };
        break;
      }
      case 'MEDIUMINT': {
        result = { ...INTEGER };
        break;
      }
      // NOW: null,
      case 'NUMBER': {
        result = { ...NUMBER };
        break;
      }
      // RANGE: null,
      case 'REAL': {
        result = { ...NUMBER };
        break;
      }
      case 'SMALLINT': {
        result = { ...INTEGER };
        break;
      }

      case 'STRING': {
        result = { ...STRING };
        let length = properties.type.options && properties.type.options.length;

        // use available length aliases if length property matches
        // @todo make more readable, drop the const ??
        length = STRING_LENGTHS[length] || length;
        if (length) result.maxLength = length;

        //
        const binary = properties.type.options && properties.type.options.binary;

        if (binary) {
          result.format = 'binary';
        }

        break;
      }

      case 'TIME': {
        result = { ...STRING, format: 'time' };
        break;
      }
      case 'TINYINT': {
        result = { ...NUMBER };
        break;
      }
      case 'UUID': {
        result = { ...STRING, format: 'uuid' };
        break;
      }
      case 'UUIDV1': {
        result = { ...STRING, format: 'uuid' };
        break;
      }
      case 'UUIDV4': {
        result = { ...STRING, format: 'uuid' };
        break;
      }

      case 'VIRTUAL': {
        // Use result for the return type (if defined)
        result = this.map({ ...properties, type: properties.type && properties.type.returnType });
        break;
      }

      default:
        break;
    }

    // throw an exception if we receive unknown (non) Sequelize types.
    if (!result)
      throw new TypeError(
        `Your Sequelize attribute '${attributeName}' contains unkown datatype '${attributeName}'`,
      );

    // convert type property if sequelize option `allowNUll` is true
    if (properties.allowNull === true) {
      _.merge(result, this.constructor._getNullableType(result.type, strategy));
    }

    return result;
  }

  /**
   * Replaces current `schema.type` with the object returned by the strategy as
   * the solution for nullable types can vary strongly between them.
   *
   * @private
   * @param {string} type Name of the type (e.g. 'string')
   * @param {StrategyInterface} strategy Strategy instance
   * @returns {object}
   */
  static _getNullableType(type, strategy) {
    const result = strategy.convertTypePropertyToAllowNull(type);

    if (typeof result !== 'object') {
      throw new TypeError("convertTypePropertyToAllowNull() return value not of type 'object'");
    }

    if (!Object.prototype.hasOwnProperty.call(result, 'type')) {
      throw new TypeError(
        "convertTypePropertyToAllowNull() return value does not have property 'type'",
      );
    }

    return result;
  }
}

module.exports = TypeMapper;
