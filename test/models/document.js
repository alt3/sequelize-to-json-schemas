/**
 * Sequelize model definition for testing User hasMany, Document belongsTo.
 */

const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;

/**
 * Initialize Profile definition
 *
 * @param sequelize Sequelize Instance
 * @returns {ProfileClass} Returns the Profile model
 */
module.exports = sequelize => {
  const Model = sequelize.define(
    'document',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      underscored: false,
    },
  );

  return Model;
};
