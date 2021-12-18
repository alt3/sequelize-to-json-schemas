const { capitalize, omit, pick } = require('./utils/lodash-natives');

const StrategyInterface = require('./strategy-interface');
const TypeMapper = require('./type-mapper');
const { checkTypeOptional, checkTypeRequired } = require('./utils/type-checks');

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
 *
 * @copyright Copyright (c) 2019 ALT3 B.V.
 * @license Licensed under the MIT License
 */
class SchemaManager {
  /**
   * @param {object} options User options.
   * @param {string} options.baseUri Base URI prefixed to generated paths, defaults to '/'
   * @param {boolean} options.absolutePaths False to generate relative paths, defaults to true
   * @param {boolean} options.secureSchemaUri False to render a HTTP link to the strategy-specific schema, defaults to true (HTTPS)
   * @param {boolean} options.disableComments False to not render attribute property 'comment', defaults to true
   */
  constructor(options) {
    const defaultOptions = {
      baseUri: '/',
      absolutePaths: true,
      secureSchemaUri: true,
      disableComments: true,
    };

    // eslint-disable-next-line prefer-object-spread
    this._verifyOptions(Object.assign({}, defaultOptions, options));
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
   * @param {array} options.include List of attribute names that will be included in the generated schema
   * @param {array} options.associations False to exclude all associations from the generated schema, defaults to true
   * @returns {object} Object contaiing the strategy-specific schema
   * @param {array} options.excludeAssociations List of association names that will not be included in the generated schema
   * @param {array} options.includeAssociations List of association names that will be included in the generated schema
   */
  generate(model, strategy, options) {
    const defaultOptions = {
      title: null,
      description: null,
      include: [],
      exclude: [],
      associations: true,
      includeAssociations: [],
      excludeAssociations: [],
    };

    if (model === undefined) throw new Error('Missing method argument');
    if (strategy === undefined) throw new Error('Mising method argument');

    // eslint-disable-next-line prefer-object-spread
    this._verifyModelOptions(Object.assign({}, defaultOptions, options));
    this._verifyModel(model);
    this._verifyStrategy(strategy);

    // import attributes from the sequelize model
    const attributes = this._getRawAttributes(model);

    // construct the response
    const result = this._getModelContainer();
    const requiredAttributes = [];

    // add property schema (type, nullable, etc)
    for (const attributeName of Object.keys(attributes)) {
      result.properties[attributeName] = this._getAttributeContainer(
        attributeName,
        attributes[attributeName],
      );

      if (this.constructor._isRequiredProperty(attributes[attributeName])) {
        requiredAttributes.push(attributeName);
      }
    }

    // merge required
    if (requiredAttributes.length > 0) {
      result.required = requiredAttributes;
    }

    // skip adding associations completely if configured by the user
    if (_modelOptions.get(this).associations === false) {
      return result;
    }

    for (const association of Object.keys(this._getAssociations())) {
      Object.assign(
        result.properties,
        this._getModelPropertyForAssociation(association, model.associations[association]),
      );
    }

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

    checkTypeRequired('absolutePaths', options.absolutePaths, 'boolean');
    checkTypeRequired('secureSchemaUri', options.secureSchemaUri, 'boolean');
    checkTypeRequired('disableComments', options.disableComments, 'boolean');

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
    checkTypeOptional('title', options.title, 'string');
    checkTypeOptional('description', options.description, 'string');
    checkTypeRequired('include', options.include, 'array');
    checkTypeRequired('exclude', options.exclude, 'array');

    if (options.include.length > 0 && options.exclude.length > 0) {
      throw new Error("Model options 'include' and 'exclude' are mutually exclusive");
    }

    checkTypeRequired('associations', options.associations, 'boolean');
    checkTypeRequired('includeAssociations', options.includeAssociations, 'array');
    checkTypeRequired('excludeAssociations', options.excludeAssociations, 'array');

    if (options.includeAssociations.length > 0 && options.excludeAssociations.length > 0) {
      throw new Error(
        "Model options 'includeAssociations' and 'excludeAssociations' are mutually exclusive",
      );
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
    if ('rawAttributes' in model) {
      _model.set(this, model);

      return null;
    }

    if ('attributes' in model) {
      _model.set(this, model);

      return null;
    }

    throw new TypeError(
      'Provided model does not match expected format. Are you sure this is a Sequelize model?',
    );
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
   */
  _getRawAttributes() {
    const model = _model.get(this);
    let attributes = {};

    if ('rawAttributes' in model) {
      attributes = model.rawAttributes; // v5+
    } else {
      attributes = model; // v4
    }

    if (_modelOptions.get(this).include.length > 0) {
      return pick(attributes, _modelOptions.get(this).include);
    }

    if (_modelOptions.get(this).exclude.length > 0) {
      return omit(attributes, _modelOptions.get(this).exclude);
    }

    return attributes;
  }

  /**
   * Returns the associations for a Sequelize model.
   *
   * @private
   * @returns {object|null} List of associated models or null
   */
  _getAssociations() {
    const model = _model.get(this);

    if (model.associations.length === 0) {
      return null;
    }

    return model.associations;
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

    Object.assign(result, this._getPropertySchema()); // some schemas
    Object.assign(result, this._getPropertySchemaId(this._getModelFilePath(_model.get(this).name))); // some schemas
    Object.assign(result, this._getModelPropertyTitle(_model.get(this))); // all schemas
    Object.assign(result, this._getModelPropertyDescription()); // all schemas but only if user passed the model option

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

    Object.assign(result, this._getPropertyId(this._getAttributePath(attributeName))); // `id`: some schemas
    Object.assign(result, typeMapper.map(attributeName, attributeProperties, _strategy.get(this))); // `type`: all schemas, strategy-specific types
    Object.assign(
      result,
      this._getAttributePropertyTypeOverride(attributeName, attributeProperties),
    ); // override the type generated by type-mapper if 'schema' exists
    Object.assign(
      result,
      this._getAttributePropertyDescription(attributeName, attributeProperties), // `description:` requires sequelize property jsonSchema.description
    );
    Object.assign(
      result,
      this._getAttributePropertyComment(attributeName, attributeProperties), // `comment:` requires sequelize property jsonSchema.description
    );
    Object.assign(result, this._getPropertyReadOrWriteOnly(attributeName, attributeProperties)); // `readOnly` or `writeOnly`: some schemas

    Object.assign(result, this._getAttributeExamples(attributeName, attributeProperties)); // `examples`: requires sequelize property jsonSchema.examples

    return result;
  }

  /**
   * Returns the model file name (e.g. `user.json`).
   *
   * @private
   * @returns {string}
   */
  static _getModelFileName(modelName) {
    return `${modelName}.json`;
  }

  /**
   * Returns the model path as used by $id and $ref.
   *
   * @private
   * @param {string} modelName Name of the model
   * @returns {string}
   */
  _getModelFilePath(modelName) {
    const path = this.constructor._getModelFileName(modelName);

    if (_options.get(this).absolutePaths) {
      return `${_options.get(this).baseUri}${path}`;
    }

    return `/${path}`;
  }

  /**
   * Returns the `schema` property for the model.
   *
   * @private
   * @param {boolean} secureSchemaUri True for HTTPS, false for HTTP
   * @returns {object}
   */
  _getPropertySchema() {
    return _strategy.get(this).getPropertySchema(_options.get(this).secureSchemaUri);
  }

  /**
   * Returns the `id` property for the schema.
   *
   * @private
   * @param {string} Path to the json file
   * @returns {object}
   */
  _getPropertySchemaId(path) {
    return _strategy.get(this).getPropertyId(path);
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
   * Returns the `title` property for the model. Since this property
   * is supported by all schemas we do not need a strategy here.
   *
   * @private
   * @param {sequelize.Model} model Instance of Sequelize.Model
   * @returns {object}
   */
  _getModelPropertyTitle(model) {
    let { title } = _modelOptions.get(this);

    if (!title) {
      title = capitalize(model.options.name.singular);
    }

    return {
      title,
    };
  }

  /**
   * Returns the `description` property for the model. Since this property
   * is supported by all schemas we do not need a strategy here.
   *
   * @private
   * @returns {object|null} Null if the user did not pass the option.
   */
  _getModelPropertyDescription() {
    const { description } = _modelOptions.get(this);

    if (!description) {
      return null;
    }

    return {
      description,
    };
  }

  /**
   * Checks if the given attribute property is required
   *
   * @private
   * @param {object} attributeProperties The raw sequelize attribute properties
   * @returns {boolean} True if attribute is required
   */
  static _isRequiredProperty(attributeProperties) {
    if (attributeProperties.allowNull === false) {
      return true;
    }

    if (attributeProperties.defaultValue !== undefined) {
      return true;
    }

    return false;
  }

  /**
   * Return the custom Sequelize attribute property as configured in `jsonSchema`.
   *
   * @private
   * @param {string} propertyName Name of the custom attribute property to search for
   * @param {object} attributeProperties Raw Sequelize attribute properties
   * @returns {*} Null if the custom attribute does not exist
   */
  static _getCustomPropertyValue(propertyName, attributeProperties) {
    const { jsonSchema } = attributeProperties;

    if (jsonSchema === undefined) {
      return null;
    }

    if (jsonSchema[propertyName] === undefined) {
      return null;
    }

    return jsonSchema[propertyName];
  }

  /**
   * Returns a user-defined schema object that overrides the type object
   * created by the TypeMapper class.  This is necessary for any sequelize type
   * that is mapped to the ANY array while using the OpenAPI strategy.
   *
   * @param {string} attributeName Name of the attribute
   * @param {object} attributeProperties Raw sequelize attribute properties
   * @returns {object|null}
   */
  _getAttributePropertyTypeOverride(attributeName, attributeProperties) {
    const schema = this.constructor._getCustomPropertyValue('schema', attributeProperties);

    if (!schema) {
      return null;
    }

    if (typeof schema === 'object' && typeof schema.type === 'string') {
      return schema;
    }

    throw new TypeError(
      `Custom property 'schema' for sequelize attribute '${attributeName}' should be an object with a 'type' key`,
    );
  }

  /**
   * Returns the attribute path as used by $id and $ref
   *
   * @private
   * @returns {string}
   */
  _getAttributePath(attributeName) {
    if (_options.get(this).absolutePaths) {
      return `${_options.get(this).baseUri}properties/${attributeName}`;
    }

    return `/properties/${attributeName}`;
  }

  /**
   * Returns the user-defined attribute description. Since this property
   * is supported by all schemas we do not need a strategy here.
   *
   * @private
   * @param {string} attributeName Name of the attribute
   * @param {object} attributeProperties Raw sequelize attribute properties
   * @returns {string}
   */
  _getAttributePropertyDescription(attributeName, attributeProperties) {
    const description = this.constructor._getCustomPropertyValue(
      'description',
      attributeProperties,
    );

    if (description === null) {
      return null;
    }

    checkTypeRequired('description', description, 'string');

    return {
      description,
    };
  }

  /**
   * Returns the user-defined attribute comment.
   *
   * @private
   * @param {string} attributeName Name of the attribute
   * @param {object} attributeProperties Raw sequelize attribute properties
   * @returns {string}
   */
  _getAttributePropertyComment(attributeName, attributeProperties) {
    if (_options.get(this).disableComments === true) {
      return null;
    }

    const comment = this.constructor._getCustomPropertyValue('comment', attributeProperties);

    if (comment === null) {
      return null;
    }

    checkTypeRequired('comment', comment, 'string');

    return _strategy.get(this).getPropertyComment(comment);
  }

  /**
   * Returns one of the user-defined attribute properties 'readOnly' or 'writeOnly'.
   *
   * @private
   * @param {string} attributeName Name of the attribute
   * @param {object} attributeProperties Raw sequelize attribute properties
   * @returns {object|null}
   */
  _getPropertyReadOrWriteOnly(attributeName, attributeProperties) {
    const readOnly = this.constructor._getCustomPropertyValue('readOnly', attributeProperties);
    const writeOnly = this.constructor._getCustomPropertyValue('writeOnly', attributeProperties);

    if (readOnly === null && writeOnly === null) {
      return null;
    }

    if (readOnly && writeOnly) {
      throw new TypeError(
        `Custom properties 'readOnly' and 'writeOnly' for sequelize attribute '${attributeName}' are mutually exclusive`,
      );
    }

    if (readOnly) {
      checkTypeRequired('readOnly', readOnly, 'boolean');

      return {
        readOnly: true,
      };
    }

    // still here so writeOnly
    checkTypeRequired('writeOnly', writeOnly, 'boolean');

    return {
      writeOnly: true,
    };
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
    const examples = this.constructor._getCustomPropertyValue('examples', attributeProperties);

    if (examples === null) {
      return null;
    }

    // see https://json-schema.org/understanding-json-schema/reference/generic.html
    if (!Array.isArray(examples)) {
      throw new TypeError("The 'examples' property MUST be an array");
    }

    return _strategy.get(this).getPropertyExamples(examples);
  }

  /**
   * Returns the property for the given association.
   *
   * @private
   * @param {string} association name
   * @param {Sequelize.Association} association Sequelize Association
   * @returns {object|null} Object if HasOne, BelongsTo or HasMany and not excluded, null otherwise
   */
  _getModelPropertyForAssociation(associationName, association) {
    const options = _modelOptions.get(this);

    if (
      options.excludeAssociations.length > 0 &&
      options.excludeAssociations.includes(associationName)
    ) {
      return null;
    }

    if (
      options.includeAssociations.length > 0 &&
      options.includeAssociations.includes(associationName) === false
    ) {
      return null;
    }

    switch (association.associationType) {
      case 'HasOne':
        return _strategy.get(this).getPropertyForHasOneAssociation(associationName, association);
      case 'BelongsTo':
        return _strategy.get(this).getPropertyForBelongsToAssociation(associationName, association);
      case 'HasMany':
        return _strategy.get(this).getPropertyForHasManyAssociation(associationName, association);
      case 'BelongsToMany':
        return _strategy
          .get(this)
          .getPropertyForBelongsToManyAssociation(associationName, association);
      default:
        return null;
    }
  }
}

module.exports = SchemaManager;
