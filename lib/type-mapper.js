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
 */
class TypeMapper {
  /**
   * Returns the strategy-specific `type` property for the given Sequelize DataType
   *
   * @see {@link https://sequelize.org/master/manual/data-types.html}
   * @param {string} attributeName Name of the Sequelize attribute
   * @param {object} properties Properties of the Sequelize attribute
   * @param {StrategyInterface} strategy Strategy instance
   * @returns {object} Object holding the `type` property
   * @throws {TypeError} Throws an exception if the resolved DataType is unkown to the Mapper
   */
  map(attributeName, properties, strategy) {
    let result;
    let attributeType = properties && properties.type && properties.type.key;

    // Aliases
    switch (attributeType) {
      case 'VIRTUAL': {
        // Use schema for the return type (if defined)
        attributeType =
          properties.type && properties.type.returnType && properties.type.returnType.key;
        break;
      }

      default:
        break;
    }

    // convert DataType to `type` property
    switch (attributeType) {
      // ----------------------------------------------------------------------
      // @todo Sequelize.ARRAY(Sequelize.TEXT)
      // @todo Sequelize.ARRAY(Sequelize.ENUM)
      // @todo Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE))
      // ----------------------------------------------------------------------
      case 'ARRAY': {
        result = {
          ...ARRAY,
          // Sequelize requires attribute.type to be defined for ARRAYs
          items: this.map({ type: properties.type.type, allowNull: false }),
        };
        break;
      }

      // ----------------------------------------------------------------------
      // BIGINT
      // BIGINT(11)
      // ----------------------------------------------------------------------
      case 'BIGINT': {
        result = { ...INTEGER, format: 'int64' };
        break;
      }

      // ----------------------------------------------------------------------
      // BLOB
      // @todo BLOB('tiny')
      // ----------------------------------------------------------------------
      case 'BLOB': {
        result = { ...STRING, contentEncoding: 'base64' };
        break;
      }

      // ----------------------------------------------------------------------
      // BOOLEAN
      // ----------------------------------------------------------------------
      case 'BOOLEAN': {
        result = { ...BOOLEAN };
        break;
      }

      // ----------------------------------------------------------------------
      // CIDR
      // ----------------------------------------------------------------------
      case 'CIDR': {
        result = { ...STRING };
        break;
      }

      // ----------------------------------------------------------------------
      // CITEXT
      // ----------------------------------------------------------------------
      case 'CITEXT':
        result = { ...STRING };
        break;

      // ----------------------------------------------------------------------
      // DATE
      // @todo DATE(6)
      // ----------------------------------------------------------------------
      case 'DATE': {
        result = { ...STRING, format: 'date-time' };
        break;
      }

      // ----------------------------------------------------------------------
      // DATEONLY
      // ----------------------------------------------------------------------
      case 'DATEONLY': {
        result = { ...STRING, format: 'date' };
        break;
      }

      // ----------------------------------------------------------------------
      // DECIMAL
      // @todo DECIMAL(10, 2)
      // ----------------------------------------------------------------------
      case 'DECIMAL': {
        result = { ...NUMBER };
        break;
      }

      // ----------------------------------------------------------------------
      // DOUBLE
      // @todo DOUBLE(11)
      // @todo DOUBLE(11,10)
      // ----------------------------------------------------------------------
      case 'DOUBLE PRECISION': {
        result = { ...NUMBER, format: 'double' };
        break;
      }

      // ----------------------------------------------------------------------
      // ENUM('value 1', 'value 2')
      // ----------------------------------------------------------------------
      case 'ENUM': {
        result = { ...STRING, enum: [...properties.values] };
        break;
      }

      // ----------------------------------------------------------------------
      // INET
      // @todo this one currently breaks json-schema-v7 validation
      // @see https://github.com/Julian/jsonschema/issues/171
      // ----------------------------------------------------------------------
      case 'INET': {
        result = { type: [{ ...STRING, format: 'ipv4' }, { ...STRING, format: 'ipv6' }] };
        break;
      }

      // ----------------------------------------------------------------------
      // INTEGER
      // ----------------------------------------------------------------------
      case 'INTEGER': {
        result = { ...INTEGER, format: 'int32' };
        break;
      }

      // ----------------------------------------------------------------------
      // FLOAT
      // @todo FLOAT(11)
      // @todo FLOAT(11,10)
      // ----------------------------------------------------------------------
      case 'FLOAT': {
        result = { ...NUMBER, format: 'float' };
        break;
      }

      // ----------------------------------------------------------------------
      // @todo GEOMETRY
      // @todo GEOMETRY('POINT')
      // @todo GEOMETRY('POINT', 4326)
      // ----------------------------------------------------------------------
      case 'GEOMETRY': {
        throw new TypeError('The GEOMETRY DataType has not yet been implemented');
      }

      // ----------------------------------------------------------------------
      // JSON
      // ----------------------------------------------------------------------
      case 'JSON': {
        result = { ...ANY, type: [...ANY.type] };
        break;
      }

      // ----------------------------------------------------------------------
      // JSONB
      // ----------------------------------------------------------------------
      case 'JSONB': {
        result = { ...ANY, type: [...ANY.type] };
        break;
      }

      // ----------------------------------------------------------------------
      // MACADDR
      // ----------------------------------------------------------------------
      case 'MACADDR': {
        result = { ...STRING };
        break;
      }

      // ----------------------------------------------------------------------
      // @todo Sequelize.RANGE(Sequelize.INTEGER)
      // @todo Sequelize.RANGE(Sequelize.BIGINT)
      // @todo Sequelize.RANGE(Sequelize.DATE)
      // @todo Sequelize.RANGE(Sequelize.DATEONLY)
      // @todo Sequelize.RANGE(Sequelize.DECIMAL)
      // ----------------------------------------------------------------------
      case 'RANGE': {
        throw new TypeError('The RANGE DataType has not yet been implemented yet');
      }

      // ----------------------------------------------------------------------
      // REAL
      // @todo REAL(11)
      // @todo REAL(11,12)
      // ----------------------------------------------------------------------
      case 'REAL': {
        result = { ...NUMBER };
        break;
      }

      // ----------------------------------------------------------------------
      // STRING
      // STRING(1234)
      // STRING.BINARY
      // ----------------------------------------------------------------------
      case 'STRING': {
        result = { ...STRING };

        // use available length aliases if length property matches
        let length = properties.type.options && properties.type.options.length;

        length = STRING_LENGTHS[length] || length;
        if (length) result.maxLength = length;

        // add binary if set
        const binary = properties.type.options && properties.type.options.binary;

        if (binary) {
          result.format = 'binary';
        }

        break;
      }

      // ----------------------------------------------------------------------
      // TEXT
      // TEXT('tiny')
      // ----------------------------------------------------------------------
      case 'TEXT':
        result = { ...STRING };
        break;

      // ----------------------------------------------------------------------
      // UUID @todo: doublecheck the V1/V4 DataTypes
      // ----------------------------------------------------------------------
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

      // ----------------------------------------------------------------------
      // @todo these require further investigation before relocating
      // ----------------------------------------------------------------------
      case 'ABSTRACT': {
        throw new TypeError('The ABSTRACT DataType has not yet been implemented');
      }

      case 'CHAR': {
        result = { ...STRING };
        break;
      }

      case 'GEOGRAPHY': {
        throw new TypeError('The GEOGRAPHY DataType has not yet been implemented');
      }

      case 'HSTORE': {
        throw new TypeError('The HSTORE DataType has not yet been implemented');
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
      case 'SMALLINT': {
        result = { ...INTEGER };
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

      case 'VIRTUAL': {
        // Use result for the return type (if defined)
        result = this.map({ ...properties, type: properties.type && properties.type.returnType });
        break;
      }

      default:
        // ----------------------------------------------------------------------
        // throw an exception if we receive unknown (non) Sequelize types
        // @todo this should probably be changed due to custom types.
        // ----------------------------------------------------------------------
        throw new TypeError(`Received unknown DataType '${attributeType}'`);
    }

    // ----------------------------------------------------------------------
    // enrich now translated `type` with strategy-specific nullable solution
    // ----------------------------------------------------------------------
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
