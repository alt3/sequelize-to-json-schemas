/* eslint-disable class-methods-use-this */

const StrategyInterface = require('../strategy-interface');

/**
 * Class responsible for converting Sequelize models into "OpenAPI 3.0" schemas.
 *
 * @augments StrategyInterface
 */
class OpenApi3Strategy extends StrategyInterface {
  /**
   * Returns the full URI to the online OpenAPI v3 schema (validation) file.
   *
   * @example https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/schemas/v3.0/schema.json

   * @returns {string}
   */
  getOnlineSchemaUri() {
    return 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/schemas/v3.0/schema.json';
  }

  /**
   * Returns null because OpenAPI 3.0 does not support the "schema" property.
   *
   * @returns {null}
   */
  getPropertySchema() {
    return null;
  }

  /**
   * Returns null because OpenAPI 3.0 does not support the "id" property.
   *
   * @example null
   * @returns {null}
   */
  getPropertyId() {
    return null;
  }

  /**
   * Returns the "title" property.
   *
   * @example {'title': 'SomeTitle'}
   * @returns {object}
   */
  getPropertyTitle(title) {
    return { title };
  }

  /**
   * Returns the "description" property.
   *
   * @example {'description': 'Some description, **may use multiline markdown**'}
   * @returns {object}
   */
  getPropertyDescription(description) {
    return { description };
  }

  /**
   * Returns the "example" property.
   *
   * @example {'example': [ 'value1', 'value2' ]}
   * @param {array} examples List with one or multiple examples
   * @returns {object}
   */
  getPropertyExamples(examples) {
    if (!Array.isArray(examples)) {
      throw new TypeError("OpenAPI 3.0 requires type 'array' for the 'example' property");
    }

    return {
      example: examples,
    };
  }

  /**
   * Returns new property `nullable: true` used as new property
   *
   * @example { 'nullable': 'true' }
   *
   * @returns {object|string}
   */
  getNullProperty() {
    return {
      nullable: true,
    };
  }
}

module.exports = OpenApi3Strategy;
