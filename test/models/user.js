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
    Model.rawAttributes.CITEXT = {
      type: DataTypes.CITEXT,
    };
  }

  if (supportedDataType('INTEGER')) {
    Model.rawAttributes.INTEGER = {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    };
  }

  if (supportedDataType('STRING')) {
    Model.rawAttributes.STRING = {
      type: DataTypes.STRING,
      defaultValue: 'Default value for STRING',
    };

    Model.rawAttributes.STRING_ALLOWNULL = {
      type: DataTypes.STRING,
      allowNull: true,
    };

    Model.rawAttributes.STRING_1234 = {
      type: DataTypes.STRING(1234),
    };

    Model.rawAttributes.STRING_DOT_BINARY = {
      type: DataTypes.STRING.BINARY,
    };
  }

  if (supportedDataType('TEXT')) {
    Model.rawAttributes.TEXT = {
      type: DataTypes.TEXT,
    };
  }

  if (supportedDataType('UUIDV4')) {
    Model.rawAttributes.UUIDV4 = {
      type: DataTypes.UUID,
    };
  }

  // --------------------------------------------------------------------------
  // Custom options (as specified through `jsonSchema`) starting below.
  // --------------------------------------------------------------------------
  Model.rawAttributes.CUSTOM_DESCRIPTION = {
    type: DataTypes.STRING,
    jsonSchema: {
      description: 'Custom attribute description',
    },
  };

  Model.rawAttributes.CUSTOM_COMMENT = {
    type: DataTypes.STRING,
    jsonSchema: {
      comment: 'Custom comment',
    },
  };

  Model.rawAttributes.CUSTOM_EXAMPLES = {
    type: DataTypes.STRING,
    jsonSchema: {
      examples: ['Custom example 1', 'Custom example 2'],
    },
  };

  Model.rawAttributes.CUSTOM_READONLY = {
    type: DataTypes.STRING,
    allowNull: false,
    jsonSchema: {
      readOnly: true,
    },
  };

  Model.rawAttributes.CUSTOM_WRITEONLY = {
    allowNull: false,
    type: DataTypes.STRING,
    jsonSchema: {
      writeOnly: true,
    },
  };

  return Model;
};
