/* eslint-disable no-underscore-dangle */

/**
 * Strategy interface where we define the methods every inheriting strategy MUST implement.
 */
class StrategyInterface {
  /**
   * Must return the full URI to the strategy specific online json (validation) schema.
   *
   * @returns {string}
   */
  getOnlineSchemaUri() {
    this.constructor._throwMissingImplementationError(this.constructor.name, 'getOnlineSchemaUri');
  }

  /**
   * Must return the keyword used for the "schema" property or `null` to omit
   * the property from appearing in the schema.
   *
   * @see {@link https://json-schema.org/understanding-json-schema/reference/schema.html#schema}
   * @param {string} path Path
   * @returns {string|null}
   */
  getSchemaKeyword() {
    this.constructor._throwMissingImplementationError(this.constructor.name, 'getSchemaKeyword');
  }

  /**
   * Must return the keyword used for the "identifier" schema property or `null`
   * to omit the property from appearing in the schema.
   *
   * @see {@link https://json-schema.org/understanding-json-schema/structuring.html#the-id-property}
   * @param {string} path Path
   * @returns {string|null}
   */
  getIdentifierKeyword() {
    this.constructor._throwMissingImplementationError(
      this.constructor.name,
      'getIdentifierKeyword',
    );
  }

  /**
   * Must return the keyword used for the "examples" schema property or `null`
   * to omit the property from appearing in the schema.
   *
   * @see {@link https://json-schema.org/understanding-json-schema/reference/generic.html}
   * @param {string} path Path
   * @returns {string|null}
   */
  getExamplesKeyword() {
    this.constructor._throwMissingImplementationError(this.constructor.name, 'getExamplesKeyword');
  }

  /**
   * Must return the value used to update the schema if Sequelize attribute
   * property `allowNull` has been enabled.
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
