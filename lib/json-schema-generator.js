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
 * JsonSchemaGenerator defines the interface class we use to publish methods for our end-users.
 *
 * @class JsonSchemaGenerator
 * @param {StrategyInterface} options.strategy
 * @param {string} options.base Base URI prefixed to generated URLs, defaults to '/'
 */
class JsonSchemaGenerator {
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
   * @memberof JsonSchemaGenerator
   * @public
   * @returns string String containing a json schema
   */
  generate(model, strategy) {
    // verify model
    if (model === undefined) throw new Error('Missing method argument');

    const supportedModelClasses = ['Model', 'fakeModel'];
    if (!supportedModelClasses.includes(model.constructor.name))
      throw new TypeError(
        `Model argument not of type ${supportedModelClasses.join(
          ' or ',
        )}. Are you sure this is a Sequelize model?`,
      );

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
   * @memberof JsonSchemaGenerator
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

module.exports = JsonSchemaGenerator;
