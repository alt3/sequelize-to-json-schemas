/* eslint-disable no-underscore-dangle */

/**
 * Strategy interface where we define the methods every inheriting strategy MUST implement.
 */
class StrategyInterface {
  /**
   * Must return the full URI to the strategy-specific online json (validation) schema.
   *
   * @returns {string}
   */
  getOnlineSchemaUri() {
    this.constructor._throwMissingImplementationError(this.constructor.name, 'getOnlineSchemaUri');
  }

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
  getPropertyId() {
    this.constructor._throwMissingImplementationError(this.constructor.name, 'getPropertyId');
  }

  /**
   * Must return the property used as "title".
   *
   * @param {string} title The title to use
   * @returns {object|null} Null to omit property from the result
   */
  getPropertyTitle() {
    this.constructor._throwMissingImplementationError(this.constructor.name, 'getPropertyTitle');
  }

  /**
   * Must return the property used as "description".
   *
   * @param {string} description The description to use
   * @returns {object|null} Null to omit property from the result
   */
  getPropertyDescription() {
    this.constructor._throwMissingImplementationError(
      this.constructor.name,
      'getPropertyDescription',
    );
  }

  /**
   * Must return the value used to update the schema if Sequelize attribute
   * property `allowNull` has been enabled
   *
   * @returns {object|null}
   */
  getNullProperty() {
    this.constructor._throwMissingImplementationError(this.constructor.name, 'getNullProperty');
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
