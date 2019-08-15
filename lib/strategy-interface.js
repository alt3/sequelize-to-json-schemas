/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable require-returns-check */

const _throwMissingImplementationError = Symbol('Private method');

/**
 * Strategy interface where we define the methods every inheriting strategy MUST implement.
 */
class StrategyInterface {
  /**
   * Must return the full URI to the strategy specific online json (validation) schema.
   *
   * @returns {string}
   */
  getSchemaUri() {
    this[_throwMissingImplementationError](this.constructor.name, 'getSchemaUri');
  }

  /**
   * Must return the keyword used for the "schema" property or `null` to omit
   * the property from appearing in the schema.
   *
   * @see {@link https://json-schema.org/understanding-json-schema/reference/schema.html#schema}
   * @param {string} path Path
   * @returns {string|null}
   */
  // prettier-ignore
  getSchemaKeyword() {
    this[_throwMissingImplementationError](this.constructor.name, 'getSchemaKeyword');
  }

  /**
   * Must return the keyword used for the "identifier" schema property or `null`
   * to omit the property from appearing in the schema.
   *
   * @see {@link https://json-schema.org/understanding-json-schema/structuring.html#the-id-property}
   * @param {string} path Path
   * @returns {string|null}
   */
  // prettier-ignore
  getIdentifierKeyword() {
    this[_throwMissingImplementationError](this.constructor.name, 'getIdentifierKeyword');
  }

  /**
   * Must return the strategy specific 'example' property.
   *
   * @param {string} raw Raw value as derived from the Sequelize model
   * @returns {object|null}
   */
  // prettier-ignore
  getExampleProperty(raw) { // eslint-disable-line no-unused-vars
    this[_throwMissingImplementationError](this.constructor.name, 'getExampleProperty');
  }

  /**
   * Private method for throwing an error explaining which strategy is missing which interface method.
   *
   * @private
   * @param {string} strategyName Name of the strategy with missing method
   * @param {string} methodName Name of the missing method
   * @todo Make this truly private (using weakmap?)
   */
  [_throwMissingImplementationError](strategyName, methodName) {
    throw new Error(`${strategyName} has not implemented the '${methodName}' interface method.`);
  }
}

module.exports = StrategyInterface;
