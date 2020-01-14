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
   *   '$id': '/user.json'
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
   * Returns the "$comment" property (but only if manager option `disableComments` is false).
   *
   * @example
   * {
   *   '$comment': 'This comment must be a string'
   * }
   * @param {string} comment
   * @returns {object}
   */
  getPropertyComment(comment) {
    return {
      $comment: comment,
    };
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
   * @param {string|array} type Value of the `type` property
   * @returns {object}
   */
  convertTypePropertyToAllowNull(type) {
    if (Array.isArray(type)) {
      return {
        type: [...type, 'null'],
      };
    }
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
   * @param {string} association name
   * @param {Sequelize.association} association Sequelize associaton object
   * @returns {object} Null to omit property from the result
   */
  getPropertyForHasOneAssociation(associationName, association) {
    return {
      [associationName]: {
        $ref: `#/definitions/${association.target.name}`, // eslint-disable-line unicorn/prevent-abbreviations
      },
    };
  }

  /**
   * Returns the property pointing to a BelongsTo association.
   *
   * @example
   * {
   *   company: {
   *     $ref: '#/definitions/company'
   *   }
   * }
   * @param {string} association name
   * @param {Sequelize.association} association Sequelize associaton object
   * @returns {object} Null to omit property from the result
   */
  getPropertyForBelongsToAssociation(associationName, association) {
    return {
      [associationName]: {
        $ref: `#/definitions/${association.target.name}`, // eslint-disable-line unicorn/prevent-abbreviations
      },
    };
  }

  /**
   * Returns the property pointing to a HasMany association.
   *
   * @example
   * {
   *   documents: {
   *     type: "array",
   *     items: {
   *       $ref: '#/definitions/document'
   *     }
   *   }
   * }
   * @param {string} association name
   * @param {Sequelize.association} association Sequelize associaton object
   * @returns {object} Null to omit property from the result
   */
  getPropertyForHasManyAssociation(associationName, association) {
    return {
      [associationName]: {
        type: 'array',
        items: {
          $ref: `#/definitions/${association.target.name}`, // eslint-disable-line unicorn/prevent-abbreviations
        },
      },
    };
  }

  /**
   * Returns the property pointing to a BelongsToMany association.
   *
   * @example
   * {
   *   friends: {
   *     type: "array",
   *     items: {
   *       allOf: [
   *         {
   *           $ref: '#/definitions/user'
   *         },
   *         {
   *           type: 'object',
   *           properties: {
   *             friendship: {
   *               $ref: '#/definitions/friendship'
   *             }
   *           }
   *         }
   *       ]
   *     }
   *   }
   * }
   * @param {string} association name
   * @param {Sequelize.association} association Sequelize associaton object
   * @returns {object} Null to omit property from the result
   */
  getPropertyForBelongsToManyAssociation(associationName, association) {
    return {
      [associationName]: {
        type: 'array',
        items: {
          allOf: [
            {
              $ref: `#/definitions/${association.target.name}`, // eslint-disable-line unicorn/prevent-abbreviations
            },
            {
              type: 'object',
              properties: {
                [association.through.model.options.name.plural]: {
                  $ref: `#/definitions/${association.through.model.name}`, // eslint-disable-line unicorn/prevent-abbreviations
                },
              },
            },
          ],
        },
      },
    };
  }
}

module.exports = JsonSchema7Strategy;
