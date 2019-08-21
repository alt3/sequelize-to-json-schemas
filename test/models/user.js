/**
 * Sequelize attribute definitions for the `user` model.
 *
 * This model contains ALL known Sequelize DataTypes and is used by all
 * strategies to make sure the TypeMapper produces the correct types and
 * thus produces a result that passed schema-validation for the strategy.
 *
 * @see https://sequelize.org/master/manual/data-types.html
 */

const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;

/**
 * Initialize User definition
 *
 * @param sequelize Sequelize Instance
 * @returns {UserClass} Returns the User model
 */
module.exports = sequelize => {
  const Model = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },

      // STRING (default)
      _STRING_: {
        type: DataTypes.STRING,
      },

      _STRING_ALLOWNULL_: {
        type: DataTypes.STRING,
        allowNull: true, // nice test because this should become `nullable: true` for OpenApi
      },

      // STRING(1234)
      _STRING_50_: {
        type: DataTypes.STRING(50),
      },

      // STRING.BINARY
      _STRING_DOT_BINARY_: {
        type: DataTypes.STRING.BINARY,
      },

      // INTEGER (default)
      _INTEGER: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      // UUIDv4
      _UUIDV4_: {
        type: DataTypes.UUID, // could be v1 or v4 ??
      },

      // INET is a good design-driving test as the TypeMapper returned value (array) breaks both OpenApi v3
      // and JSON Schema v7. Sequelize description: the INET type holds an IPv4 or IPv6 host address, and
      //  optionally its subnet. Takes 7 or 19 bytes
      // @todo disabled until the mapper is fixed, note there
      // _INET_: {
      //   type: Sequelize.INET
      // },

      // ----------------------------------------------------------------------
      // attribute using all available user-definable properties
      // ----------------------------------------------------------------------
      _USER_ENRICHED_PROPERTIES_: {
        type: DataTypes.STRING,
        jsonSchema: {
          description: 'User defined attribute description',
          examples: ['User defined example 1', 'User defined example 1'],
        },
      },
    },
    // sequelize options
    {
      timestamps: true,
      underscored: false,
    },
  );

  // dynamically add and remove attributes (useful for testing)
  Model.rawAttributes._NEW = {
    type: DataTypes.STRING,
    allowNull: false,
  };

  // delete Model.rawAttributes._ATTRIBUTE_NAME_;

  return Model;
};
