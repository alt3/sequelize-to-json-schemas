/**
 * Sequelize model definition for testing User hasOne, Profile belongsTo.
 *
 * @param sequelize Sequelize Instance
 * @param Sequelize Sequelize Class
 * @returns {ProfileClass} Returns the Profile model
 */
module.exports = (sequelize, { DataTypes }) => {
  const Model = sequelize.define(
    'profile',
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
