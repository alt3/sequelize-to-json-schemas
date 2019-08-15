/* eslint-disable no-underscore-dangle */
const _ = require('lodash'); // limit later to `merge`, `capitalize`, etc.
const plural = require('pluralize');

const StrategyInterface = require('./strategy-interface');
const TypeMapper = require('./utils/type-mapper');

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

    this._verifyOptions(_.merge({}, defaultOptions, options));
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
    if (strategy === undefined) throw new Error('Mising method argument');

    this._verifyModel(model);
    this._verifyStrategy(strategy);

    // all good, import model
    const attributes = this._getRawAttributes(model);

    // class used for converting types
    const typeMapper = new TypeMapper();

    // construct the response
    const result = this._boilerPlate();

    // set properties for model attribute
    result.properties = {};

    // https://github.com/airbnb/javascript#iterators--nope
    Object.keys(attributes).forEach(attributeName => {
      const attributeProperties = attributes[attributeName];

      // set the type property
      result.properties[attributeName] = typeMapper.map(attributeProperties);

      // set the id property
      const identifierKeyword = _strategy.get(this).constructor.getIdentifierKeyword();
      if (identifierKeyword) {
        result.properties[attributeName][identifierKeyword] = `/properties/${attributeName}`;
      }
    });

    return JSON.stringify(result, null, 2);
  }

  /**
   * Make sure constructor options are valid.
   *
   * @private
   * @param {object} options Merged default and user provided options.
   * @returns {null}
   */
  _verifyOptions(options) {
    if (!options.baseUri.endsWith('/')) {
      options.baseUri += '/'; // eslint-disable-line no-param-reassign
    }

    _options.set(this, options);
  }

  /**
   * Makes sure passed Sequelize model is valid.
   *
   * @private
   * @param {Sequelize.Model} model Instance of Sequelize.Model
   * @returns {null}
   */
  _verifyModel(model) {
    // not using `instanceof` as this would require Sequelize as a non-dev dependency
    if (!Object.prototype.hasOwnProperty.call(model, '_modelOptions')) {
      throw new TypeError(
        'Provided model does not match expected format. Are you sure this is a Sequelize model?',
      );
    }

    _model.set(this, model);
  }

  /**
   * Makes sure passed strategy is valid.
   *
   * @private
   * @param {StrategyInterface} strategy Strategy instance
   * @returns {null}
   */
  _verifyStrategy(strategy) {
    if (!(strategy instanceof StrategyInterface))
      throw new TypeError("Strategy must implement the 'StrategyInterface'");

    _strategy.set(this, strategy);
  }

  /**
   * Generates the path for a model
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
   * @returns {object} Raw Sequelize attributes
   * @todo add support (?!?) for including/excluding attributes (perhaps as SchemaManager initialization options)
   */
  _getRawAttributes() {
    const model = _model.get(this);

    if ('rawAttributes' in model) {
      return model.rawAttributes; // v5+
    }

    return model.attributes; // v4
  }

  /**
   * Generate the expected boiler plate for a schema following suggested field order of JSON Schema v7
   *
   * @private
   * @todo refactor into separate methods
   * @return {Object} The boiler plate for a json schema for this model
   */
  _boilerPlate() {
    const title = _.capitalize(plural.singular(_model.get(this).constructor.name));

    const result = {};

    // some schemas support the identifier property
    const identifierKeyword = _strategy.get(this).constructor.getIdentifierKeyword();
    if (identifierKeyword) {
      result[identifierKeyword] = this._getModelUri();
    }

    // some schemas support the schema identifier
    const schemaKeyword = _strategy.get(this).constructor.getSchemaKeyword();
    if (schemaKeyword) {
      result[schemaKeyword] = _strategy.get(this).constructor.getSchemaUri();
    }

    // all schemas support the title property
    result.title = title;

    // all schemas support the type property
    result.type = 'object';

    return result;
  }
}

module.exports = SchemaManager;
