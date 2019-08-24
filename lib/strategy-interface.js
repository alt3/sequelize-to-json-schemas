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
   * Must return the property used as "title".
   *
   * @param {string} title The title to use
   * @returns {object|null} Null to omit property from the result
   */
  getPropertyTitle(title) {
    this.constructor._throwMissingImplementationError(this.constructor.name, 'getPropertyTitle');
  }

  /**
   * Must return the property used as "description".
   *
   * @param {string} description The description to use
   * @params {string} description Text holding the description
   * @returns {object|null} Null to omit property from the result
   */
  getPropertyDescription(description) {
    this.constructor._throwMissingImplementationError(
      this.constructor.name,
      'getPropertyDescription',
    );
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
   * @todo Make this truly private (using weakmap?)
   */
  static _throwMissingImplementationError(strategyName, methodName) {
    throw new Error(`${strategyName} has not implemented the '${methodName}' interface method.`);
  }
}

module.exports = StrategyInterface;
