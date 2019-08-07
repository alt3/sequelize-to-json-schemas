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
      // id
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
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
    },
    // sequelize options
    {
      timestamps: true,
      underscored: false,
    },
  );

  return Model;
};
