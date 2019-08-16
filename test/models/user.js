/**
 * Sequelize attribute definitions for the `user` model.
 *
 * This model contains ALL known Sequelize DataTypes and is used by all
 * strategies to make sure the TypeMapper produces the correct types and
 * thus produces a result that passed schema-validation for the strategy.
 *
 * @see https://sequelize.org/master/manual/data-types.html
 */

/* eslint-disable no-underscore-dangle */

const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;

/**
 * Initialize User definition
 *
 * @param sequelize Sequelize Instance
 * @returns {UserClass} Returns the Users model
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
      _STRING: {
        type: DataTypes.STRING,
        allowNull: true, // nice test because this should become `nullable: true` for OpenApi
      },

      // STRING(1234)
      _STRING_LENGTH: {
        type: DataTypes.STRING(50),
      },

      // STRING.BINARY
      _STRING_BINARY: {
        type: DataTypes.STRING.BINARY,
      },

      // INTEGER (default)
      _INTEGER: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      // UUIDv4
      _UUIDv4: {
        type: DataTypes.UUID, // could be v1 or v4 ??
      },

      // ----------------------------------------------------------------------
      // additions to sequelize datatypes, used to check overrides etc.
      // ----------------------------------------------------------------------

      // email
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        jsonSchema: {
          title: 'Email Address',
          exclude: true,
          comment: 'This will be the comment',
          examples: ['Example 1', 'Example 2'],
        },
      },
      // password
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // hostAddress is a good design-driving test as the TypeMapper returned value (array) breaks OpenApi v3.
      // The INET type holds an IPv4 or IPv6 host address, and optionally its subnet. Takes 7 or 19 bytes
      hostAddress: {
        type: Sequelize.INET,
        allowNull: false,
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

  delete Model.rawAttributes.email;

  Model.refreshAttributes();

  return Model;
};
