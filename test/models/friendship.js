/**
 * Sequelize model definition for testing User belongsToMany.
 *
 * @param sequelize Sequelize Instance
 * @param Sequelize Sequelize Class
 * @returns {FriendshipClass} Returns the Friendship model
 */
module.exports = (sequelize, { DataTypes }) => {
  const Model = sequelize.define(
    'friendship',
    {
      isBestFriend: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      underscored: false,
    },
  );

  return Model;
};
