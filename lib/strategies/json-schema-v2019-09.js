const StrategyInterface = require('../strategy-interface');

/**
 * Class responsible for converting Sequelize models into "JSON Schema Draft 2019-09" schemas.
 *
 * @copyright Copyright (c) 2021 ALT3 B.V.
 * @license Licensed under the MIT License
 * @augments StrategyInterface
 */
class JsonSchema201909Strategy extends StrategyInterface {
  /**
   * Returns the "$schema" property.
   *
   * @example
   * {
   *   '$schema': 'https://json-schema.org/draft/20219-09/schema#'
   * }
   * @param {boolean} secureSchemaUri True for HTTPS, false for HTTP
   * @returns {object}
   */
  getPropertySchema(secureSchemaUri) {
    return {
      $schema: `${secureSchemaUri ? 'https' : 'http'}://json-schema.org/draft/2019-09/schema#`,
    };
  }

  /**
   * Returns the "$id" field for a schema.
   *
   * @example
   * {
   *   '$id': '/user.json'
   * }
   * @param {string} path
   * @returns {object}
   */
  // eslint-disable-next-line no-unused-vars
  getPropertySchemaId(path) {
    return {
      $id: path,
    };
  }

  /**
   * Returns the "$id" field for a property.
   *
   * @example
   * {
   *   '$id': '/user.json'
   * }
   * @param {string} path
   * @returns {object}
   */
  // eslint-disable-next-line no-unused-vars
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
   * @param {string} type Value of the `type` property
   * @returns {object}
   */
  convertTypePropertyToAllowNull(type) {
    if (Array.isArray(type)) {
      return {
        anyOf: [...type, { type: 'null' }],
      };
    }
    return {
      type: [type, 'null'],
    };
  }

  /**
   * Returns the `contentEncoding` property as used by Json Schema for base64 encoded strings (like BLOB).
   *
   * @example
   * {
   *   'contentEncoding': 'base64',
   * }
   *
   * @returns {object}
   */
  getPropertyForBase64Encoding() {
    return {
      contentEncoding: 'base64',
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

module.exports = JsonSchema201909Strategy;
