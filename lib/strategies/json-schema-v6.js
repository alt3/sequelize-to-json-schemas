/* eslint-disable class-methods-use-this */

const _ = require('lodash');
const StrategyInterface = require('../strategy-interface');

/**
 * Strategy class responsible for converting Sequelize models into `JSON Schema v6` schema.
 *
 * @augments StrategyInterface
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
    this._config = _.merge({}, _defaultConfig, config); // eslint-disable-line no-underscore-dangle
  }

  /**
   * Returns the keyword used for the `id` property.
   *
   * @example $id
   *
   * @returns {string|null} Null will prevent the identifier from appearing in the schema (e.g. for OpenAPI)
   */
  getIdentifierKeyword() {
    return '$id';
  }

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
}

module.exports = JsonSchema6Strategy;
