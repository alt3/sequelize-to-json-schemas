const StrategyInterface = require('../strategy-interface');

/**
 * Class responsible for converting Sequelize models into "JSON Schema Draft-07" schemas.
 *
 * @copyright Copyright (c) 2019 ALT3 B.V.
 * @license Licensed under the MIT License
 * @augments StrategyInterface
 */
class JsonSchema7Strategy extends StrategyInterface {
  /**
   * Returns the "$schema" property.
   *
   * @example
   * {
   *   '$schema': 'https://json-schema.org/draft-07/schema#'
   * }
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
   * @example
   * {
   *   '$id': '/user.json
   * }
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
   * @example
   * {
   *   'title': 'SomeTitle'
   * }
   * @param {string} title The title to use
   * @returns {object}
   */
  getPropertyTitle(title) {
    return { title };
  }

  /**
   * Returns the "description" property.
   *
   * @example
   * {
   *   'description': 'Some description'
   * }
   * @params {string} description Text holding the description
   * @returns {object}
   */
  getPropertyDescription(description) {
    return { description };
  }

  /**
   * Returns the "examples" property.
   *
   * @example
   * {
   *   'examples': [
   *     'example 1',
   *     'example 2'
   *   ]
   * }
   * @param {array} examples List with one or multiple examples
   * @returns {object}
   */

  getPropertyExamples(examples) {
    return { examples };
  }

  /**
   * Converts a `type` property so it allows null values.
   *
   * @example
   * {
   *   type: [
   *     'string',
   *      'null'
   *   ]
   * }
   *
   * @param {string} type Value of the `type` property
   * @returns {object}
   */
  convertTypePropertyToAllowNull(type) {
    return {
      type: [type, 'null'],
    };
  }

  /**
   * Returns the property pointing to a HasOne association.
   *
   * @example
   * {
   *   profile: {
   *     $ref: '#/definitions/profile'
   *   }
   * }
   * @param {Sequelize.association} association Sequelize associaton object
   * @returns {object} Null to omit property from the result
   */
  getPropertyForHasOneAssociation(association) {
    return {
      [association]: {
        $ref: `#/definitions/${association}`, // eslint-disable-line unicorn/prevent-abbreviations
      },
    };
  }

  /**
   * Returns the property pointing to a HasMany association.
   *
   * @example
   * {
   *   document: {
   *     type: "array",
   *     items: {
   *       oneOf: [
   *         $ref: '#/definitions/document'
   *       ]
   *     }
   *   }
   * }
   * @param {Sequelize.association} association Sequelize associaton object
   * @returns {object} Null to omit property from the result
   */
  getPropertyForHasManyAssociation(association) {
    return {
      [association]: {
        type: 'array',
        items: {
          oneOf: [
            {
              $ref: `#/definitions/${association}`, // eslint-disable-line unicorn/prevent-abbreviations
            },
          ],
        },
      },
    };
  }
}

module.exports = JsonSchema7Strategy;
