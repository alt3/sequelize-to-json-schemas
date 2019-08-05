/* eslint-disable class-methods-use-this */

const merge = require('lodash.merge');
const StrategyInterface = require('../strategy-interface');

/**
 * Strategy class responsible for converting Sequelize models into `JSON Schema v6` schema.
 */
class JsonSchema6Strategy extends StrategyInterface {
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
   * Returns the `$id` object property.
   *
   * @param {*} raw Raw value as derived from the Sequelize model
   * @memberof StrategyInterface
   * @returns {object}
   */
  getObjectPropertyId(baseUri, propertyName) {
    return {
      $id: `${baseUri}/properties/${propertyName}`,
    };
  }

  /**
   * Returns the `$schema` property.
   *
   * @memberof StrategyInterface
   * @returns {object}
   */
  getObjectPropertySchema() {
    return {
      $schema: 'http://json-schema.org/draft-06/schema#',
    };
  }
}

module.exports = JsonSchema6Strategy;
