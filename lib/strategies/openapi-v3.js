/* eslint-disable class-methods-use-this */

const merge = require('lodash.merge');
const StrategyInterface = require('../strategy-interface');

/**
 * Strategy class responsible for converting Sequelize models into `OpenAPI v6` schema.
 *
 * @augments StrategyInterface
 */
class OpenApi3Strategy extends StrategyInterface {
  /**
   * Class constructor.
   *
   * @param {object} config Strategy configuration options
   */
  constructor(config) {
    super();

    // strategy specific configuration options.FYI we are disabling prettier
    // for the instantiation because it conflicts with the esline rule.
    // prettier-ignore
    const _defaultConfig = { // eslint-disable-line no-underscore-dangle
      woot: null,
    };

    // merge and verify settings
    this._config = merge({}, _defaultConfig, config); // eslint-disable-line no-underscore-dangle
  }

  /**
   * Returns `null` because OpenAPI v3 does not support this property.
   *
   * @param {string} baseUri Configuration option
   * @param {string} propertyName Name of the Sequelize attribute
   * @returns {null}
   */
  // prettier-ignore
  getIdProperty(baseUri, propertyName) { // eslint-disable-line no-unused-vars
    return null;
  }

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
}

module.exports = OpenApi3Strategy;
