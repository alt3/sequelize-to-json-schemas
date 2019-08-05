/* eslint-disable no-use-before-define */

/**
 * Strategy interface where we define the methods every inheriting strategy MUST implement.
 *
 * @class StrategyInterface
 */
class StrategyInterface {
  /**
   * Returns a hash object used as property example.
   *
   * @param {*} raw Raw value as derived from the Sequelize model
   * @memberof StrategyInterface
   * @returns {object|null}
   */
  static getExampleProperty(raw) {
    return raw;
  }

  /**
   * Returns a hash object to be used as object property `id` if applicable.
   *
   * @param {*} raw Raw value as derived from the Sequelize model
   * @memberof StrategyInterface
   * @returns {object|null}
   */
  // prettier-ignore
  getObjectPropertyId(baseUri, propertyName) { // eslint-disable-line no-unused-vars
    privateMethods.throwMissingImplementationError(
      this.constructor.name,
      this.getObjectPropertyId.name,
    );
  }

  /**
   * Returns a hash object to be used as object property `schema` if applicable.
   *
   * @memberof StrategyInterface
   * @returns {object|null}
   */
  getObjectPropertySchema() {
    privateMethods.throwMissingImplementationError(
      this.constructor.name,
      this.getObjectPropertySchema.name,
    );
  }
}

/**
 * Private methods.
 *
 * @private
 */
const privateMethods = {
  /**
   * Throws an error explaining which strategy is missing which interface method.
   *
   * @param {string} strategyName Name of the strategy with missing method.
   * @param {string} methodName Name of the missing method.
   */
  throwMissingImplementationError(strategyName, methodName) {
    throw new Error(`${strategyName} has not implemented interface method '${methodName}'.`);
  },
};

module.exports = StrategyInterface;
