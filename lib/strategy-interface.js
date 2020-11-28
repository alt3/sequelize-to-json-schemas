/* eslint-disable no-unused-vars */

/**
 * Strategy interface where we define the methods every inheriting strategy MUST implement.
 *
 * @copyright Copyright (c) 2019 ALT3 B.V.
 * @license Licensed under the MIT License
 */
class StrategyInterface {
  /**
   * Must return the property used as "schema".
   *
   * @see {@link https://json-schema.org/understanding-json-schema/reference/schema.html#schema}
   * @param {boolean} secureSchemaUri True for HTTPS, false for HTTP
   * @returns {object|null} Null to omit property from the result
   */
  getPropertySchema() {
    this.constructor._throwMissingImplementationError(this.constructor.name, 'getPropertySchema');
  }

  /**
   * Must return the property used as "id".
   *
   * @see {@link https://json-schema.org/understanding-json-schema/structuring.html#the-id-property}
   * @param {string} path Path to the json file
   * @returns {object|null} Null to omit property from the result
   */
  getPropertyId(path) {
    this.constructor._throwMissingImplementationError(this.constructor.name, 'getPropertyId');
  }

  /**
   * Must return the property used as "comment".
   *
   * Please note that this comment is not intended to be exposed to users of the schema and therefore
   * will not be added to the schema unless manager option 'disableComments' is disabled.
   *
   * @see {@link https://json-schema.org/understanding-json-schema/reference/generic.html#comments}
   * @param {string} comment Value to use as the comment
   * @returns {object}
   */

  getPropertyComment(comment) {
    this.constructor._throwMissingImplementationError(this.constructor.name, 'getPropertyComment');
  }

  /**
   * Must return the property used as "examples".
   * @param {array} examples List with one or multiple examples
   * @returns {object}
   */

  getPropertyExamples(examples) {
    this.constructor._throwMissingImplementationError(this.constructor.name, 'getPropertyExamples');
  }

  /**
   * Must return the strategy specific property used for base64 string encoding.
   *
   * @returns {object}
   */
  getPropertyForBase64Encoding() {
    this.constructor._throwMissingImplementationError(
      this.constructor.name,
      'getPropertyForBase64Encoding',
    );
  }

  /**
   * Must returns a new `type` object, enriched to allow null values.
   *
   * @param {string} type Name of the type as determined by the Typemapper (e.g. `string`)
   * @returns {object}
   */
  convertTypePropertyToAllowNull(type) {
    this.constructor._throwMissingImplementationError(
      this.constructor.name,
      'convertTypePropertyToAllowNull',
    );
  }

  /**
   * Must return the property pointing to a HasOne association.
   *
   * @param {Sequelize.association} association Sequelize associaton object
   * @returns {object|null} Null to omit property from the result
   */
  getPropertyForHasOneAssociation(association) {
    this.constructor._throwMissingImplementationError(
      this.constructor.name,
      'getPropertyForHasOneAssociation',
    );
  }

  /**
   * Must return the property pointing to a HasMany association.
   *
   * @param {Sequelize.association} association Sequelize associaton object
   * @returns {object|null} Null to omit property from the result
   */
  getPropertyForHasManyAssociation(association) {
    this.constructor._throwMissingImplementationError(
      this.constructor.name,
      'getPropertyForHasManyAssociation',
    );
  }

  /**
   * Throws an error if the strategy has not impemented one of the required methods.
   *
   * @private
   * @param {string} strategyName Name of the strategy with missing method
   * @param {string} methodName Name of the missing method
   */
  static _throwMissingImplementationError(strategyName, methodName) {
    throw new Error(`${strategyName} has not implemented the '${methodName}' interface method.`);
  }
}

module.exports = StrategyInterface;
