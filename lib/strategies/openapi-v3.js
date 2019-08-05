/* eslint-disable class-methods-use-this */

const merge = require('lodash.merge');
const StrategyInterface = require('../strategy-interface');

/**
 * Strategy class responsible for converting Sequelize models into `OpenAPI v6` schema.
 */
class OpenApi3Strategy extends StrategyInterface {
  /**
   * Class constructor.
   *
   * @param {object} config
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
   * OpenAPI v3 does not support the `id` property so we simply return null.
   *
   * @param {*} raw Raw value as derived from the Sequelize model
   * @memberof StrategyInterface
   * @returns {null}
   */
  // prettier-ignore
  getObjectPropertyId(baseUri, propertyName) { // eslint-disable-line no-unused-vars
    return null;
  }

  /**
   * OpenAPI v3 does not support the `schema` property so we simply return null.
   *
   * @memberof StrategyInterface
   * @returns {null}
   */
  // prettier-ignore
  getObjectPropertySchema() { // eslint-disable-line no-unused-vars
    return null;
  }
}

module.exports = OpenApi3Strategy;
