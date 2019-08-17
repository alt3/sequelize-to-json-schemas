/* eslint-disable class-methods-use-this */

const StrategyInterface = require('../strategy-interface');

/**
 * Class responsible for converting Sequelize models into "JSON Schema Draft-07" schemas.
 *
 * @augments StrategyInterface
 */
class JsonSchema7Strategy extends StrategyInterface {
  /**
   * Returns the full URI to the online JSON Schema v7 schema (validation) file.
   *
   * @example https://json-schema.org/draft-07/schema#
   * @returns {string}
   */
  getOnlineSchemaUri() {
    return 'https://json-schema.org/draft-07/schema#';
  }

  /**
   * Returns the "$schema" property.
   *
   * @example {'$schema': 'https://json-schema.org/draft-07/schema#'}
   * @returns {object}
   */
  getPropertySchema() {
    return {
      $schema: 'https://json-schema.org/draft-07/schema#',
    };
  }

  /**
   * Returns the "$id" property.
   *
   * @example {'$id': '/user.json}
   * @param {string} path
   * @returns {object}
   */
  getPropertyId(path) {
    return {
      $id: path,
    };
  }

  /**
   * Returns the "title" property.
   *
   * @example {'title': 'SomeTitle'}
   * @returns {object}
   */
  getPropertyTitle(title) {
    return { title };
  }

  /**
   * Returns the "description" property.
   *
   * @example {'description': 'Some description'}
   * @returns {object}
   */
  getPropertyDescription(description) {
    return { description };
  }

  /**
   * Returns the "examples" property.
   *
   * @example {'examples': [ 'value1', 'value2' ]}
   * @param {array} examples List with one or multiple examples
   * @returns {object}
   */
  getPropertyExamples(examples) {
    return { examples };
  }

  /**
   * Returns `null` to be used as direct property of `format`
   *
   * @example null
   *
   * @returns {object|string}
   */
  getNullProperty() {
    return 'null';
  }
}

module.exports = JsonSchema7Strategy;
