/**
 * Sequelize model definition for testing User hasMany, Document belongsTo.
 *
 * @param sequelize Sequelize Instance
 * @param Sequelize Sequelize Class
 * @returns {DocumentClass} Returns the Document model
 */
module.exports = (sequelize, { DataTypes }) => {
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
