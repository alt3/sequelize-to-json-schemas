/* eslint-disable class-methods-use-this */

const StrategyInterface = require('../strategy-interface');

/**
 * Strategy class responsible for converting Sequelize models into `JSON Schema v6` schema.
 *
 * @augments StrategyInterface
 */
class JsonSchema6Strategy extends StrategyInterface {
  /**
   * Returns the full URI to the online JSON Schema v6 schema (validation) file.
   *
   * @example https://json-schema.org/draft-06/schema#
   *
   * @returns {string}
   */
  getSchemaUri() {
    return 'https://json-schema.org/draft-06/schema#';
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
}

module.exports = JsonSchema6Strategy;
