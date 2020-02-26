// Common types.  These should never be exposed directly but, rather, get cloned
// before being returned.  This avoids cross-contamination if a user modifies
// the their schema.
const OBJECT = { type: 'object' };
const ARRAY = { type: 'array' };
const BOOLEAN = { type: 'boolean' };
const INTEGER = { type: 'integer' };
const NUMBER = { type: 'number' };
const STRING = { type: 'string' };
const ANY = { anyOf: [OBJECT, ARRAY, BOOLEAN, INTEGER, NUMBER, STRING] };

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
      // @todo Sequelize.ARRAY(Sequelize.ENUM)
      // @todo Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE))
      // ----------------------------------------------------------------------
      case 'ARRAY': {
        result = {
          ...ARRAY,
          // Sequelize requires attribute.type to be defined for ARRAYs
          items: this.map(
            attributeName,
            { type: properties.type.type, allowNull: false },
            strategy,
          ),
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
        result = {
          type: [
            { ...STRING, format: 'ipv4' },
            { ...STRING, format: 'ipv6' },
          ],
        };
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
        throw new TypeError(
          'sequelize-to-json-schemas has not yet implemented the GEOMETRY DataType',
        );
      }

      // ----------------------------------------------------------------------
      // JSON
      // ----------------------------------------------------------------------
      case 'JSON': {
        result = { ...ANY };
        break;
      }

      // ----------------------------------------------------------------------
      // JSONB
      // ----------------------------------------------------------------------
      case 'JSONB': {
        result = { ...ANY };
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
        throw new TypeError('sequelize-to-json-schemas has not yet implemented the RANGE DataType');
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

        if (properties.type.options.length !== undefined) {
          result.maxLength = properties.type.options.length;
        }

        if (properties.type.options.binary !== undefined) {
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
        throw new TypeError(
          'sequelize-to-json-schemas has not yet implemented the ABSTRACT DataType',
        );
      }

      case 'CHAR': {
        result = { ...STRING };
        break;
      }

      case 'GEOGRAPHY': {
        throw new TypeError(
          'sequelize-to-json-schemas has not yet implemented the GEOGRAPHY DataType',
        );
      }

      case 'HSTORE': {
        throw new TypeError(
          'sequelize-to-json-schemas has not yet implemented the HSTORE DataType',
        );
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
        result = this.map(
          attributeName,
          { ...properties, type: properties.type && properties.type.returnType },
          strategy,
        );
        break;
      }

      default:
        // ----------------------------------------------------------------------
        // use ANY for anything not matching (for now, needs investigating)
        // ----------------------------------------------------------------------
        result = { ...ANY };
    }

    // ----------------------------------------------------------------------
    // Sequelize options applying to all types starting below
    // ----------------------------------------------------------------------
    if (properties.allowNull !== false) {
      if (result.type) {
        Object.assign(result, this.constructor._getNullableType(result.type, strategy));
      } else {
        Object.assign(result, this.constructor._getNullableType(result.anyOf, strategy));
      }
    }

    if (properties.defaultValue !== undefined) {
      result.default = properties.defaultValue; // supported by all strategies so no need for complexity
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

    if (
      !Object.prototype.hasOwnProperty.call(result, 'type') &&
      !Object.prototype.hasOwnProperty.call(result, 'anyOf')
    ) {
      throw new TypeError(
        "convertTypePropertyToAllowNull() return value does not have property 'type' or 'anyOf'",
      );
    }

    return result;
  }
}

module.exports = TypeMapper;
