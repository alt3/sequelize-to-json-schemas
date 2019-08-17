/* eslint-disable class-methods-use-this */

const StrategyInterface = require('../strategy-interface');

/**
 * Class responsible for converting Sequelize models into "JSON Schema Draft-07" schemas.
 *
 * @augments StrategyInterface
 */
class JsonSchema7Strategy extends StrategyInterface {
  /**
   * Returns the full URI to the online JSON Schema v7 schema (validation) file.
   *
   * @example https://json-schema.org/draft-07/schema#
   *
   * @returns {string}
   */
  getSchemaUri() {
    return 'https://json-schema.org/draft-07/schema#';
  }

  /**
   * Returns the keyword used for the "schema" property.
   *
   * @example $schema
   *
   * @returns {string}
   */
  getSchemaKeyword() {
    return '$schema';
  }

  /**
   * Returns the keyword used for the "identifier" property.
   *
   * @example $id
   *
   * @returns {string}
   */
  getIdentifierKeyword() {
    return '$id';
  }

  /**
   * Returns the keyword used for the attribute property "examples".
   *
   * @example examples
   *
   * @returns {string}
   */
  getExamplesKeyword() {
    return 'examples';
  }

  /**
   * Returns `null` to be used as direct property of `format`
   *
   * @example null
   *
   * @returns {object|string}
   */
  getNullProperty() {
    return 'null';
  }
}

module.exports = JsonSchema7Strategy;
