/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */

/**
 * Strategy interface where we define the methods every inheriting strategy MUST implement.
 */
class StrategyInterface {
  /**
   * Returns a hash object used as property example.
   *
   * @param {string} raw Raw value as derived from the Sequelize model
   * @returns {object|null}
   */
  // prettier-ignore
  getExampleProperty(raw) { // eslint-disable-line no-unused-vars
    this.throwMissingImplementationError(this.constructor.name, 'getExampleProperty');
  }

  /**
   * Returns a hash object to be used as object property `id` if applicable.
   *
   * @param {*} raw Raw value as derived from the Sequelize model
   * @returns {object|null}
   */
  // prettier-ignore
  getIdProperty(baseUri, propertyName) { // eslint-disable-line no-unused-vars
    this.throwMissingImplementationError(this.constructor.name, 'getIdProperty');
  }

  /**
   * Returns a hash object to be used as object property `schema` if applicable.
   *
   * @returns {object|null}
   */
  getSchemaProperty() {
    this.throwMissingImplementationError(this.constructor.name, 'getSchemaProperty');
  }

  /**
   * Private method for throwing an error explaining which strategy is missing which interface method.
   *
   * @private
   * @param {string} strategyName Name of the strategy with missing method
   * @param {string} methodName Name of the missing method
   * @todo Make this truly private (using weakmap?)
   */
  throwMissingImplementationError(strategyName, methodName) {
    throw new Error(`${strategyName} has not implemented the '${methodName}' interface method.`);
  }
}

module.exports = StrategyInterface;
