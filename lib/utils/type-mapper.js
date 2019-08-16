// Common types.  These should never be exposed directly but, rather, get cloned
// before being returned.  This avoids cross-contamination if a user modifies
// the their schema.
const ANY = { type: ['object', 'array', 'boolean', 'number', 'string'] };
const ARRAY = { type: 'array' };
const BOOLEAN = { type: 'boolean' };
const INTEGER = { type: 'integer' };
const NUMBER = { type: 'number' };
const STRING = { type: 'string' };

const STRING_LENGTHS = { tiny: 255, medium: 16777215, long: 4294967295 };

/**
 * TypeMapper
 */
class TypeMapper {
  /**
   * Translates the Sequelize attribute `type` property to the correlating JSON schema supported type.
   *
   * @param {Object} attribute Sequelize attribute properties
   * @returns {Object} property schema
   */
  map(attribute) {
    let schema;

    let attributeType = attribute && attribute.type && attribute.type.key;

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
          attribute.type && attribute.type.returnType && attribute.type.returnType.key;
        break;
      }

      default:
        break;
    }

    // Transforms (to schema property)
    switch (attributeType) {
      // ABSTRACT - not supported

      case 'ARRAY': {
        schema = {
          ...ARRAY,
          // Sequelize requires attribute.type to be defined for ARRAYs
          items: this.map({ type: attribute.type.type, allowNull: false }),
        };
        break;
      }

      case 'BIGINT': {
        schema = { ...INTEGER, format: 'int64' };
        break;
      }
      case 'BLOB': {
        schema = { ...STRING, contentEncoding: 'base64' };
        break;
      }
      case 'BOOLEAN': {
        schema = { ...BOOLEAN };
        break;
      }
      case 'CHAR': {
        schema = { ...STRING };
        break;
      }
      case 'CIDR': {
        schema = { ...STRING };
        break;
      }

      case 'DATE': {
        schema = { ...STRING, format: 'date-time' };
        break;
      }
      case 'DATEONLY': {
        schema = { ...STRING, format: 'date' };
        break;
      }
      case 'DECIMAL': {
        schema = { ...NUMBER };
        break;
      }

      // This is the `key` for DOUBLE datatypes... ¯\_(ツ)_/¯
      case 'DOUBLE PRECISION': {
        schema = { ...NUMBER, format: 'double' };
        break;
      }
      case 'ENUM': {
        schema = { ...STRING, enum: [...attribute.values] };
        break;
      }
      case 'FLOAT': {
        schema = { ...NUMBER, format: 'float' };
        break;
      }
      // GEOGRAPHY - needs definition
      // GEOMETRY - needs definition
      // HSTORE - needs definition
      case 'INET': {
        schema = { type: [{ ...STRING, format: 'ipv4' }, { ...STRING, format: 'ipv6' }] };
        break;
      }

      case 'INTEGER': {
        schema = { ...INTEGER, format: 'int32' };
        break;
      }
      case 'JSON': {
        schema = { ...ANY, type: [...ANY.type] };
        break;
      }
      case 'JSONB': {
        schema = { ...ANY, type: [...ANY.type] };
        break;
      }
      case 'MACADDR': {
        schema = { ...STRING };
        break;
      }
      case 'MEDIUMINT': {
        schema = { ...INTEGER };
        break;
      }
      // NOW: null,
      case 'NUMBER': {
        schema = { ...NUMBER };
        break;
      }
      // RANGE: null,
      case 'REAL': {
        schema = { ...NUMBER };
        break;
      }
      case 'SMALLINT': {
        schema = { ...INTEGER };
        break;
      }

      case 'STRING': {
        schema = { ...STRING };
        let length = attribute.type.options && attribute.type.options.length;

        // Resolve aliases
        length = STRING_LENGTHS[length] || length;
        if (length) schema.maxLength = length;

        const binary = attribute.type.options;
        if (binary) schema.format = 'binary';

        break;
      }

      case 'TIME': {
        schema = { ...STRING, format: 'time' };
        break;
      }
      case 'TINYINT': {
        schema = { ...NUMBER };
        break;
      }
      case 'UUID': {
        schema = { ...STRING, format: 'uuid' };
        break;
      }
      case 'UUIDV1': {
        schema = { ...STRING, format: 'uuid' };
        break;
      }
      case 'UUIDV4': {
        schema = { ...STRING, format: 'uuid' };
        break;
      }

      case 'VIRTUAL': {
        // Use schema for the return type (if defined)
        schema = this.map({ ...attribute, type: attribute.type && attribute.type.returnType });
        break;
      }

      default:
        break;
    }

    // Use ANY for anything that's not recognized.  'Not entirely sure
    // this is the right thing to do.  File an issue if you think it should behave
    // differently.
    if (!schema) schema = { ...ANY, type: [...ANY.type] };

    // Add 'null' type?
    if (attribute.allowNull !== false) this.constructor.allowNullType(schema, attribute.allowNull);

    return schema;
  }

  /**
   * Add/remove `null` type from an property schema.  This will switch `type`
   * between an array and a single value, depending on the # of types.
   *
   * @param {Object} property Property schema
   * @param {Boolean} allowNull true = add null type, false = remove null type
   * @todo fix eslint, rename variables to more matching/understandable, explain using comments
   */
  /* eslint-disable no-param-reassign */
  /* eslint-disable prefer-destructuring */
  static allowNullType(property, allowNull = true) {
    // Sanity check that this is a property schema
    if (!property.type) throw new TypeError('Attribute `type` not defined');

    const hasNull = Array.isArray(property.type)
      ? property.type.includes('null')
      : property.type === 'null';

    if (hasNull !== allowNull) {
      if (allowNull) {
        // Convert to array
        if (!Array.isArray(property.type)) property.type = [property.type];
        property.type.push('null');
      } else {
        property.type = property.type.filter(t => t !== 'null');
        if (property.type.length === 1) property.type = property.type[0];
      }
    }

    return property;
  }
}

module.exports = TypeMapper;
