const StrategyInterface = require('../strategy-interface');

/**
 * Class responsible for converting Sequelize models into "OpenAPI 3.0" schemas.
 *
 * @copyright Copyright (c) 2019 ALT3 B.V.
 * @license Licensed under the MIT License
 * @augments StrategyInterface
 */
class OpenApi3Strategy extends StrategyInterface {
  /**
   * Returns null because OpenAPI 3.0 does not support the "schema" property.
   *
   * @returns {null}
   */
  getPropertySchema() {
    return null;
  }

  /**
   * Returns null because OpenAPI 3.0 does not support the "id" property.
   *
   * @example null
   * @param {string} path
   * @returns {null}
   */
  // eslint-disable-next-line no-unused-vars
  getPropertyId(path) {
    return null;
  }

  /**
   * Returns null because OpenAPI 3.0 does not support the "comment" property.
   *
   * @example null
   * @param {string} comment
   * @returns {null}
   */
  // eslint-disable-next-line no-unused-vars
  getPropertyComment(comment) {
    return null;
  }

  /**
   * Returns the "example" property.
   *
   * @example
   * {
   *   'example': [
   *     'example 1',
   *     'example 2'
   *   ]
   * }
   * @param {array} examples List with one or multiple examples
   * @returns {object}
   */
  getPropertyExamples(examples) {
    return {
      example: examples,
    };
  }

  /**
   * Returns a new `type` property, enriched to allow null values.
   *
   * @example
   * {
   *   'type': 'string',
   *   'nullable': 'true'
   * }
   *
   * @param {string} type Value of the `type` property
   * @returns {object}
   */
  convertTypePropertyToAllowNull(type) {
    return {
      type,
      nullable: true,
    };
  }

  /**
   * Returns the property pointing to a HasOne association.
   *
   * @example
   * {
   *   profile: {
   *     $ref: '#/components/schemas/profile'
   *   }
   * }
   * @param {string} association name
   * @param {Sequelize.association} association Sequelize associaton object
   * @returns {object} Null to omit property from the result
   */
  getPropertyForHasOneAssociation(associationName, association) {
    return {
      [associationName]: {
        $ref: `#/components/schemas/${association.target.name}`, // eslint-disable-line unicorn/prevent-abbreviations
      },
    };
  }

  /**
   * Returns the property pointing to a BelongsTo association.
   *
   * @example
   * {
   *   company: {
   *     $ref: '#/components/schemas/company'
   *   }
   * }
   * @param {string} association name
   * @param {Sequelize.association} association Sequelize associaton object
   * @returns {object} Null to omit property from the result
   */
  getPropertyForBelongsToAssociation(associationName, association) {
    return {
      [associationName]: {
        $ref: `#/components/schemas/${association.target.name}`, // eslint-disable-line unicorn/prevent-abbreviations
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
   *       oneOf: [
   *         $ref: '#/components/schemas/document'
   *       ]
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
          oneOf: [
            {
              $ref: `#/components/schemas/${association.target.name}`, // eslint-disable-line unicorn/prevent-abbreviations
            },
          ],
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
   *       oneOf: [
   *         $ref: '#/components/schemas/users'
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
          oneOf: [
            {
              $ref: `#/components/schemas/${association.target.name}`, // eslint-disable-line unicorn/prevent-abbreviations
            },
          ],
        },
      },
    };
  }
}

module.exports = OpenApi3Strategy;
