const _ = require('lodash'); // limit later to `merge`, `capitalize`, etc.
const plural = require('pluralize');

const StrategyInterface = require('./strategy-interface');
const TypeMapper = require('./type-mapper');

/**
 * Merged constructor options.
 *
 * @private
 */
const _options = new WeakMap();

/**
 * Merged model options.
 *
 * @private
 */
const _modelOptions = new WeakMap();

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
 * Class responsible for generating the various schemas.
 */
class SchemaManager {
  /**
   * @param {object} options User options.
   * @param {string} options.baseUri Base URI prefixed to generated URLs, defaults to '/'*
   */
  constructor(options) {
    const defaultOptions = {
      baseUri: '/',
      absolutePaths: true,
    };

    this._verifyOptions(_.merge({}, defaultOptions, options));
  }

  /**
   * Generate json schema for the provided model, using any of the available strategies.
   *
   * @param {sequelize.Model} model Instance of Sequelize.Model
   * @param {strategyInterface} strategy Strategy instance
   * @param {object} options User options.
   * @param {string} options.title Name to be used as model property 'title'
   * @param {string} options.description Text to be used as model property 'description'
   * @param {array} options.exclude List of attribute names that will not be included in the generated schema
   * @returns {object} Object contaiing the strategy-specific schema
   */
  generate(model, strategy, options) {
    const defaultOptions = {
      title: null,
      description: null,
      exclude: [],
    };

    if (model === undefined) throw new Error('Missing method argument');
    if (strategy === undefined) throw new Error('Mising method argument');

    this._verifyModelOptions(_.merge({}, defaultOptions, options));
    this._verifyModel(model);
    this._verifyStrategy(strategy);

    // import attributes from the sequelize model
    const attributes = this._getRawAttributes(model);

    // construct the response
    const result = this._getModelContainer();
    const excludedAttributes = _modelOptions.get(this).exclude;

    Object.keys(attributes).forEach(attributeName => {
      if (excludedAttributes.includes(attributeName)) {
        return;
      }

      result.properties[attributeName] = this._getAttributeContainer(
        attributeName,
        attributes[attributeName],
      );
    });

    return result;
  }

  /**
   * Ensures constructor options are valid.
   *
   * @private
   * @param {object} options Merged default and user provided options.
   * @returns {null}
   */
  _verifyOptions(options) {
    if (!options.baseUri.endsWith('/')) {
      options.baseUri += '/'; // eslint-disable-line no-param-reassign
    }

    if (typeof options.absolutePaths !== 'boolean') {
      throw new TypeError(
        "SchemaManager configuration option 'absolutePaths' not of type 'boolean'",
      );
    }

    _options.set(this, options);
  }

  /**
   * Ensures model options are valid.
   *
   * @private
   * @param {object} options Merged default and user provided options.
   * @returns {null}
   */
  _verifyModelOptions(options) {
    if (options.title && typeof options.title !== 'string') {
      throw new TypeError("generate() configuration option 'title' not of type 'string'");
    }

    if (options.description && typeof options.description !== 'string') {
      throw new TypeError("generate() configuration option 'description' not of type 'string'");
    }

    if (options.exclude && !Array.isArray(options.exclude)) {
      throw new TypeError("generate() configuration option 'exclude' not of type 'array'");
    }

    _modelOptions.set(this, options);
  }

  /**
   * Ensures the passed Sequelize model is valid.
   *
   * @private
   * @param {sequelize.Model} model Instance of Sequelize.Model
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
   * Enusures the passed strategy is valid.
   *
   * @private
   * @param {strategyInterface} strategy Strategy instance
   * @returns {null}
   */
  _verifyStrategy(strategy) {
    if (!(strategy instanceof StrategyInterface))
      throw new TypeError("Strategy must implement the 'StrategyInterface'");

    _strategy.set(this, strategy);
  }

  /**
   * Returns the raw properties from a (v4 or v5+) Sequelize model.
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
   * Returns the strategy-specific schema structure for the model, ready for attribute insertion.
   *
   * @private
   * @see {@link https://json-schema.org/learn/getting-started-step-by-step.html#properties}
   * @returns {object} Schema structure
   */
  _getModelContainer() {
    const result = {};

    _.assign(result, this._getPropertySchema()); // some schemas
    _.assign(result, this._getPropertyId(this._getModelPath())); // some schemas
    _.assign(result, this._getModelPropertyTitle()); // all schemas
    _.assign(result, this._getModelPropertyDescription()); // all schemas but only if user passed the model option

    // identical for all models and schemas thus no need to over-engineer
    result.type = 'object';
    result.properties = {};

    return result;
  }

