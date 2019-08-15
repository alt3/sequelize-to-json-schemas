/* eslint-disable class-methods-use-this */

const StrategyInterface = require('../strategy-interface');

/**
 * Strategy class responsible for converting Sequelize models into `OpenAPI v6` schema.
 *
 * @augments StrategyInterface
 */
class OpenApi3Strategy extends StrategyInterface {
  /**
   * Returns the full URI to the online OpenAPI v3 schema (validation) file.
   *
   * @example https://github.com/OAI/OpenAPI-Specification/raw/master/schemas/v2.0/schema.json

   * @returns {string}
   */
  // prettier-ignore
  getSchemaUri() { // eslint-disable-line no-unused-vars
    return 'https://json-schema.org/draft-06/schema#';
  }

  /**
   * OpenAPI v3 does not support/allow support the "identifier" property so we
   * omit the property from appearing in the schema by returning `null`.
   *
   * @example null
   *
   * @returns {null}
   */
  getIdentifierKeyword() {
    return null;
  }

  /**
   * OpenAPI v3 does not support/allow support the "schema" property so we
   * omit the property from appearing in the schema by returning `null`.
   *
   * @example null
   *
   * @returns {null}
   */
  getSchemaKeyword() {
    return null;
  }
}

module.exports = OpenApi3Strategy;
