/**
 * Sequelize model definition for testing User belongsTo.
 *
 * @param sequelize Sequelize Instance
 * @param Sequelize Sequelize Class
 * @returns {CompanyClass} Returns the Company model
 */
module.exports = (sequelize, { DataTypes }) => {
  const Model = sequelize.define(
    'company',
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
