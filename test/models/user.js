/**
 * Sequelize attribute definitions for the `user` model.
 *
 * This model should contain attribute definitions for all known DataTypes.
 * Please note that an attribute definitions will only be included in the
 * model if the tested Sequelize version supports the DataType. For example
 * Sequelize v4 does not support CITEXT so the _CITEXT_ attribute will not
 * be present in the model when testing Sequelize v4.
 *
 * @see https://sequelize.org/master/manual/data-types.html
 */

const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;

const supportedDataType = require('../utils/supported-datatype');

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
    },
    // sequelize options
    {
      timestamps: true,
      underscored: false,
    },
  );

  // --------------------------------------------------------------------------
  // Define ALL Sequelize DataTypes below, including their variations. Only
  // added to the model if supported by this sequelize version.
  // --------------------------------------------------------------------------
  if (supportedDataType('CITEXT')) {
    Model.rawAttributes._CITEXT_ = {
      type: DataTypes.CITEXT,
    };
  }

  if (supportedDataType('INTEGER')) {
    Model.rawAttributes._INTEGER_ = {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    };
  }

  if (supportedDataType('STRING')) {
    Model.rawAttributes._STRING_ = {
      type: DataTypes.STRING,
    };

    Model.rawAttributes._STRING_ALLOWNULL_ = {
      type: DataTypes.STRING,
      allowNull: true,
    };

    Model.rawAttributes._STRING_1234_ = {
      type: DataTypes.STRING(1234),
    };

    Model.rawAttributes._STRING_DOT_BINARY_ = {
      type: DataTypes.STRING.BINARY,
    };
  }

  if (supportedDataType('TEXT')) {
    Model.rawAttributes._TEXT_ = {
      type: DataTypes.TEXT,
    };
  }

  if (supportedDataType('UUIDV4')) {
    Model.rawAttributes._STRING_DOT_BINARY_ = {
      type: DataTypes.UUID,
    };
  }

  // --------------------------------------------------------------------------
  // Tests for user-definable attribute properties starting below.
  // --------------------------------------------------------------------------
  Model.rawAttributes._USER_ENRICHED_PROPERTIES_ = {
    type: DataTypes.STRING,
    jsonSchema: {
      description: 'User defined attribute description',
      examples: ['User defined example 1', 'User defined example 1'],
    },
  };

  return Model;
};
