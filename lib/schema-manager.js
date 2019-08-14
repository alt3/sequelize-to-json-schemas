/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

const merge = require('lodash.merge');
const StrategyInterface = require('./strategy-interface');

/**
 * Private methods.
 */
const _getRawAttributes = Symbol('Private method');

/**
 * Private properties.
 *
 * @private
 */
const privateProperties = new WeakMap();

/**
 * SchemaManager defines the interface class we use to publish methods for our end-users.
 */
class SchemaManager {
  /**
   * @param {object} options
   * @param {StrategyInterface} options.strategy Strategy instance
   * @param {string} options.base Base URI prefixed to generated URLs, defaults to '/'*
   */
  constructor(options) {
    const defaultOptions = {
      strategy: null,
      baseUri: '/',
    };

    // merge options, then make them private using the WeakMap
    privateProperties.set(this, {
      options: merge({}, defaultOptions, options),
    });
  }

  /**
   * Generate json schema for the provided model, using any of the available strategies.
   *
   * @param {Sequelize.Model} model Instance of Sequelize.Model
   * @param {todo} strategy Instance of strategy
   * @returns {string} Json string containing the schema
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

    // extract sequelize properties
    const rawAttributes = this[_getRawAttributes](model);

    // all good, import model, generate schema
    return rawAttributes;
  }

  /**
   * Returns merged configuration settings.
   *
   * @returns {object}
   */
  getOptions() {
    return privateProperties.get(this).options; // WeakMap
  }

  /**
   * Return the raw properties from a (v4 or v5+) Sequelize model.
   *
   * @private
   * @param  {Sequelize.Model} model Instance of Sequelize.Model
   * @returns {object} Raw Sequelize attributes.
   */
  [_getRawAttributes](model) {
    if ('rawAttributes' in model) {
      return model.rawAttributes; // v5+
    }

    return model.attributes; // v4
  }
}

module.exports = SchemaManager;
