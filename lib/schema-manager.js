/* eslint-disable class-methods-use-this */

const merge = require('lodash.merge');
const StrategyInterface = require('./strategy-interface');

/**
 * Private properties.
 *
 * @private
 */
const _options = new WeakMap(); // eslint-disable-line no-underscore-dangle

/**
 * SchemaManager defines the interface class we use to publish methods for our end-users.
 *
 * @class SchemaManager
 * @param {StrategyInterface} options.strategy
 * @param {string} options.base Base URI prefixed to generated URLs, defaults to '/'
 */
class SchemaManager {
  /**
   * Class initialization.
   *
   * @param {object} options
   */
  constructor(options) {
    const defaultOptions = {
      strategy: null,
      baseUri: '/',
    };

    // merge options, then make them private using the WeakMap
    const mergedOptions = merge({}, defaultOptions, options);
    _options.set(this, mergedOptions);
  }

  /**
   * Generate json schema for the provided model, using any of the available strategies.
   *
   * @param {*} model
   * @param {*} strategy
   * @memberof SchemaManager
   * @public
   * @returns string Json string containing the schema
   */
  generate(model, strategy) {
    if (model === undefined) throw new Error('Missing method argument');

    // verify model (not using `instanceof` to prevent a non-dev Sequelize dependency)
    if (!Object.prototype.hasOwnProperty.call(model, '_modelOptions')) {
      throw new TypeError(
        'Provided model does not match expected format. Are you sure this is a Sequelize model?',
      );
    }

    // verify strategy
    if (strategy === undefined) throw new Error('Mising method argument');

    if (!(strategy instanceof StrategyInterface))
      throw new TypeError("Strategy must implement the 'StrategyInterface'");

    // all good, import model, generate schema
    return '{ dummy: "json schema" }';
  }

  /**
   * Getter that returns merged configuration options.
   *
   * @returns object
   * @memberof SchemaManager
   */
  getOptions() {
    return _options.get(this); // WeakMap
  }
}

/**
 * Private methods are hidden inside this constant
 *
 * @private
 */
// const privateMethods = {
//   // getAssociations
//   // getProperties
// };

module.exports = SchemaManager;
