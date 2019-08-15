/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

const _ = require('lodash'); // limit later to `merge`, `capitalize`, etc.
const plural = require('pluralize');

const StrategyInterface = require('./strategy-interface');

/**
 * Merged configuration options.
 *
 * @private
 */
const _options = new WeakMap();

/**
 * Passed Sequelize model.
 *
 * @private
 */
const _model = new WeakMap();

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

    // merge options
    const mergedOptions = _.merge({}, defaultOptions, options);

    // validate options
    if (!mergedOptions.baseUri.endsWith('/')) {
      mergedOptions.baseUri += '/';
    }

    // privatize options by storing them in the WeakMap
    _options.set(this, mergedOptions);
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

    // privatize model by using the weakMap
    _model.set(this, model);

    // verify strategy
    if (strategy === undefined) throw new Error('Mising method argument');

    if (!(strategy instanceof StrategyInterface))
      throw new TypeError("Strategy must implement the 'StrategyInterface'");

    // extract sequelize properties
    // const rawAttributes = this._getRawAttributes(model);

    // construct the response
    const result = this.boilerPlate();

    // all good, import model, generate schema
    return result;
  }

  /**
   * Generate the path for a model
   *
   * @private
   * @param {Model} model The sequelize model to generate it for
   * @returns {String}
   */
  _getFileNameForModel() {
    return `${_model.get(this).constructor.name}.json`;
  }

  /**
   * Generate a url for use in $id and $ref
   *
   * @private
   * @param {String} base The base path
   * @param {Model} model The sequelize model to generate it for
   * @returns {String}
   */
  _getUriForModel() {
    const path = this._getFileNameForModel(_model.get(this));
    const { baseUri } = _options.get(this).baseUri;
    return `${baseUri}${path}`;
  }

  /**
   * Return the raw properties from a (v4 or v5+) Sequelize model.
   *
   * @private
   * @param  {Sequelize.Model} model Instance of Sequelize.Model
   * @returns {object} Raw Sequelize attributes.
   */
  _getRawAttributes() {
    const model = _model.get(this);

    if ('rawAttributes' in model) {
      return model.rawAttributes; // v5+
    }

    return model.attributes; // v4
  }

  /**
   * Generates the expected boiler plate for a model schema
   * @return {Object} The boiler plate for a json schema for this model
   */
  boilerPlate() {
    const model = _model.get(this);
    const title = _.capitalize(plural.singular(model.constructor.name));

    return {
      title,
      $id: this._getUriForModel(),
      type: 'object',
      $schema: 'http://json-schema.org/draft-06/schema#',
    };
  }
}

module.exports = SchemaManager;
