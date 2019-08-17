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
  getSchemaUri() {
    return 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/schemas/v3.0/schema.json';
  }

  /**
   * OpenAPI v3 does not support/allow support the "schema" property so we
   * omit the property from the schema by returning `null`.
   *
   * @example null
   *
   * @returns {null}
   */
  getSchemaKeyword() {
    return null;
  }

  /**
   * OpenAPI v3 does not support/allow support the "identifier" property so we
   * omit the property from the schema by returning `null`.
   *
   * @example null
   *
   * @returns {null}
   */
  getIdentifierKeyword() {
    return null;
  }

  /**
   * Returns the keyword used for the attribute property "examples".
   *
   * @example example
   *
   * @returns {string}
   */
  getExamplesKeyword() {
    return 'example';
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
