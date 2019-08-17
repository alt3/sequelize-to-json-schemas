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

    // import attributes from the sequelize model
    const attributes = this._getRawAttributes(model);

    // add the model part to the response
    const result = {};
    _.assign(result, this._getModelTitle()); // all schemas
    _.assign(result, this._getModelIdentifier()); // some schemas
    _.assign(result, this.constructor._getModelType()); // some schemas

    // add the attributes part to the response
    const typeMapper = new TypeMapper();
    result.properties = {};

    Object.keys(attributes).forEach(attributeName => {
      result.properties[attributeName] = {};
      const attributeProperties = attributes[attributeName];

      // description: all strategies, requires user definition
      _.assign(
        result.properties[attributeName],
        this._getAttributeDescription(attributeName, attributeProperties),
      );
      // type: all strategies, strategy-specific types
      _.assign(
        result.properties[attributeName],
        typeMapper.map(attributeName, attributeProperties, strategy),
      );
      // id: some strategies
      _.assign(
        result.properties[attributeName],
        this._getAttributeIdentifier(attributeName, attributeProperties),
      );
      // examples: some strategies, requires user definition
      _.assign(
        result.properties[attributeName],
        this._getAttributeExamples(attributeName, attributeProperties),
      );
    });

    return result;
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
   * Return the raw properties from a (v4 or v5+) Sequelize model.
   *
   * @private
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
   * Checks if the given property name exists in the user-specified custom attribute properties
   *
   * @private
   * @param {object} attributeProperties The raw sequelize attribute properties
   * @param {string} attributeName Name of the attribute property to look for*
   * @returns {boolean}
   * @todo add support (?!?) for including/excluding attributes (perhaps as SchemaManager initialization options)
   */
  static _hasCustomAttributeProperty(attributeProperties, propertyName) {
    const customProperties = attributeProperties.jsonSchema;

    if (!customProperties) {
      return false;
    }

    return customProperties[propertyName];
  }

  /**
   * Returns the model file name (e.g. `user.json`).
   *
   * @private
   * @returns {String}
   */
  _getModelFileName() {
    return `${_model.get(this).constructor.name}.json`;
  }

  /**
   * Returns the model path as used by $id and $ref
   *
   * @private
   * @returns {String}
   */
  _getModelPath() {
    const path = this._getModelFileName(_model.get(this));

    return `${_options.get(this).baseUri}${path}`;
  }

  /**
   * Returns the `title` property for the model.
   *
   * @private
   * @todo add strategy configuration option
   */
  _getModelTitle() {
    const title = _.capitalize(plural.singular(_model.get(this).constructor.name));

    return { title };
  }

  /**
   * Returns the `id` property for the model (if supported by the strategy).
   *
   * @private
   */
  _getModelIdentifier() {
    const identifierKeyword = _strategy.get(this).getIdentifierKeyword();
    if (!identifierKeyword) {
      return null;
    }

    return {
      [identifierKeyword]: this._getModelPath(),
    };
  }

  /**
   * Returns the `type` property for the model.
   *
   * @private
   */
  static _getModelType() {
    return {
      type: 'object',
    };
  }

  /**
   * Returns the attribute path as used by $id and $ref
   *
   * @private
   * @returns {String}
   * @todo we could also return the relative path here, perhaps make this a SchemaManager option?
   */
  _getAttributePath(attributeName) {
    return `${_options.get(this).baseUri}/properties/${attributeName}`;
  }

  /**
   * Returns the `id` property for the attribute (if supported by the strategy).
   *
   * @param {string} attributeName Name of the attribute
   * @private
   */
  _getAttributeIdentifier(attributeName) {
    const identifierKeyword = _strategy.get(this).getIdentifierKeyword();
    if (!identifierKeyword) {
      return null;
    }

    return {
      [identifierKeyword]: this._getAttributePath(attributeName),
    };
  }

  /**
   * Returns the user-defined attribute description
   *
   * @private
   * @param {string} attributeName Name of the attribute
   * @param {object} attributeProperties Raw sequelize attribute properties
   * @returns {String}
   */
  _getAttributeDescription(attributeName, attributeProperties) {
    if (!this.constructor._hasCustomAttributeProperty(attributeProperties, 'description')) {
      return null;
    }

    const { description } = attributeProperties.jsonSchema;

    if (typeof description !== 'string') {
      throw new TypeError(
        `User defined 'description' property for sequelize attribute '${attributeName}' must be of type 'string'`,
      );
    }

    return { description };
  }

  /**
   * Returns the user-defined attribute examples (strategy-specific)
   *
   * @private
   * @param {string} attributeName Name of the attribute
   * @param {object} attributeProperties Raw sequelize attribute properties
   * @returns {String}
   */
  _getAttributeExamples(attributeName, attributeProperties) {
    const examplesKeyword = _strategy.get(this).getExamplesKeyword();

    if (!examplesKeyword) {
      return null; // strategy does not support examples
    }

    if (!this.constructor._hasCustomAttributeProperty(attributeProperties, 'examples')) {
      return null; // user has not defined examples
    }

    const { examples } = attributeProperties.jsonSchema;

    if (!Array.isArray(examples)) {
      throw new TypeError(
        `User defined 'examples' property for sequelize attribute '${attributeName}' must be of type 'array'`,
      );
    }

    return {
      [examplesKeyword]: examples,
    };
  }
}

module.exports = SchemaManager;
