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
 * Strategy instance passed to the `generate()` method.
 *
 * @private
 */
const _strategy = new WeakMap();

/**
 * Sequelize model instance passed to the `generate()` method.
 *
 * @private
 */
const _model = new WeakMap();

/**
 * SchemaManager defines the interface class we use to publish methods for our end-users.
 */
class SchemaManager {
  /**
   * @param {object} options User options.
   * @param {string} options.baseUri Base URI prefixed to generated URLs, defaults to '/'*
   */
  constructor(options) {
    const defaultOptions = {
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
   * @param {StrategyInterface} strategy Strategy instance
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

    _strategy.set(this, strategy);

    // construct the response
    const result = this._boilerPlate();

    // extract sequelize properties
    // const rawAttributes = this._getRawAttributes(model);

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
  _getModelUri() {
    const path = this._getFileNameForModel(_model.get(this));

    return `${_options.get(this).baseUri}${path}`;
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
   * Generate the expected boiler plate for a model schema
   *
   * @private
   * @todo refactor into separate methods
   * @return {Object} The boiler plate for a json schema for this model
   */
  _boilerPlate() {
    const title = _.capitalize(plural.singular(_model.get(this).constructor.name));

    // all schemas support the title property
    const result = {
      title,
    };

    // some schemas support the identifier property
    const identifierKeyword = _strategy.get(this).constructor.getIdentifierKeyword();
    if (identifierKeyword) {
      result[identifierKeyword] = this._getModelUri();
    }

    // all schemas support the type property
    result.type = 'object';

    // some schemas support the schema identifier
    const schemaKeyword = _strategy.get(this).constructor.getSchemaKeyword();
    if (schemaKeyword) {
      result[schemaKeyword] = _strategy.get(this).constructor.getSchemaUri();
    }

    return result;
  }
}

module.exports = SchemaManager;