  /**
   * Returns the strategy-specific schema structure for the attribute.
   *
   * @private
   * @param {string} attributeName Name of the attribute
   * @param {object} attributeProperties The raw sequelize attribute properties
   * @returns {object} Schema structure
   */
  _getAttributeContainer(attributeName, attributeProperties) {
    const typeMapper = new TypeMapper();
    const result = {};

    _.assign(result, this._getPropertyId(this._getAttributePath(attributeName))); // some schemas
    _.assign(result, typeMapper.map(attributeName, attributeProperties, _strategy.get(this))); // all schemas, strategy-specific types
    _.assign(
      result,
      this._getAttributePropertyDescription(attributeName, attributeProperties), // requires sequelize property jsonSchema.description
    );
    _.assign(result, this._getAttributeExamples(attributeName, attributeProperties)); // requires sequelize property jsonSchema.examples

    return result;
  }

  /**
   * Returns the model file name (e.g. `user.json`).
   *
   * @private
   * @returns {string}
   */
  _getModelFileName() {
    return `${_model.get(this).constructor.name}.json`;
  }

  /**
   * Returns the model path as used by $id and $ref
   *
   * @private
   * @returns {string}
   */
  _getModelPath() {
    const path = this._getModelFileName(_model.get(this));

    if (_options.get(this).absolutePaths) {
      return `${_options.get(this).baseUri}${path}`;
    }

    return `/${path}`;
  }

  /**
   * Returns the `schema` property for the model.
   *
   * @private
   * @returns {object}
   */
  _getPropertySchema() {
    return _strategy.get(this).getPropertySchema();
  }

  /**
   * Returns the `id` property for the model.
   *
   * @private
   * @param {string} Path to the json file
   * @returns {object}
   */
  _getPropertyId(path) {
    return _strategy.get(this).getPropertyId(path);
  }

  /**
   * Returns the `title` property for the model.
   *
   * @private
   * @returns {object}
   */
  _getModelPropertyTitle() {
    let { title } = _modelOptions.get(this);

    if (!title) {
      title = _.capitalize(plural.singular(_model.get(this).constructor.name));
    }

    return _strategy.get(this).getPropertyTitle(title);
  }

  /**
   * Returns the `description` property for the model.
   *
   * @private
   * @returns {object|null} Null if the user did not pass the option.
   */
  _getModelPropertyDescription() {
    const { description } = _modelOptions.get(this);

    if (!description) {
      return null;
    }

    return _strategy.get(this).getPropertyDescription(description);
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
   * Returns the attribute path as used by $id and $ref
   *
   * @private
   * @returns {string}
   * @todo we could also return the relative path here, perhaps make this a SchemaManager option?
   */
  _getAttributePath(attributeName) {
    if (_options.get(this).absolutePaths) {
      return `${_options.get(this).baseUri}properties/${attributeName}`;
    }

    return `/properties/${attributeName}`;
  }

  /**
   * Returns the user-defined attribute description
   *
   * @private
   * @param {string} attributeName Name of the attribute
   * @param {object} attributeProperties Raw sequelize attribute properties
   * @returns {string}
   */
  _getAttributePropertyDescription(attributeName, attributeProperties) {
    if (!this.constructor._hasCustomAttributeProperty(attributeProperties, 'description')) {
      return null;
    }

    const { description } = attributeProperties.jsonSchema;

    if (typeof description !== 'string') {
      throw new TypeError(
        `User defined 'description' property for sequelize attribute '${attributeName}' must be of type 'string'`,
      );
    }

    return _strategy.get(this).getPropertyDescription(description);
  }

  /**
   * Returns the user-defined attribute examples (strategy-specific)
   *
   * @private
   * @param {string} attributeName Name of the attribute
   * @param {object} attributeProperties Raw sequelize attribute properties
   * @returns {string}
   */
  _getAttributeExamples(attributeName, attributeProperties) {
    if (!this.constructor._hasCustomAttributeProperty(attributeProperties, 'examples')) {
      return null; // user has not defined examples
    }

    const { examples } = attributeProperties.jsonSchema;

    return _strategy.get(this).getPropertyExamples(examples);
  }
}

module.exports = SchemaManager;
